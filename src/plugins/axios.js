import axios from "axios";
import { useUserStore } from "../stores/userStore";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:19003/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
        config.headers.Authorization = `Bearer ${userStore.acessToken}`;
    }

    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const userStore = useUserStore();
        const originalRequest = error.config;

        // Se não for erro 401 → rejeita normalmente
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Se falhou no refresh, desloga
        if (originalRequest._retry) {
            userStore.logout();
            return Promise.reject(error);
        }

        // Evita múltiplos refresh ao mesmo tempo
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshResponse = await api.post("/token/refresh/", {
                refresh: userStore.refreshToken,
            });

            const newAccess = refreshResponse.data.access;

            userStore.setUser(newAccess, userStore.refreshToken);

            processQueue(null, newAccess);

            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
        } catch (err) {
            processQueue(err, null);
            userStore.logout();
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
);

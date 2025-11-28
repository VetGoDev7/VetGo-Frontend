import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/plugins/axios";

export const useUserStore = defineStore("user", () => {
  const tutor = ref(null);
  const acessToken = ref(null);
  const refreshToken = ref(null);
  const isLoggedIn = ref(false);

  async function setUser(acess, refresh) {
    localStorage.setItem("access_token", acess);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("usuarioLogado", "true");

    acessToken.value = acess;
    refreshToken.value = refresh;
    isLoggedIn.value = true;

    return await getUser();
  }

  async function getUser() {
    if (isLoggedIn) {
      const me = await api.get("me/");

      localStorage.setItem("user_info", JSON.stringify(me.data));
      tutor.value = me.data;
    }
  }

  async function fetchUser() {
    const isLoggedIn = localStorage.getItem("usuarioLogado") === "true";
    if (isLoggedIn) {
      const userInfo = JSON.parse(localStorage.getItem("user_info"));
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      await setUser(accessToken, refreshToken);
    }

    const userInfo = JSON.parse(localStorage.getItem("user_info"));
  }
  function clearUser() {
    localStorage.removeItem("user_info");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("usuarioLogado");

    tutor.value = null;
    acessToken.value = null;
    refreshToken.value = null;
    isLoggedIn.value = false;
  }

  async function logout() {
    clearUser();
  }

  async function login(email, password) {
    const res = await api.post(`token/`, {
      email: email.value,
      password: password.value,
    });

    await setUser(res.data.access, res.data.refresh);
  }

  async function cadastro(name, email, password, confirmPassword) {
    const res = await api.post("usuarios/", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    await login(email, password);

    return res.data;
  }

  async function getMyPets() {
    if (isLoggedIn) {
      const pets = await api.get("pets/");
      return pets.data;
    }
  }

  return {
    tutor,
    acessToken,
    refreshToken,
    isLoggedIn,
    setUser,
    getMyPets,
    fetchUser,
    cadastro,
    login,
    logout,
  };
});

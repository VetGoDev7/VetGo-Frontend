import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:19003/api'; 
 
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true 
});


export const getUsuarios = () => api.get('/usuarios/');
export const getUsuario = (id) => api.get(`/usuario/${id}/`);
export const registerUser = (data) => api.post('/auth/users/', data);
export const loginUser = (data) => api.post('/auth/jwt/create/', data);

export default api;
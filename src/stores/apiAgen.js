import axios from 'axios'

const API_URL = 'http://127.0.0.1:19003/api'

export default {
 
  getPets() {
    return axios.get(`${API_URL}/pets/`).then(res => res.data)
  },
  createPet(data) {
    return axios.post(`${API_URL}/pets/`, data).then(res => res.data)
  },
  updatePet(id, data) {
    return axios.put(`${API_URL}/pets/${id}/`, data).then(res => res.data)
  },
  deletePet(id) {
    return axios.delete(`${API_URL}/pets/${id}/`)
  },


  getServicos() {
    return axios.get(`${API_URL}/servicos/`).then(res => res.data)
  },
  createServico(data) {
    return axios.post(`${API_URL}/servicos/`, data).then(res => res.data)
  },
  updateServico(id, data) {
    return axios.put(`${API_URL}/servicos/${id}/`, data).then(res => res.data)
  },
  deleteServico(id) {
    return axios.delete(`${API_URL}/servicos/${id}/`)
  },


  getVeterinarios() {
    return axios.get(`${API_URL}/veterinarios/`).then(res => res.data)
  },
  createVeterinario(data) {
    return axios.post(`${API_URL}/veterinarios/`, data).then(res => res.data)
  },
  updateVeterinario(id, data) {
    return axios.put(`${API_URL}/veterinarios/${id}/`, data).then(res => res.data)
  },
  deleteVeterinario(id) {
    return axios.delete(`${API_URL}/veterinarios/${id}/`)
  }
}

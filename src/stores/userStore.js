import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const nomeCompleto = ref('')
  const email = ref('')

  const petNome = ref('')
  const raca = ref('')
  const idade = ref('')
  const especie = ref('')
  const observacoes = ref('')

  function setUser(user) {
    nomeCompleto.value = user.nome_completo
    email.value = user.email
    petNome.value = user.pet_nome || ''
    raca.value = user.raca || ''
    idade.value = user.idade || ''
    especie.value = user.especie || ''
    observacoes.value = user.observacoes || ''
  }

  async function fetchUser() {
    try {
      const response = await axios.get('/api/user/') 
      setUser(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
    }
  }
  function clearUser() {
    nomeCompleto.value = ''
    email.value = ''
    petNome.value = ''
    raca.value = ''
    idade.value = ''
    especie.value = ''
    observacoes.value = ''
  }

  return {
    nomeCompleto,
    email,
    petNome,
    raca,
    idade,
    especie,
    observacoes,
    setUser,
    fetchUser,
    clearUser,
  }
})

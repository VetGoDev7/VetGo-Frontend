import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const nomeCompleto = ref('')
  const email = ref('')

  function setUser(user) {
    nomeCompleto.value = user.nome_completo
    email.value = user.email
  }

  function clearUser() {
    nomeCompleto.value = ''
    email.value = ''
  }

  return { nomeCompleto, email, setUser, clearUser }
})

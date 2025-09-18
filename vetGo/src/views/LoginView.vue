<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')

async function login() {
  erro.value = ''
  try {
const api = import.meta.env.VITE_API_URL

const res = await axios.post(`${api}/login/`, {
  email: email.value,
  senha: senha.value
})
    

    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)

    alert(`Bem-vindo, ${res.data.tutor.nome_completo}!`)
    router.push('/') 
  } catch (e) {
    erro.value = e.response?.data?.erro || 'Erro ao fazer login'
  }
}
</script>

<template>
  <section class="login-container">
    <div class="login-card">

      <div class="login-left">
        <h1>Bem-Vindo Ao VetGo!</h1>

        <form @submit.prevent="login" class="login-form">
          <input type="email" placeholder="Email" v-model="email" required />
          <input type="password" placeholder="Senha" v-model="senha" required />
          <a href="#" class="forgot-password">Esqueceu sua senha?</a>
          <button type="submit" class="login-btn">Login</button>
        </form>

        <p class="register-text">Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
        <p v-if="erro" style="color:red; margin-top:10px">{{ erro }}</p>
      </div>

      <div class="login-right">
        <img src="/dogFofo.png" alt="Cachorro fofo" />
      </div>

    </div>
  </section>
</template>

<style scoped>
.login-container {
  background-color: var(  --cor-fundo);
  padding: 20px 20px;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 800px;
  max-width: 95%;
}

.login-left {
  background-color: var( --verde-claro);
  padding: 30px 40px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
}

.login-left h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  font-size: 45px;
  margin-bottom: 80px;
}


.separator {
  text-align: center;
  font-size: 17px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  color:#000;
  margin-bottom: 20px;
}

.separator hr {
  flex: 1;
  border: none;
  height: 1px;
  background-color:  var(--cor-fundo);
}

.login-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}

.forgot-password {
  font-size: 14px;
  color: var(--cor-fundo);
  margin-bottom: 20px;
  display: inline-block;
}

.login-btn {
  background-color: var(--cor-botao);
  border: 2px solid rgba(255, 255, 255, 0.603);
  color: var( --cor-fundo);
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s ease;
}

.login-btn:hover {
  color: #fff;
}

.register-text {
  margin-top: 25px;
  font-size: 14px;
  color: #333;
}

.register-text a {
  color: var(--cor-fundo);
  text-decoration: none;
}

.login-right {
  width: 50%;
}

.login-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
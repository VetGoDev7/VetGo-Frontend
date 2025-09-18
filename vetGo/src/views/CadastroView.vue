<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import '@/assets/base.css'

const nome_completo = ref('')
const email = ref('')
const senha = ref('')
const confirmar_senha = ref('')
const mensagem = ref('')
const router = useRouter()
const nome_pet = ref('')
const especie = ref('')
const raca = ref('')
const idade = ref('')
const obs = ref('')

async function cadastrar() {
  alert.value = ''

  if (!nome_completo.value || !email.value || !senha.value || !confirmar_senha.value) {
    alert.value = 'Preencha todos os campos do tutor.'
    return
  }

  if (!nome_pet.value || !especie.value || !raca.value || !idade.value) {
    alert.value = 'Preencha todos os campos do pet.'
    return
  }

  if (!email.value.includes('@')) {
    alert.value = 'Email inválido.'
    return
  }

  if (senha.value.length < 8) {
    alert.value = 'A senha deve ter pelo menos 8 caracteres.'
    return
  }

  if (senha.value !== confirmar_senha.value) {
    alert.value = 'As senhas não conferem.'
    return
  }

  try {
    const usuario = {
      id: Date.now(),
      nome_completo: nome_completo.value,
      email: email.value,
      senha: senha.value,
      dataCadastro: new Date().toISOString(),
    }
    const pet = {
      id: Date.now() + 1,
      nome_pet: nome_pet.value,
      especie: especie.value,
      raca: raca.value,
      idade: idade.value,
      obs: obs.value,
      tutorEmail: email.value, 
    }
    

await axios.post('http://127.0.0.1:19003/api/tutores/', usuario)   
 await axios.post('http://127.0.0.1:19003/api/pets/', pet)

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const petsExistentes = JSON.parse(localStorage.getItem('pets') || '[]')

    const emailJaExiste = usuariosExistentes.find((user) => user.email === email.value)
    if (emailJaExiste) {
      alert.value = 'Este email já está cadastrado!'
      return
    }

    usuariosExistentes.push(usuario)
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes))

    petsExistentes.push(pet)
    localStorage.setItem('pets', JSON.stringify(petsExistentes))

    alert.value = 'Cadastro realizado com sucesso!'
    nome_completo.value =
      email.value =
      senha.value =
        setTimeout(() => {
          router.push('/login')
        }, 1200)
  } catch (err) {
    alert.value = err.message || 'Erro ao cadastrar. Tente novamente.'
  }


  const u = {
    nome_completo: nome_completo.value,
    email: email.value,
    senha: senha.value,
    confirmar_senha: confirmar_senha.value
  }

  try {
    const response = await axios.post('http://127.0.0.1:19003/api/tutores/', u)
    mensagem.value = 'Cadastro realizado com sucesso!'
    console.log('Resposta do servidor:', response.data)
  } catch (err) {
    if (err.response) {
      console.error('Erro do Django:', err.response.data)
      mensagem.value = 'Erro no cadastro: ' + JSON.stringify(err.response.data)
    } else {
      console.error('Erro inesperado:', err)
      mensagem.value = 'Erro de conexão com o servidor.'
    }
  }
}

</script>

<template>
  <section class="cadastro-tutor">
    <h1>Informações de Cadastro</h1>
    <form class="form-container" @submit.prevent="cadastrar">
      <div class="form-section">
        <div class="section-header">
          <img src="/usuario.png" />
          <h2>Informações Pessoais</h2>
        </div>
        <div class="input-grid">
          <input id="nome" v-model="nome_completo" required placeholder="Nome" />
          <input id="email" v-model="email" type="email" placeholder="E-mail" />
          <input id="senha" v-model="senha" type="password" placeholder="Crie uma senha" />
          <input v-model="confirmar_senha" type="password" placeholder="Confirmar Senha" />
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <img src="/pet.png" />
          <h2>Informações do Pet</h2>
        </div>
        <div class="input-grid">
          <input id="nome_pet" v-model="nome_pet" placeholder="Nome Do Animal" />
          <div class="radio-group" id="especie">
            <label><input type="radio" v-model="especie" value="cachorro" /> Cachorro</label>
            <label><input type="radio" name="especie" value="gato" /> Gato</label>
          </div>
          <input id="raca" v-model="raca" type="text" placeholder="Raça" />
          <input id="idade" v-model="idade" type="number" placeholder="Idade" />
        </div>
        <textarea id="obs" v-model="obs" placeholder="Observações importantes"></textarea>
      </div>
      <div class="form-buttons">
        <a href="/home" class="voltar">&lt; Voltar</a>
        <button type="submit" class="btn-cadastrar"></button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.cadastro-tutor {
  padding: 20px 20px;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
}

.cadastro-tutor h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
}

.form-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.section-header h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.section-header img {
  width: 30px;
  height: 30px;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
input,
textarea {
  padding: 12px;
  border: 2px solid #94c38f;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
}

textarea {
  margin-top: 20px;
  resize: vertical;
  height: 80px;
}

.radio-group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.radio-group label {
  font-size: 16px;
  color: #333;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.voltar {
  color: #2c3e50;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}

.btn-cadastrar {
  background-color: #94c38f;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-cadastrar:hover {
  background-color: #7cab75;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import '@/assets/base.css'

const nome_completo = ref('')
const email = ref('')
const senha = ref('')
const confirmar_senha = ref('')
const nome_pet = ref('')
const especie = ref('')
const raca = ref('')
const idade = ref('')
const observacao = ref('')
const mensagem = ref('')
const router = useRouter()

async function cadastrar() {
  mensagem.value = ''

  if (!nome_completo.value || !email.value || !senha.value || !confirmar_senha.value) {
    mensagem.value = 'Preencha todos os campos do tutor.'
    return
  }

  if (!nome_pet.value || !especie.value || !raca.value || !idade.value) {
    mensagem.value = 'Preencha todos os campos do pet.'
    return
  }

  if (!email.value.includes('@')) {
    mensagem.value = 'Email inválido.'
    return
  }

  if (senha.value.length < 8) {
    mensagem.value = 'A senha deve ter pelo menos 8 caracteres.'
    return
  }

  if (senha.value !== confirmar_senha.value) {
    mensagem.value = 'As senhas não conferem.'
    return
  }
  try {
    const tutorResponse = await axios.post('http://127.0.0.1:19003/api/tutores/', {
      nome_completo: nome_completo.value,
      email: email.value,
      senha: senha.value,
      confirmar_senha: confirmar_senha.value,
    })

    const tutor = tutorResponse.data

    console.log('idade antes do envio:', idade.value, typeof idade.value)

    await axios.post('http://127.0.0.1:19003/api/pets/', {
      nome: nome_pet.value,
      especie: especie.value,
      raca: raca.value,
      idade: idade.value,
      observacao: observacao.value,
      tutor: tutor.id,
    })

    mensagem.value = 'Cadastro realizado com sucesso!'
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (err) {
    if (err.response) {
      mensagem.value = 'Erro no cadastro: ' + JSON.stringify(err.response.data)
    } else {
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
          <input v-model="nome_completo" required placeholder="Nome Completo" />
          <input v-model="email" type="email" placeholder="E-mail" />
          <input v-model="senha" type="password" placeholder="Crie uma senha" />
          <input v-model="confirmar_senha" type="password" placeholder="Confirmar Senha" />
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <img src="/pet.png" />
          <h2>Informações do Pet</h2>
        </div>
        <div class="input-grid">
          <input v-model="nome_pet" placeholder="Nome do Animal" />
          <select v-model="especie">
            <option disabled value="">Selecione a espécie</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
          </select>
          <input v-model="raca" type="text" placeholder="Raça" />
          <input type="number" v-model.number="idade" placeholder="Idade" />
        </div>
        <textarea v-model="observacao" placeholder="Observações importantes"></textarea>
      </div>

      <div class="form-buttons">
        <a href="/home" class="voltar">&lt; Voltar</a>
        <button type="submit" class="btn-cadastrar">Cadastrar</button>
        <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
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
select {
  padding: 12px;
  border: 2px solid #94c38f; 
  border-radius: 8px; 
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  cursor: pointer;
  transition: 0.3s ease;
}

select option[disabled] {
  color: #999;
}

select:focus {
  border-color: #7cab75;
  outline: none;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path fill="%2394c38f" d="M0 0l5 6 5-6z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
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

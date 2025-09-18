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
  padding: 20px;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  font-size: 20px;
}

.section-header img {
  width: 28px;
  height: 28px;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

input,
textarea,
select {
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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path fill="%2394c38f" d="M0 0l5 6 5-6z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
  cursor: pointer;
  transition: 0.3s ease;
}

select option[disabled] {
  color: #999;
}

select:focus,
input:focus,
textarea:focus {
  border-color: #7cab75;
  outline: none;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
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


@media (max-width: 480px) {
  .cadastro-tutor h1 {
    font-size: 22px;
    margin-bottom: 25px;
  }

  .form-container {
    padding: 15px;
    border-radius: 12px;
  }

  .section-header h2 {
    font-size: 16px;
  }

  .section-header img {
    width: 22px;
    height: 22px;
  }

  .input-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  input,
  textarea,
  select {
    font-size: 14px;
    padding: 10px;
  }

  .form-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-cadastrar {
    width: 100%;
    font-size: 14px;
    padding: 10px;
  }

  .voltar {
    text-align: center;
    font-size: 14px;
  }
}


@media (min-width: 481px) and (max-width: 768px) {
  .cadastro-tutor h1 {
    font-size: 26px;
    margin-bottom: 30px;
  }

  .form-container {
    padding: 20px;
  }

  .section-header h2 {
    font-size: 18px;
  }

  .input-grid {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .form-buttons {
    flex-direction: row;
    justify-content: space-between;
  }

  .btn-cadastrar {
    padding: 10px 20px;
    font-size: 15px;
  }
}

/* ============================= */
/* 💻 DESKTOP (a partir de 769px)*/
/* ============================= */
@media (min-width: 769px) {
  .cadastro-tutor h1 {
    font-size: 32px;
  }

  .form-container {
    padding: 30px;
  }

  .input-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

</style>

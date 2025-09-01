<script setup>
import '@/assets/base.css'
</script>

<template>
  <section class="cadastro-tutor">
    <h1>Informações de Cadastro</h1>

    <form class="form-container">
      <div class="form-section">
        <div class="section-header">
          <img src="/usuario.png" />
          <h2>Informações Pessoais</h2>
        </div>
        <div class="input-grid">
          <input type="text" placeholder="Nome Completo" />
          <input type="email" placeholder="E-mail" />
          <input type="tel"  class="fone" placeholder="Telefone" />
        </div>
      </div>

      <div class="form-section">
        <div class="section-header">
          <img src="/pet.png" />
          <h2>Informações do Pet</h2>
        </div>
        <div class="input-grid">
          <input type="text" placeholder="Nome Do Animal" />
          <div class="radio-group">
            <label><input type="radio" name="especie" value="cachorro" /> Cachorro</label>
            <label><input type="radio" name="especie" value="gato" /> Gato</label>
          </div>
          <input type="text" placeholder="Raça" />
          <input type="number" placeholder="Idade" />
        </div>
        <textarea placeholder="Observações importantes"></textarea>
      </div>

      <div class="form-buttons">
        <a href="/home" class="voltar">&lt; Voltar</a>
        <button type="submit" class="btn-cadastrar">Cadastrar</button>
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
.section-header h2{
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
.fone {
  grid-column: 1 / -1; 
  justify-self: center; 
  width: 50%; 
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

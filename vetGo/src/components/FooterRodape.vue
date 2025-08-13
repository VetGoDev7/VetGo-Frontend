<script setup> 
import '@/assets/base.css'
</script>

<template>
   <footer class="rodape">
      <div class="container-footer">
        <div class="coluna-logo">
          <img src="/logobranca.png" class="logo-footer" />
          <p>
            Na VetGo, oferecemos atendimento especializado e acolhedor para cães e gatos, com uma
            equipe dedicada ao bem-estar, saúde e felicidade dos seus companheiros de quatro patas."
          </p>
        </div>

        <div class="coluna-links">
          <ul>
            <li><a href="#servicos">Serviços</a></li>
            <li>Termos e Condições</li>
            <li>Política de Privacidade</li>
            <li><router-link to="/sobrenos">Sobre Nós</router-link></li>
          </ul>
        </div>

        <div class="coluna-logo">
          <img class="paw-decor3" src="/patinhas3.png" />
        </div>
      </div>
    </footer>
    </template>

<style scoped>

.rodape {
  background-color: #a1cfa0;
  margin-top: 5rem;
  width: 100%;
  padding: 2rem 1rem;
  color: white;
  font-family: sans-serif;
}

.container-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
  gap: 2rem;
}

.coluna-logo {
  flex: 1;
  min-width: 250px;
}

.logo-footer {
  width: 150px;
  margin-bottom: 1rem;
}

.coluna-logo p {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
}
.coluna-links a {
  text-decoration: none;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.coluna-links a:hover {
  text-decoration: underline;
}

.coluna-links {
  flex: 1;
  min-width: 200px;
  font-family: 'Montserrat', sans-serif;
}

.coluna-links ul {
  list-style: none;
  padding: 0;
}

.coluna-links li {
  margin: 0.5rem 0;
  cursor: pointer;
}

.coluna-logo {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.paw-decor3 {
  margin-top: 70px;
  margin-left: -95px;
}

</style>
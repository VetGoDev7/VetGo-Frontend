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
            <li><router-link to="/servicos">Serviços</router-link></li>
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
  font-family: 'Montserrat', sans-serif;
}

.container-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  font-size: 1rem;
  line-height: 1.4;
}

.coluna-links {
  flex: 1;
  min-width: 200px;
}

.coluna-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.coluna-links li {
  margin: 0.5rem 0;
  cursor: pointer;
}

.coluna-links a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.coluna-links a:hover {
  text-decoration: underline;
  color: #f5f5f5;
}

.paw-decor3 {
  margin-top: 70px;
  margin-left: -95px;
  max-width: 120px;
}

@media (max-width: 900px) {

  .container-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .coluna-logo {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .coluna-links {
    margin-top: 1rem;
  }

  .paw-decor3 {
    margin: 40px auto 0;
    margin-left: 0;
  }
}

@media (max-width: 500px) {
  .logo-footer {
    width: 120px;
  }

  .coluna-logo p {
    font-size: 0.9rem;
  }

  .coluna-links li {
    font-size: 0.95rem;
  }

  .paw-decor3 {
    max-width: 90px;
  }
}
</style>

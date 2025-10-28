<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function irParaCadastro() {
  router.push("/cadastro");
}
</script>

<template>
  <div class="tela-inicial">
    <div class="left">
      <img src="/ondalateral.png" alt="onda topo" class="onda-lateral" />
      <img class="logo" src="/logobranca.png" alt="Logo VetGo" />
      <img class="pets" src="/animals1.png" alt="Pets" />
    </div>

    <div class="right">
      <div class="header">
        <router-link to="/login" class="header-link">Login</router-link>
        <router-link to="/cadastro" class="header-link">Cadastro</router-link>
      </div>

      <div class="content">
        <div class="paws">
          <img src="/paw.png" alt="Patinha" class="paw small" />
        </div>

        <div class="texto">
          <h2>Cuidamos com amor<br />de quem é parte da sua família!</h2>
          <p>
            Na VetGo, oferecemos atendimento especializado e acolhedor para cães
            e gatos!
          </p>
        </div>
        <button class="btn-agendar" @click="$router.push('/cadastro')">
          Agendar consulta
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tela-inicial {
  display: flex;
  height: 100vh;
  font-family: "Inter", sans-serif;
  overflow: hidden;
}

.left {
  flex: 1;
  background-color: #94c38f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  position: relative;
}

.onda-lateral {
  position: absolute;
  width: 5%;
  margin-left: 105%;
  top: 0%;
  height: auto;
  object-fit: contain;
  z-index: 0;
}

.logo {
  width: 500px;
  height: auto;
  top: -170px;
  z-index: 2;
  position: relative;
}

.pets {
  width: 80%;
  height: auto;
  max-width: 700px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header {
  position: absolute;
  top: 20px;
  right: 35px;
  display: flex;
  gap: 20px;
}

.header-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3rem;
}

.header-link:hover {
  color: #94c38f;
}

.content {
  max-width: 400px;
  text-align: left;
}

.paws {
  position: absolute;
  top: 15%;
  right: 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0.2;
}

.texto {
  margin-bottom: 2rem;
  margin-right: 50px;
}

.texto h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
}

.texto p {
  font-size: 1rem;
  color: #666;
}

.btn-agendar {
  background-color: #94c38f;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-agendar:hover {
  background-color: #6bb77c;
}
</style>

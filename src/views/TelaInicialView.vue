<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isMobile = ref(window.innerWidth <= 900);

function irParaCadastro() {
  router.push("/cadastro");
}

function irParaLogin() {
  router.push("/login");
}

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 900;
}

onMounted(() => {
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
  <div v-if="!isMobile" class="tela-inicial">
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
        <div class="texto">
          <h2>Cuidamos com amor<br />de quem é parte da sua família!</h2>
          <p>
            Na VetGo, oferecemos atendimento especializado e acolhedor para cães
            e gatos!
          </p>
        </div>

        <button class="btn-agendar" @click="irParaCadastro">
          Agendar consulta
        </button>
      </div>
    </div>
  </div>

  <div v-else class="layout-mobile">
    <div class="imagem-topo">
      <img src="/image 16.png" alt="Cachorro fofo" />
    </div>

    <div class="card-inferior">
      <div class="logo-area">
        <img src="/logo.png" alt="Logo VetGo" class="logo-mobile" />
        <h2> Bem-vindo!</h2>
        <p>Enquanto você relaxa, nós cuidamos com amor!</p>
      </div>

      <button class="btn-next" @click="irParaCadastro">
        Próximo →
      </button>
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

.layout-mobile {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  background-color: #f5f5f5;
}

.imagem-topo {
  flex: 1;
  background-color: #000;
  overflow: hidden;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.imagem-topo img {
  width: 100%;
  height: 189%;
  object-fit: cover;
}

.card-inferior {
  flex: 1;
  background-color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -2rem;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  text-align: center;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #ddd;
  border-radius: 50%;
}

.dot.ativo {
  background-color: #94c38f;
}

.logo-area {
  margin-bottom: 2rem;
}

.logo-mobile {
  width: 150px;
  margin-bottom: 1rem;
}

.logo-area h2 {
  font-size: 1.5rem;
  color: #222;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.logo-area p {
  font-size: 0.95rem;
  color: #666;
}

.btn-next {
  background-color: #94c38f;
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s ease;
  box-shadow: 0px 6px 15px rgba(148, 195, 143, 0.4);
}

.btn-next:hover {
  background-color: #6bb77c;
  transform: translateY(-2px);
}
</style>

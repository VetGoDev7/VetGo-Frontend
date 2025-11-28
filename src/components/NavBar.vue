<script setup>
import "@/assets/base.css";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import UserProfileModal from "./UserProfileModal.vue";

const showProfile = ref(false);
const menuAtivo = ref(false);
const isMobile = ref(window.innerWidth <= 900);

const userStore = useUserStore();
const nomeUsuario = computed(() => {
  return userStore.tutor?.name || "Usuário";
});
const openProfile = () => {
  showProfile.value = true;
};

function toggleMenu() {
  menuAtivo.value = !menuAtivo.value;
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
  <nav v-if="!isMobile" class="navbar">
    <div class="logo">
      <router-link to="/home">
        <img src="/logo.png" class="logo-img" />
      </router-link>
    </div>

    <ul class="nav-links">
      <li><router-link to="/sobrenos">Sobre Nós</router-link></li>
      <li><router-link to="/agenda">Agendamentos</router-link></li>
      <li>
        <router-link :to="{ path: '/home', hash: '#veterinarios' }">
          Veterinários
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/home', hash: '#servicos' }">
          Serviços
        </router-link>
      </li>

      <div class="right-section">
        <div class="icon" @click="openProfile">
          <img src="/profile.png" alt="Ícone usuário" />
        </div>
        <span class="username">{{ nomeUsuario }}</span>
      </div>
    </ul>

    <UserProfileModal :isOpen="showProfile" @close="showProfile = false" />
  </nav>

  <nav v-else class="bottom-nav">
    <router-link to="/home" class="bottom-item">
      <img src="/home.png" alt="Home" />
      <span>Home</span>
    </router-link>

    <router-link to="/sobrenos" class="bottom-item">
      <img src="/sobrenos.png" alt="Sobre" />
      <span>Sobre</span>
    </router-link>

    <router-link to="/agenda" class="bottom-item">
      <img src="/agenda-white.png" alt="Agendar" />
      <span>Agenda</span>
    </router-link>

    <button class="bottom-item" @click="openProfile">
      <img src="/profile-white.png" alt="Perfil" />
      <span class="username">{{ nomeUsuario }}</span>
    </button>

    <UserProfileModal :isOpen="showProfile" @close="showProfile = false" />
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
  background: #ffffff;
  padding: 0.75em 2em;
  border-radius: 2em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  font-family: "Montserrat", sans-serif;
  position: relative;
  z-index: 1000;
}

.logo-img {
  height: 7em;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  padding: 6px 10px;
  border-radius: 20px;
  transition: background 0.3s;
}

.nav-links a:hover {
  background-color: #f0f0f0;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 38px;
  height: 38px;
  background-color: #7da882;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.icon:hover {
  background-color: #6a9370;
  transform: scale(1.05);
}

.icon img {
  width: 22px;
  height: 22px;
}

.username {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
  margin-left: 8px;
}

.menu {
  display: none;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  width: 30px;
  height: 22px;
  gap: 5px;
}

.menu span {
  display: block;
  height: 3px;
  width: 100%;
  background: #333;
  border-radius: 3px;
  transition: 0.3s;
}

.menu.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu.active span:nth-child(2) {
  opacity: 0;
}
.menu.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 🔹 Bottom nav (mobile) */
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #94C38F;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.15);
  z-index: 999;
}

.bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 0.3s;
  background: transparent;
  border: none;
}

.bottom-item img {
  width: 22px;
  height: 22px;
  margin-bottom: 3px;
  filter: invert(1);
}

.bottom-item:hover {
  transform: scale(1.05);
}

@media (max-width: 900px) {
  .navbar {
    display: none;
  }
  .bottom-nav {
    display: flex; 
  }
}
</style>
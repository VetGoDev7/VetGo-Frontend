<script setup>
import '@/assets/base.css'
import { ref } from 'vue'

const menuAtivo = ref(false)
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/home">
        <img src="/logo.png" class="logo-img" />
      </router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/sobrenos">Sobre Nós</router-link></li>
      <li><router-link to="/agenda">Agendamentos</router-link></li>
      <li><router-link :to="{path: '/home', hash: '#veterinarios'}">Veterinários</router-link></li>
      <li><router-link :to="{ path: '/home', hash: '#servicos' }">Serviços</router-link></li>
      <li><router-link to="/login" class="login-button">Login</router-link></li>
      <li><router-link to="/cadastro">Cadastro</router-link></li>
    </ul>
    <div class="menu" :class="{ active: menuAtivo }" @click="menuAtivo = !menuAtivo">
      <span></span>
      <span></span>
      <span></span>
    </div>

     <ul class="nav-links mobile" :class="{ show: menuAtivo }">
      <li><router-link to="/sobrenos">Sobre Nós</router-link></li>         
      <li><router-link to="/agenda">Agendamentos</router-link></li>
      <li><a href="#servicos">Serviços</a></li>
      <li><a href="#veterinarios">Veterinários</a></li>
      <li><router-link to="/cadastro">Cadastro</router-link></li>
      <li><router-link to="/login" class="login-button">Login</router-link></li>
    </ul>
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
  font-family: 'Montserrat', sans-serif;
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

.login-button {
  background-color: var(--cor-botao);
  border: 3px solid rgba(150, 236, 92, 0.4);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
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

.nav-links.mobile {
  display: none;
  position: absolute;
  top: 70px;
  right: 20px;
  background: white;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-links.mobile.show {
  display: flex;
}

@media (max-width: 900px) {
  .nav-links {
    display: none; 
  }

  .menu {
    display: flex; 
  }
}
</style>

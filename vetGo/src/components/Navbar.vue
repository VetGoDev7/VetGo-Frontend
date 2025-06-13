<script setup>
import { ref } from 'vue';
import router from '@/router'
</script>

<template>
    <header>
    <nav class="navbar">
    <div class="logo">
      <router-link to="/home">
        <img class="logovetGo" src="/logoverde.png" />
      </router-link>
    </div>
    <ul class="nav-links">
    <router-link to="/sobrenos">Sobre Nós</router-link>
    <router-link to="/agendamento">Agendamento</router-link>
    <router-link to="/veterinarios">Veterinários</router-link>
    <router-link to="/servicos">Serviços</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/cadastro">Cadastro</router-link>
    </ul>
  </nav>
  </header>
</template>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.navbar {
  display: flex;
  width: 70%;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #ffffff;
  border-radius: 32px 32px 32px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 20px; 
  overflow: hidden; 
}

.logo img {
  height: 95px; 
  width: auto;
  margin-right: 10px; 
  object-fit: contain;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a.router-link-active {
  font-weight: bold;
  color: #66a36f;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #66a36f;
}

.btn-login {
  background-color: #94C38F;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
}

.btn-outline {
  border: 2px solid #94C38F;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  color: #94C38F;
}
</style>
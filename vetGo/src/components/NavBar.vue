<script setup>
import '@/assets/base.css'
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
      <li><router-link :to="{ path: '/home', hash: '#veterinarios' }">Veterinários</router-link></li>
      <li><router-link :to="{ path: '/home', hash: '#servicos' }">Serviços</router-link></li>
      <li><router-link to="/login" class="login-button">Login</router-link></li>
      <li><router-link to="/cadastro">Cadastro</router-link></li>
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
</style>

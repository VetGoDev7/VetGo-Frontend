<script setup>
import { useUserStore } from '@/stores/userStore'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])
const closeModal = () => emit('close')

const userStore = useUserStore()
</script>

<template>
  <div v-if="isOpen" class="overlay" @click.self="closeModal">
    <div class="modal">
      <button class="close" @click="closeModal">✕</button>

      <div class="profile-header">
        <img src="/profile.png" alt="Avatar" class="avatar" />
        <h2>{{ userStore.nomeCompleto }}</h2>
      </div>

      <form class="form">
        <input type="text" :value="userStore.nomeCompleto" disabled />
        <input type="email" :value="userStore.email" disabled />
        <input type="text" :value="userStore.petNome" placeholder="Nome do pet" />
        <input type="text" :value="userStore.raca" placeholder="Raça" />
        <div class="duo">
          <input type="text" :value="userStore.idade" placeholder="Idade" />
          <input type="text" :value="userStore.especie" placeholder="Espécie" />
        </div>
        <textarea :value="userStore.observacoes" placeholder="Observações importantes"></textarea>

        <button type="button" class="edit-btn">Editar informações</button>
      </form>
    </div>
  </div>
</template>
 
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}
.profile-header {
  text-align: center;
  margin-bottom: 1rem;
}
.avatar {
  width: 60px;
  border-radius: 50%;
  background: #e5f4e8;
  padding: 8px;
}
.form input,
.form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #a7c9a7;
  border-radius: 8px;
}
.duo {
  display: flex;
  gap: 10px;
}
.edit-btn {
  width: 100%;
  background: #7dbb7d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
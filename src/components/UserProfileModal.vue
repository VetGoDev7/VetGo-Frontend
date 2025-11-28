<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close"]);
const closeModal = () => emit("close");
const userStore = useUserStore();
const router = useRouter();
const userPets = ref([]);

const logout = () => {
  userStore.logout();
  closeModal();
  router.push('/');
};

onMounted(async () => {
  if (userStore.isLoggedIn) {
    userPets.value = await userStore.getMyPets();
  }
});
</script>

<template>
  <div v-if="isOpen" class="overlay" @click.self="closeModal">
    <div class="modal">
      <button class="close" @click="closeModal">✕</button>

      <div class="profile-header">
        <img src="/profile.png" alt="Avatar" class="avatar" />
        <h2>{{ userStore.tutor?.name }}</h2>
      </div>

      <form class="form">
        <input type="text" :value="userStore.tutor?.name" disabled />
        <input type="email" :value="userStore.tutor?.email" disabled />
        <div class="pets-section">
          <h3>Meus Pets</h3>
          <div v-if="userPets.length" class="pets-list">
            <div v-for="pet in userPets" :key="pet.id" class="pet-card">
              <h4>{{ pet.nome }}</h4>
              <p><strong>Raça:</strong> {{ pet.raca }}</p>
              <p><strong>Idade:</strong> {{ pet.idade }}</p>
              <p><strong>Espécie:</strong> {{ pet.especie }}</p>

              <p v-if="pet.observacao">
                <strong>Obs:</strong> {{ pet.observacao }}
              </p>
            </div>
          </div>

          <p v-else class="no-pets">Nenhum pet cadastrado ainda.</p>
        </div>
        <button type="button" class="edit-btn">Editar informações</button>
        <button type="button" class="logout-btn" @click="logout">
          Sair da conta
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

.logout-btn {
  width: 100%;
  background: #d9534f;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.logout-btn:hover {
  background: #c9302c;
}

.pets-section {
  margin-bottom: 1.5rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
/* ===========================
   RESPONSIVIDADE PARA TABLET
   (até 1024px)
=========================== */
@media (max-width: 1024px) {
  .modal {
    width: 380px;
    padding: 1.8rem;
  }

  .form input,
  .form textarea {
    font-size: 1rem;
  }

  .edit-btn {
    font-size: 1rem;
  }
}

/* ===========================
   RESPONSIVIDADE PARA MOBILE
   (até 768px)
=========================== */
@media (max-width: 768px) {
  .modal {
    width: 90%;
    padding: 1.5rem;
    border-radius: 14px;
  }

  .profile-header h2 {
    font-size: 1.3rem;
  }

  .avatar {
    width: 55px;
  }

  .duo {
    flex-direction: column; /* empilha idade + espécie no mobile */
  }

  .form input,
  .form textarea {
    padding: 10px;
    font-size: 0.95rem;
  }

  .edit-btn {
    font-size: 0.95rem;
    padding: 12px;
  }
}

/* ===========================
   MOBILE MUITO JUSTO (opcional)
   (até 480px)
   -> Se não quiser esse breakpoint,
      pode remover.
=========================== */
@media (max-width: 480px) {
  .modal {
    padding: 1.2rem;
  }

  .profile-header h2 {
    font-size: 1.1rem;
  }

  .avatar {
    width: 48px;
  }

  .form input,
  .form textarea {
    font-size: 0.9rem;
  }
}

.pets-section h3 {
  margin: 1rem 0 0.5rem;
  color: #4a7d4a;
}
.pets-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pet-card {
  background: #f2f8f2;
  border: 1px solid #a7c9a7;
  padding: 12px;
  border-radius: 10px;
}
.pet-card h4 {
  margin-bottom: 4px;
  color: #2a5d2a;
}
.no-pets {
  text-align: center;
  color: #777;
  margin-top: 10px;
}
</style>

<script setup>
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()
const route = useRoute()

onMounted(() => {
  userStore.fetchUser()
})
</script>

<template>
  <NavBar v-if="route.name && !['inicio','login','cadastro'].includes(route.name)" />
  <RouterView v-if="route.name" />
</template>


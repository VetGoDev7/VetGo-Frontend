<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import './assets/base.css'

const route = useRoute()
</script>

<template>
  <header>
    <NavBar v-if="!['inicio', 'login', 'cadastro'].includes(route.name)" />
  </header>

  <RouterView />
</template>
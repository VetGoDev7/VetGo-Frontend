<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import './assets/base.css'
</script>

<template>
  <header>
     <NavBar />
  </header>
  <RouterView />
</template>

<style scoped>

</style>

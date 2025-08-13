<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterRodape from '@/components/FooterRodape.vue'
import './assets/base.css'
</script>

<template>
  <header>
     <NavBar />
  </header>
  <RouterView />
  <FooterRodape />
</template>

<style scoped>

</style>

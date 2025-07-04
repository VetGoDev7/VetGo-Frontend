import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SobreNosView from '@/views/SobreNosView.vue'
import AgendaView from '@/views/AgendaView.vue'
import VetView from '@/views/VetView.vue'
import ServicoView from '@/views/ServicoView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'sobrenos',
      component: SobreNosView,
    },
    {
      path:'/',
      name: 'agenda',
      component: AgendaView,
    },
    {
      path: '/',
      name: 'vet',
      component: VetView,
    },
    {
      path: '/',
      name: 'servico',
      component: ServicoView,
    },
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path:'/',
      name: 'cadastro',
      component: CadastroView,

    }

  ]
})

export default router

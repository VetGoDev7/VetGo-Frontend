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
      component: HomeView,
    },
    {
      path: '/sobrenos',
      component: SobreNosView,
    },
    {
      path:'/agenda',
      name: 'agenda',
      component: AgendaView,
    },
    {
      path: '/vet',
      name: 'vet',
      component: VetView,
    },
    {
      path: '/servico',
      name: 'servico',
      component: ServicoView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path:'/cadastro',
      name: 'cadastro',
      component: CadastroView,

    }

  ],
    scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import TelaInicialView from '@/views/TelaInicialView.vue'
import HomeView from '@/views/HomeView.vue'
import SobreNosView from '@/views/SobreNosView.vue'
import AgendaView from '@/views/AgendaView.vue'
import VetView from '@/views/VetView.vue'
import ServicoView from '@/views/ServicoView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
const routes = [
  {
    path: '/',
    name: 'inicio',
    component: TelaInicialView,
  },

  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const usuarioLogado = localStorage.getItem('usuarioLogado')
      if (usuarioLogado === 'true') next()
      else next('/login')
    },
  },

  {
    path: '/sobrenos',
    name: 'sobrenos',
    component: SobreNosView,
  },
  {
    path: '/agenda',
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
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView,
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
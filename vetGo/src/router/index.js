import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AgendamentoView from '@/views/AgendamentoView.vue'
import CadastroView from '@/views/CadastroView.vue'
import LoginView from '@/views/LoginView.vue'
import ServicosView from '@/views/ServicosView.vue'
import SobrenosView from '@/views/SobrenosView.vue'
import VeterinariosView from '@/views/VeterinariosView.vue'

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
      name:'agendamento',
      component: AgendamentoView,
    },
     {
      path: '/',
      name:'cadastro',
      component: CadastroView,
    },
     {
      path: '/',
      name:' login',
      component: LoginView,
    },
     {
      path: '/',
      name:'servico',
      component: ServicosView,
    },
     {
      path: '/',
      name:'sobrenos',
      component: SobrenosView,
    },
     {
      path: '/',
      name:'veterinario',
      component: VeterinariosView,
    },
     
   
    
  ],
})

export default router

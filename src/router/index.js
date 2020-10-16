import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: layout,
    children: [{
      path: '',
      component: () => import('../components/register-form.vue')
    },
    {
      path: 'broadcast',
      name: 'broadcast',
      component: () => import('../views/dialog/broadcast-chat.vue')
    },
    {
      path: 'chat/:nome',
      name: 'chat',
      component: () => import('../views/dialog/user-chat.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

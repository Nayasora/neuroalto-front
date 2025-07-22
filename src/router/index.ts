import { createRouter, createWebHistory } from 'vue-router'
import { publicRoutes } from './public'
import { clientRoutes } from './client'

const routes = [
  ...publicRoutes,
  ...clientRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
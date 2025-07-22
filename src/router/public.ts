import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/public/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/public/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/public/Login.vue')
  }
]
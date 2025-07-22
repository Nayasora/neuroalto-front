import type { RouteRecordRaw } from 'vue-router'

export const clientRoutes: RouteRecordRaw[] = [
  {
    path: '/client',
    component: () => import('@/layouts/ClientLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/client/dashboard'
      },
      {
        path: 'dashboard',
        name: 'ClientDashboard',
        component: () => import('@/pages/client/Dashboard.vue')
      },
      {
        path: 'profile',
        name: 'ClientProfile',
        component: () => import('@/pages/client/Profile/ProfileView.vue')
      },
      {
        path: 'profile/edit',
        name: 'ClientProfileEdit',
        component: () => import('@/pages/client/Profile/ProfileEdit.vue')
      },
      {
        path: 'settings',
        name: 'ClientSettings',
        component: () => import('@/pages/client/Settings/SettingsMain.vue')
      }
    ]
  }
]
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
        path: 'channels/instagram',
        name: 'ClientChannelsInstagram',
        component: () => import('@/pages/client/Channels/Instagram.vue')
      },
      {
        path: 'channels/whatsapp',
        name: 'ClientChannelsWhatsApp',
        component: () => import('@/pages/client/Channels/WhatsApp.vue')
      },
      {
        path: 'channels/telegram',
        name: 'ClientChannelsTelegram',
        component: () => import('@/pages/client/Channels/Telegram.vue')
      },
    ]
  }
]
<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Brain,
  Home,
  Settings,
  User,
  FileText,
  BarChart3,
    MessageSquare,
} from 'lucide-vue-next'

import NavMain from './NavMain.vue'
import NavUser from './NavUser.vue'
import TeamSwitcher from './TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// Данные для NeuroAlto
const data = {
  user: {
    name: 'Пользователь',
    email: 'user@neuroalto.com',
    avatar: '/avatars/user.jpg',
  },
  teams: [
    {
      name: 'NeuroAlto',
      logo: Brain,
      plan: 'Pro',
    }
  ],
  navMain: [
    {
      title: 'Главная',
      url: '/client/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Профиль',
      url: '/client/profile',
      icon: User,
      items: [
        {
          title: 'Просмотр',
          url: '/client/profile',
        },
        {
          title: 'Редактировать',
          url: '/client/profile/edit',
        },
      ],
    },
    {
      title: 'Отчеты',
      url: '/client/reports',
      icon: BarChart3,
      items: [
        {
          title: 'Аналитика',
          url: '/client/reports/analytics',
        },
        {
          title: 'Статистика',
          url: '/client/reports/stats',
        },
        {
          title: 'Экспорт данных',
          url: '/client/reports/export',
        },
      ],
    },
    {
      title: 'Документы',
      url: '/client/documents',
      icon: FileText,
      items: [
        {
          title: 'Мои документы',
          url: '/client/documents/my',
        },
        {
          title: 'Общие',
          url: '/client/documents/shared',
        },
        {
          title: 'Архив',
          url: '/client/documents/archive',
        },
      ],
    },
    {
      title: 'Каналы',
      url: '/client/channels',
      icon: MessageSquare,
      items: [
        {
          title: 'WhatsApp',
          url: '/client/channels/whatsapp',
        },
        {
          title: 'Telegram',
          url: '/client/channels/telegram',
        },
        {
          title: 'Instagram',
          url: '/client/channels/instagram',
        },
      ],
    },
    {
      title: 'Настройки',
      url: '/client/settings',
      icon: Settings,
      items: [
        {
          title: 'Общие',
          url: '/client/settings/general',
        },
        {
          title: 'Безопасность',
          url: '/client/settings/security',
        },
        {
          title: 'Уведомления',
          url: '/client/settings/notifications',
        },
      ],
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
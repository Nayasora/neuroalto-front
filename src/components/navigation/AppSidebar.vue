<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Brain,
  Home,
  MessageCircle,
  Send,
  Camera,
  MessageSquare,
} from 'lucide-vue-next'

import NavMain from './NavMain.vue'
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
      title: 'Каналы',
      url: '/client/channels',
      icon: MessageSquare,
      items: [
        {
          title: 'WhatsApp',
          url: '/client/channels/whatsapp',
          icon: MessageCircle,
        },
        {
          title: 'Telegram',
          url: '/client/channels/telegram',
          icon: Send,
        },
        {
          title: 'Instagram',
          url: '/client/channels/instagram',
          icon: Camera,
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
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
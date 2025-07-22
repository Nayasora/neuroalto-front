<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Brain,
  Home,
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
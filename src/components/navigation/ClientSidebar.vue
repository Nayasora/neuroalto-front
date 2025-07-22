<template>
  <Sidebar variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <router-link to="/client/dashboard" class="flex items-center">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">NeuroAlto</span>
                <span class="truncate text-xs">Панель клиента</span>
              </div>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Главное</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in mainNavItems" :key="item.title">
            <SidebarMenuButton :as-child="true">
              <router-link :to="item.url" class="flex items-center gap-2">
                <component :is="item.icon" class="size-4" />
                <span>{{ item.title }}</span>
              </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Личный кабинет</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in profileNavItems" :key="item.title">
            <SidebarMenuButton :as-child="true">
              <router-link :to="item.url" class="flex items-center gap-2">
                <component :is="item.icon" class="size-4" />
                <span>{{ item.title }}</span>
              </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" class="flex items-center gap-2">
            <User2 class="size-4" />
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Пользователь</span>
              <span class="truncate text-xs">user@example.com</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { 
  BookOpen,
  Home,
  ShoppingBag,
  User2,
  Settings,
  ChevronsUpDown
} from 'lucide-vue-next'

const mainNavItems = [
  {
    title: "Главная",
    url: "/client/dashboard",
    icon: Home,
  },
  {
    title: "Заказы",
    url: "/client/orders",
    icon: ShoppingBag,
  }
]

const profileNavItems = [
  {
    title: "Профиль",
    url: "/client/profile",
    icon: User2,
  },
  {
    title: "Настройки",
    url: "/client/settings",
    icon: Settings,
  }
]
</script>
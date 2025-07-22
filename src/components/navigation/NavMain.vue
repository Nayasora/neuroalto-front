<script setup lang="ts">
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}>()

const route = useRoute()

const isItemActive = (item: any) => {
  if (item.items) {
    return item.items.some((subItem: any) => route.path === subItem.url) || route.path === item.url
  }
  return route.path === item.url
}

const isSubItemActive = (subItemUrl: string) => {
  return route.path === subItemUrl
}
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="isItemActive(item)"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger v-if="item.items" as-child>
            <SidebarMenuButton 
              :tooltip="item.title"
              :is-active="isItemActive(item)"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          
          <SidebarMenuButton 
            v-else
            as-child
            :tooltip="item.title"
            :is-active="isItemActive(item)"
          >
            <router-link :to="item.url">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </SidebarMenuButton>

          <CollapsibleContent v-if="item.items">
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton 
                  as-child
                  :is-active="isSubItemActive(subItem.url)"
                >
                  <router-link :to="subItem.url">
                    <component :is="subItem.icon" v-if="subItem.icon" />
                    <span>{{ subItem.title }}</span>
                  </router-link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
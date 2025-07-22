<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <router-link to="/client/dashboard">Главная</router-link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink v-if="index < breadcrumbItems.length - 1" as-child>
            <router-link :to="item.path">{{ item.title }}</router-link>
          </BreadcrumbLink>
          <BreadcrumbPage v-else>{{ item.title }}</BreadcrumbPage>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()

interface BreadcrumbItem {
  title: string
  path: string
}

const routeMap: Record<string, string> = {
  '/client/dashboard': 'Панель управления',
  '/client/profile': 'Профиль',
  '/client/profile/edit': 'Редактировать профиль',
  '/client/orders': 'Заказы',
  '/client/settings': 'Настройки'
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const currentPath = route.path
  
  if (currentPath === '/client/dashboard') {
    return []
  }

  const pathSegments = currentPath.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []
  
  let currentSegmentPath = ''
  
  for (let i = 1; i < pathSegments.length; i++) {
    currentSegmentPath += `/${pathSegments[i]}`
    
    const title = routeMap[currentSegmentPath]
    if (title && currentSegmentPath !== '/client/dashboard') {
      items.push({
        title,
        path: currentSegmentPath
      })
    }
  }
  
  return items
})
</script>
<template>
  <SidebarProvider>
    <div class="min-h-screen bg-background">
      <ClientSidebar />
      <SidebarInset>
        <header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <ClientBreadcrumb />
        </header>
        <main class="flex-1 p-4">
          <router-view />
        </main>
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import ClientSidebar from '@/components/navigation/ClientSidebar.vue'
import ClientBreadcrumb from '@/components/navigation/ClientBreadcrumb.vue'
</script>
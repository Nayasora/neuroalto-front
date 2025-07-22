<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-300">404</h1>
      <h2 class="text-3xl font-bold text-gray-900 mt-4 mb-2">
        Страница не найдена
      </h2>
      <p class="text-gray-600 mb-8">
        К сожалению, запрашиваемая страница не существует
      </p>
      <RouterLink
        to="/"
        class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Вернуться на главную
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
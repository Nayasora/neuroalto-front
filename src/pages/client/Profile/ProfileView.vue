<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Профиль пользователя</h1>
    <div class="bg-white rounded-lg shadow border p-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Имя</label>
          <p class="mt-1 text-sm text-gray-900">Иван Иванов</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-900">ivan@example.com</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Статус</label>
          <p class="mt-1 text-sm text-green-600">Активный</p>
        </div>
      </div>
      <div class="mt-6">
        <RouterLink
          to="/client/profile/edit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Редактировать
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
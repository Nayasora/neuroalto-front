<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Редактирование профиля</h1>
    <div class="bg-white rounded-lg shadow border p-6">
      <form class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Имя
          </label>
          <input
            id="name"
            type="text"
            v-model="profile.name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="profile.email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="flex space-x-3">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Сохранить
          </button>
          <RouterLink
            to="/client/profile"
            class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Отмена
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const profile = ref({
  name: 'Иван Иванов',
  email: 'ivan@example.com'
})
</script>
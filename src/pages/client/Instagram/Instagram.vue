<template>
  <div class="flex h-screen antialiased text-gray-800 bg-white">
    <div class="flex flex-row h-full w-full overflow-x-hidden">
      <!-- Панель списка чатов -->
      <div class="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0 border-r border-gray-200">
        <div class="flex flex-row items-center justify-center h-12 w-full">
          <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <div class="ml-2 font-bold text-2xl">Чаты</div>
        </div>
        <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div class="h-20 w-20 rounded-full border overflow-hidden">
            <img src="https://placekitten.com/200/200" alt="Avatar" class="h-full w-full" />
          </div>
          <div class="text-sm font-semibold mt-2">Asylhan Demeuov</div>
          <div class="text-xs text-gray-500">Разработчик</div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Активные переписки</span>
            <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{{ chats.length }}</span>
          </div>
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
            <button
              v-for="chat in chats"
              :key="chat.id"
              @click="selectChat(chat)"
              :class="['flex flex-row items-center hover:bg-gray-100 rounded-xl p-2', { 'bg-gray-100': selectedChat && selectedChat.id === chat.id }]"
            >
              <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                <img :src="chat.avatar" alt="Avatar" class="h-full w-full rounded-full" />
              </div>
              <div class="ml-2 text-sm font-semibold">{{ chat.name }}</div>
            </button>
          </div>
        </div>
      </div>
      <!-- Панель сообщений -->
      <div class="flex flex-col flex-auto h-full p-6">
        <div v-if="selectedChat" class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <!-- Заголовок чата -->
          <div class="flex items-center pb-4 border-b border-gray-200">
            <div class="flex items-center">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 text-white">
                <img :src="selectedChat.avatar" alt="Avatar" class="h-full w-full rounded-full" />
              </div>
              <div class="flex flex-col ml-3">
                <div class="font-semibold text-sm">{{ selectedChat.name }}</div>
                <div class="text-xs text-gray-500">Онлайн</div>
              </div>
            </div>
          </div>
          <!-- Область сообщений -->
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div v-for="message in messages" :key="message.id" class="grid grid-cols-12 gap-y-2">
                <div v-if="message.sender !== 'me'" class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      <img :src="selectedChat.avatar" alt="Avatar" class="h-full w-full rounded-full" />
                    </div>
                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>{{ message.text }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      <img src="https://placekitten.com/200/200" alt="Avatar" class="h-full w-full rounded-full" />
                    </div>
                    <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>{{ message.text }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Поле ввода сообщения -->
          <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
              <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
              </button>
            </div>
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input type="text" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
                <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ml-4">
              <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span>Отправить</span>
                <span class="ml-2">
                  <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center h-full text-center">
          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <p class="text-gray-500 mt-4">Выберите чат, чтобы начать переписку</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chats = ref([
  { id: 1, name: 'Elon Musk', avatar: 'https://placekitten.com/g/200/200' },
  { id: 2, name: 'Jeff Bezos', avatar: 'https://placekitten.com/g/201/201' },
  { id: 3, name: 'Bill Gates', avatar: 'https://placekitten.com/g/202/202' },
  { id: 4, name: 'Mark Zuckerberg', avatar: 'https://placekitten.com/g/203/203' },
])

const selectedChat = ref(null)

const messages = ref([])

const allMessages = {
  1: [
    { id: 1, text: 'Привет! Как дела?', sender: 'Elon Musk' },
    { id: 2, text: 'Привет! Все отлично, спасибо!', sender: 'me' },
    { id: 3, text: 'Работаю над новым проектом. Очень интересно.', sender: 'Elon Musk' },
  ],
  2: [
    { id: 1, text: 'Добрый день!', sender: 'Jeff Bezos' },
  ],
  3: [
    { id: 1, text: 'Какие планы на выходные?', sender: 'Bill Gates' },
    { id: 2, text: 'Пока не решил. Может быть, почитаю книгу.', sender: 'me' },
    { id: 3, text: 'Отличная идея!', sender: 'Bill Gates' },
    { id: 4, text: 'А ты?', sender: 'me' },
    { id: 5, text: 'Я тоже думаю отдохнуть.', sender: 'Bill Gates' },
  ],
  4: [],
}

const selectChat = (chat) => {
  selectedChat.value = chat
  messages.value = allMessages[chat.id] || []
}
</script>

<style scoped>
/* Дополнительные стили могут быть добавлены здесь, если это необходимо */
</style>

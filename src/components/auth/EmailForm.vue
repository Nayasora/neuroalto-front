<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Loader2 } from 'lucide-vue-next'
import type { EmailFormData } from '@/types/auth'

interface EmailFormProps {
  isLoading: boolean
  error: string | null
}

interface EmailFormEmits {
  submit: [data: EmailFormData]
}

defineProps<EmailFormProps>()
const emit = defineEmits<EmailFormEmits>()

const email = ref('')

const handleSubmit = () => {
  if (!email.value.trim()) return
  emit('submit', { email: email.value.trim() })
}
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader class="text-center">
      <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Mail class="h-6 w-6 text-primary" />
      </div>
      <CardTitle class="text-2xl">Вход в систему</CardTitle>
      <CardDescription>
        Введите ваш email адрес для получения кода доступа
      </CardDescription>
    </CardHeader>
    
    <CardContent class="space-y-4">
      <Alert v-if="error" variant="destructive">
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email адрес</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="example@company.com"
            :disabled="isLoading"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          class="w-full" 
          :disabled="isLoading || !email.trim()"
        >
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          {{ isLoading ? 'Отправка...' : 'Отправить код' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
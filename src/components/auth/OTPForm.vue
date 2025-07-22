<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PinInput, PinInputGroup, PinInputSlot } from '@/components/ui/pin-input'
import { Shield, ArrowLeft, Loader2, RotateCcw } from 'lucide-vue-next'
import type { OTPFormData } from '@/types/auth'

interface OTPFormProps {
  email: string
  isLoading: boolean
  error: string | null
  canResendCode: boolean
  formattedCountdown: string
}

interface OTPFormEmits {
  submit: [data: OTPFormData]
  resend: []
  back: []
}

defineProps<OTPFormProps>()
const emit = defineEmits<OTPFormEmits>()

const otpValue = ref<string[]>(['', '', '', '', '', ''])
const pinInputRef = ref()

const isComplete = ref(false)

watch(otpValue, (newValue) => {
  isComplete.value = newValue.every(digit => digit !== '')
  
  if (isComplete.value) {
    handleSubmit()
  }
}, { deep: true })

const handleSubmit = () => {
  if (!isComplete.value) return
  
  const code = otpValue.value.join('')
  emit('submit', { code })
}

const handleResend = () => {
  otpValue.value = ['', '', '', '', '', '']
  isComplete.value = false
  emit('resend')
}

const handleBack = () => {
  emit('back')
}

const focusInput = () => {
  pinInputRef.value?.focus()
}
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader class="text-center">
      <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Shield class="h-6 w-6 text-primary" />
      </div>
      <CardTitle class="text-2xl">Проверьте почту</CardTitle>
      <CardDescription>
        Мы отправили 6-значный код на<br>
        <strong>{{ email }}</strong>
      </CardDescription>
    </CardHeader>
    
    <CardContent class="space-y-6">
      <Alert v-if="error" variant="destructive">
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
      
      <div class="space-y-4">
        <div class="flex justify-center">
          <PinInput 
            ref="pinInputRef"
            v-model="otpValue" 
            :length="6" 
            :disabled="isLoading"
            placeholder="●"
            type="number"
            class="gap-2"
            @complete="handleSubmit"
          >
            <PinInputGroup>
              <PinInputSlot 
                v-for="(_, index) in 6" 
                :key="index" 
                :index="index"
                class="w-12 h-12 text-lg font-mono"
              />
            </PinInputGroup>
          </PinInput>
        </div>
        
        <div class="text-center text-sm text-muted-foreground">
          <p>Введите код из письма</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <Button 
          @click="handleSubmit"
          class="w-full" 
          :disabled="!isComplete || isLoading"
        >
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          {{ isLoading ? 'Проверка...' : 'Войти' }}
        </Button>
        
        <div class="flex justify-between">
          <Button 
            @click="handleBack"
            variant="ghost" 
            size="sm"
            :disabled="isLoading"
          >
            <ArrowLeft class="mr-1 h-4 w-4" />
            Назад
          </Button>
          
          <Button 
            @click="handleResend"
            variant="ghost" 
            size="sm"
            :disabled="!canResendCode || isLoading"
          >
            <RotateCcw class="mr-1 h-4 w-4" />
            {{ canResendCode ? 'Отправить еще раз' : `Повтор через ${formattedCountdown}` }}
          </Button>
        </div>
      </div>
      
      <div class="text-center text-xs text-muted-foreground">
        <p>Не получили код? Проверьте папку "Спам"</p>
      </div>
    </CardContent>
  </Card>
</template>
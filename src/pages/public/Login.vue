<script setup lang="ts">
import { useOTPAuth } from '@/composables/useOTPAuth'
import EmailForm from '@/components/auth/EmailForm.vue'
import OTPForm from '@/components/auth/OTPForm.vue'
import type { EmailFormData, OTPFormData } from '@/types/auth'

const { 
  state, 
  canResendCode, 
  formattedCountdown,
  sendOTPCode, 
  verifyOTPCode, 
  resendOTPCode,
  goBackToEmail 
} = useOTPAuth()

const handleEmailSubmit = async (data: EmailFormData) => {
  try {
    await sendOTPCode(data)
  } catch (error) {
    console.error('Email submission error:', error)
  }
}

const handleOTPSubmit = async (data: OTPFormData) => {
  try {
    await verifyOTPCode(data)
  } catch (error) {
    console.error('OTP verification error:', error)
  }
}

const handleResendCode = async () => {
  try {
    await resendOTPCode()
  } catch (error) {
    console.error('Resend code error:', error)
  }
}

const handleBackToEmail = () => {
  goBackToEmail()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <Transition
      name="step"
      mode="out-in"
    >
      <EmailForm
        v-if="state.step === 'email'"
        :is-loading="state.isLoading"
        :error="state.error"
        @submit="handleEmailSubmit"
      />
      
      <OTPForm
        v-else-if="state.step === 'otp'"
        :email="state.email"
        :is-loading="state.isLoading"
        :error="state.error"
        :can-resend-code="canResendCode"
        :formatted-countdown="formattedCountdown"
        @submit="handleOTPSubmit"
        @resend="handleResendCode"
        @back="handleBackToEmail"
      />
    </Transition>
  </div>
</template>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.3s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { OTPAuthState, EmailFormData, OTPFormData } from '@/types/auth'
import { authService } from '@/services'
import { AxiosError } from 'axios'

export function useOTPAuth() {
  const router = useRouter()
  
  const state = ref<OTPAuthState>({
    step: 'email',
    email: '',
    otpCode: '',
    isLoading: false,
    error: null,
    countdown: 0
  })

  const canResendCode = computed(() => state.value.countdown === 0)
  const formattedCountdown = computed(() => 
    state.value.countdown > 0 ? `${state.value.countdown}s` : ''
  )

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const sendOTPCode = async (formData: EmailFormData): Promise<void> => {
    if (!validateEmail(formData.email)) {
      throw new Error('Введите корректный email адрес')
    }

    state.value.isLoading = true
    state.value.error = null

    try {
      const response = await authService.sendOTP({
        email: formData.email
      })

      if (response.success) {
        state.value.email = formData.email
        state.value.step = 'otp'
        startCountdown()
      } else {
        throw new Error(response.message || 'Ошибка отправки кода')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        state.value.error = error.response?.data?.message || error.message
      } else {
        state.value.error = error instanceof Error ? error.message : 'Произошла ошибка'
      }
    } finally {
      state.value.isLoading = false
    }
  }

  const verifyOTPCode = async (formData: OTPFormData): Promise<void> => {
    if (formData.code.length !== 6) {
      throw new Error('Код должен содержать 6 цифр')
    }

    state.value.isLoading = true
    state.value.error = null

    try {
      const response = await authService.verifyOTP({
        email: state.value.email,
        code: formData.code
      })

      if (response.success) {
        state.value.otpCode = formData.code
        
        if (response.token) {
          localStorage.setItem('auth-token', response.token)
        }
        
        await router.push('/client/dashboard')
      } else {
        throw new Error(response.message || 'Неверный код')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        state.value.error = error.response?.data?.message || error.message
      } else {
        state.value.error = error instanceof Error ? error.message : 'Произошла ошибка'
      }
    } finally {
      state.value.isLoading = false
    }
  }

  const resendOTPCode = async (): Promise<void> => {
    if (!canResendCode.value || !state.value.email) return
    
    try {
      await sendOTPCode({ email: state.value.email })
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'Ошибка повторной отправки'
    }
  }

  const startCountdown = () => {
    state.value.countdown = 60
    const timer = setInterval(() => {
      state.value.countdown--
      if (state.value.countdown <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  const resetState = () => {
    state.value.step = 'email'
    state.value.email = ''
    state.value.otpCode = ''
    state.value.error = null
    state.value.countdown = 0
  }

  const goBackToEmail = () => {
    state.value.step = 'email'
    state.value.error = null
  }

  return {
    state,
    canResendCode,
    formattedCountdown,
    sendOTPCode,
    verifyOTPCode,
    resendOTPCode,
    resetState,
    goBackToEmail
  }
}
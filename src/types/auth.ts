export interface OTPAuthState {
  step: 'email' | 'otp'
  email: string
  otpCode: string
  isLoading: boolean
  error: string | null
  countdown: number
}

export interface OTPAuthResponse {
  success: boolean
  message?: string
  token?: string
}

export interface EmailFormData {
  email: string
}

export interface OTPFormData {
  code: string
}
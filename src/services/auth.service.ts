import apiClient from './api'
import type { AuthResponse, OTPRequest, OTPVerifyRequest } from '@/types/auth'

export interface LoginRequest {
  email: string
}

export interface RegisterRequest {
  email: string
  name?: string
  company?: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface UserProfile {
  id: string
  email: string
  name?: string
  company?: string
  createdAt: string
  updatedAt: string
}

class AuthService {
  async sendOTP(data: OTPRequest): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/auth/otp/send', data)
    return response.data
  }

  async verifyOTP(data: OTPVerifyRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/otp/verify', data)
    return response.data
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data)
    return response.data
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data)
    return response.data
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('auth-token')
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', data)
    return response.data
  }
}

export default new AuthService()
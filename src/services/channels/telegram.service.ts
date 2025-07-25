import apiClient from '../api'

export interface TelegramChannel {
  id: string
  title: string
  username?: string
  description?: string
  memberCount: number
  isConnected: boolean
  lastSync?: string
}

export interface TelegramBot {
  id: string
  username: string
  firstName: string
  isActive: boolean
  token: string
  createdAt: string
}

export interface TelegramMessage {
  id: string
  channelId: string
  text?: string
  mediaUrl?: string
  mediaType?: 'photo' | 'video' | 'document'
  scheduledAt?: string
  status: 'draft' | 'scheduled' | 'sent' | 'failed'
  sentAt?: string
  views?: number
}

export interface CreateMessageRequest {
  channelId: string
  text?: string
  mediaUrl?: string
  mediaType?: 'photo' | 'video' | 'document'
  scheduledAt?: string
  parseMode?: 'HTML' | 'Markdown'
}

export interface TelegramMetrics {
  channelId: string
  period: 'day' | 'week' | 'month' | 'year'
  views: number
  joins: number
  leaves: number
  messagesCount: number
  engagement: number
}

class TelegramService {
  async getChannels(): Promise<TelegramChannel[]> {
    const response = await apiClient.get<TelegramChannel[]>('/channels/telegram/channels')
    return response.data
  }

  async connectChannel(botToken: string, channelUsername: string): Promise<TelegramChannel> {
    const response = await apiClient.post<TelegramChannel>('/channels/telegram/connect', {
      botToken,
      channelUsername,
    })
    return response.data
  }

  async disconnectChannel(channelId: string): Promise<void> {
    await apiClient.delete(`/channels/telegram/channels/${channelId}`)
  }

  async getBots(): Promise<TelegramBot[]> {
    const response = await apiClient.get<TelegramBot[]>('/channels/telegram/bots')
    return response.data
  }

  async createBot(token: string): Promise<TelegramBot> {
    const response = await apiClient.post<TelegramBot>('/channels/telegram/bots', { token })
    return response.data
  }

  async deleteBot(botId: string): Promise<void> {
    await apiClient.delete(`/channels/telegram/bots/${botId}`)
  }

  async getMessages(channelId: string, params?: { 
    status?: string
    limit?: number
    offset?: number 
  }): Promise<TelegramMessage[]> {
    const response = await apiClient.get<TelegramMessage[]>(
      `/channels/telegram/channels/${channelId}/messages`,
      { params }
    )
    return response.data
  }

  async sendMessage(data: CreateMessageRequest): Promise<TelegramMessage> {
    const response = await apiClient.post<TelegramMessage>('/channels/telegram/messages', data)
    return response.data
  }

  async updateMessage(messageId: string, data: Partial<CreateMessageRequest>): Promise<TelegramMessage> {
    const response = await apiClient.put<TelegramMessage>(`/channels/telegram/messages/${messageId}`, data)
    return response.data
  }

  async deleteMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/channels/telegram/messages/${messageId}`)
  }

  async publishMessage(messageId: string): Promise<TelegramMessage> {
    const response = await apiClient.post<TelegramMessage>(`/channels/telegram/messages/${messageId}/publish`)
    return response.data
  }

  async getMetrics(channelId: string, period: TelegramMetrics['period']): Promise<TelegramMetrics> {
    const response = await apiClient.get<TelegramMetrics>(
      `/channels/telegram/channels/${channelId}/metrics`,
      { params: { period } }
    )
    return response.data
  }

  async syncChannel(channelId: string): Promise<void> {
    await apiClient.post(`/channels/telegram/channels/${channelId}/sync`)
  }

  async testBot(botId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/channels/telegram/bots/${botId}/test`)
    return response.data
  }
}

export default new TelegramService()
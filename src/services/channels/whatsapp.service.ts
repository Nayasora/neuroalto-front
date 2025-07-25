import apiClient from '../api'

export interface WhatsAppAccount {
  id: string
  phoneNumber: string
  displayName: string
  businessName?: string
  isConnected: boolean
  qrCode?: string
  lastSync?: string
  status: 'connected' | 'disconnected' | 'pending_qr'
}

export interface WhatsAppContact {
  id: string
  phoneNumber: string
  name?: string
  profilePicture?: string
  isBusinessAccount: boolean
  lastMessageAt?: string
}

export interface WhatsAppMessage {
  id: string
  accountId: string
  recipientPhone: string
  recipientName?: string
  text?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video' | 'document' | 'audio'
  scheduledAt?: string
  status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'read' | 'failed'
  sentAt?: string
  deliveredAt?: string
  readAt?: string
}

export interface CreateWhatsAppMessageRequest {
  accountId: string
  recipientPhone: string
  text?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video' | 'document' | 'audio'
  scheduledAt?: string
}

export interface WhatsAppTemplate {
  id: string
  name: string
  language: string
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
  content: string
  variables?: string[]
  status: 'approved' | 'pending' | 'rejected'
}

export interface WhatsAppMetrics {
  accountId: string
  period: 'day' | 'week' | 'month' | 'year'
  messagesSent: number
  messagesDelivered: number
  messagesRead: number
  messagesFailed: number
  conversationsStarted: number
}

export interface BulkMessageRequest {
  accountId: string
  recipients: string[]
  text?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video' | 'document' | 'audio'
  templateId?: string
  templateVariables?: Record<string, string>
  scheduledAt?: string
}

class WhatsAppService {
  async getAccounts(): Promise<WhatsAppAccount[]> {
    const response = await apiClient.get<WhatsAppAccount[]>('/channels/whatsapp/accounts')
    return response.data
  }

  async connectAccount(phoneNumber: string): Promise<WhatsAppAccount> {
    const response = await apiClient.post<WhatsAppAccount>('/channels/whatsapp/connect', {
      phoneNumber,
    })
    return response.data
  }

  async disconnectAccount(accountId: string): Promise<void> {
    await apiClient.delete(`/channels/whatsapp/accounts/${accountId}`)
  }

  async getQRCode(accountId: string): Promise<{ qrCode: string }> {
    const response = await apiClient.get<{ qrCode: string }>(
      `/channels/whatsapp/accounts/${accountId}/qr`
    )
    return response.data
  }

  async getContacts(accountId: string, params?: { 
    search?: string
    limit?: number
    offset?: number 
  }): Promise<WhatsAppContact[]> {
    const response = await apiClient.get<WhatsAppContact[]>(
      `/channels/whatsapp/accounts/${accountId}/contacts`,
      { params }
    )
    return response.data
  }

  async getMessages(accountId: string, params?: { 
    status?: string
    limit?: number
    offset?: number 
  }): Promise<WhatsAppMessage[]> {
    const response = await apiClient.get<WhatsAppMessage[]>(
      `/channels/whatsapp/accounts/${accountId}/messages`,
      { params }
    )
    return response.data
  }

  async sendMessage(data: CreateWhatsAppMessageRequest): Promise<WhatsAppMessage> {
    const response = await apiClient.post<WhatsAppMessage>('/channels/whatsapp/messages', data)
    return response.data
  }

  async sendBulkMessage(data: BulkMessageRequest): Promise<{ 
    success: number
    failed: number
    messages: WhatsAppMessage[] 
  }> {
    const response = await apiClient.post('/channels/whatsapp/messages/bulk', data)
    return response.data
  }

  async updateMessage(messageId: string, data: Partial<CreateWhatsAppMessageRequest>): Promise<WhatsAppMessage> {
    const response = await apiClient.put<WhatsAppMessage>(`/channels/whatsapp/messages/${messageId}`, data)
    return response.data
  }

  async deleteMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/channels/whatsapp/messages/${messageId}`)
  }

  async publishMessage(messageId: string): Promise<WhatsAppMessage> {
    const response = await apiClient.post<WhatsAppMessage>(`/channels/whatsapp/messages/${messageId}/publish`)
    return response.data
  }

  async getTemplates(accountId: string): Promise<WhatsAppTemplate[]> {
    const response = await apiClient.get<WhatsAppTemplate[]>(
      `/channels/whatsapp/accounts/${accountId}/templates`
    )
    return response.data
  }

  async createTemplate(accountId: string, template: Omit<WhatsAppTemplate, 'id' | 'status'>): Promise<WhatsAppTemplate> {
    const response = await apiClient.post<WhatsAppTemplate>(
      `/channels/whatsapp/accounts/${accountId}/templates`,
      template
    )
    return response.data
  }

  async getMetrics(accountId: string, period: WhatsAppMetrics['period']): Promise<WhatsAppMetrics> {
    const response = await apiClient.get<WhatsAppMetrics>(
      `/channels/whatsapp/accounts/${accountId}/metrics`,
      { params: { period } }
    )
    return response.data
  }

  async syncAccount(accountId: string): Promise<void> {
    await apiClient.post(`/channels/whatsapp/accounts/${accountId}/sync`)
  }

  async importContacts(accountId: string, file: File): Promise<{ imported: number; failed: number }> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await apiClient.post(
      `/channels/whatsapp/accounts/${accountId}/contacts/import`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  }
}

export default new WhatsAppService()
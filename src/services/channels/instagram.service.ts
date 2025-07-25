import apiClient from '../api'

export interface InstagramAccount {
  id: string
  username: string
  profilePicture?: string
  followers: number
  following: number
  isConnected: boolean
  lastSync?: string
}

export interface InstagramPost {
  id: string
  accountId: string
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL'
  caption?: string
  likes: number
  comments: number
  createdAt: string
  scheduledAt?: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
}

export interface CreatePostRequest {
  accountId: string
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL'
  caption?: string
  scheduledAt?: string
}

export interface InstagramMetrics {
  accountId: string
  period: 'day' | 'week' | 'month' | 'year'
  impressions: number
  reach: number
  engagement: number
  profileVisits: number
  websiteClicks: number
}

class InstagramService {
  async getAccounts(): Promise<InstagramAccount[]> {
    const response = await apiClient.get<InstagramAccount[]>('/channels/instagram/accounts')
    return response.data
  }

  async connectAccount(accessToken: string): Promise<InstagramAccount> {
    const response = await apiClient.post<InstagramAccount>('/channels/instagram/connect', {
      accessToken,
    })
    return response.data
  }

  async disconnectAccount(accountId: string): Promise<void> {
    await apiClient.delete(`/channels/instagram/accounts/${accountId}`)
  }

  async getPosts(accountId: string, params?: { 
    status?: string
    limit?: number
    offset?: number 
  }): Promise<InstagramPost[]> {
    const response = await apiClient.get<InstagramPost[]>(
      `/channels/instagram/accounts/${accountId}/posts`,
      { params }
    )
    return response.data
  }

  async createPost(data: CreatePostRequest): Promise<InstagramPost> {
    const response = await apiClient.post<InstagramPost>('/channels/instagram/posts', data)
    return response.data
  }

  async updatePost(postId: string, data: Partial<CreatePostRequest>): Promise<InstagramPost> {
    const response = await apiClient.put<InstagramPost>(`/channels/instagram/posts/${postId}`, data)
    return response.data
  }

  async deletePost(postId: string): Promise<void> {
    await apiClient.delete(`/channels/instagram/posts/${postId}`)
  }

  async publishPost(postId: string): Promise<InstagramPost> {
    const response = await apiClient.post<InstagramPost>(`/channels/instagram/posts/${postId}/publish`)
    return response.data
  }

  async getMetrics(accountId: string, period: InstagramMetrics['period']): Promise<InstagramMetrics> {
    const response = await apiClient.get<InstagramMetrics>(
      `/channels/instagram/accounts/${accountId}/metrics`,
      { params: { period } }
    )
    return response.data
  }

  async syncAccount(accountId: string): Promise<void> {
    await apiClient.post(`/channels/instagram/accounts/${accountId}/sync`)
  }

  async getHashtags(query: string): Promise<string[]> {
    const response = await apiClient.get<string[]>('/channels/instagram/hashtags/suggest', {
      params: { query },
    })
    return response.data
  }
}

export default new InstagramService()
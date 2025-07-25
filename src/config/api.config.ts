export const API_CONFIG = {
  baseURL: 'https://neuroalto.com/api/v1',
  timeout: 30000,
  
  endpoints: {
    auth: {
      sendOTP: '/auth/otp/send',
      verifyOTP: '/auth/otp/verify',
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      profile: '/auth/profile',
      changePassword: '/auth/change-password',
      resetPassword: '/auth/reset-password',
    },
    
    channels: {
      instagram: {
        accounts: '/channels/instagram/accounts',
        connect: '/channels/instagram/connect',
        posts: '/channels/instagram/posts',
        metrics: '/channels/instagram/accounts/:accountId/metrics',
        hashtags: '/channels/instagram/hashtags/suggest',
      },
      
      telegram: {
        channels: '/channels/telegram/channels',
        connect: '/channels/telegram/connect',
        bots: '/channels/telegram/bots',
        messages: '/channels/telegram/messages',
        metrics: '/channels/telegram/channels/:channelId/metrics',
      },
      
      whatsapp: {
        accounts: '/channels/whatsapp/accounts',
        connect: '/channels/whatsapp/connect',
        messages: '/channels/whatsapp/messages',
        bulkMessages: '/channels/whatsapp/messages/bulk',
        templates: '/channels/whatsapp/accounts/:accountId/templates',
        contacts: '/channels/whatsapp/accounts/:accountId/contacts',
        metrics: '/channels/whatsapp/accounts/:accountId/metrics',
      },
    },
    
    analytics: {
      dashboard: '/analytics/dashboard',
      reports: '/analytics/reports',
      export: '/analytics/export',
    },
    
    settings: {
      general: '/settings/general',
      notifications: '/settings/notifications',
      integrations: '/settings/integrations',
      billing: '/settings/billing',
    },
  },
  
  headers: {
    common: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    multipart: {
      'Content-Type': 'multipart/form-data',
    },
  },
  
  statusCodes: {
    success: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    unprocessable: 422,
    serverError: 500,
  },
} as const

export type ApiEndpoints = typeof API_CONFIG.endpoints
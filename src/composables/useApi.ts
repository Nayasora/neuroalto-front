import { ref } from 'vue'
import type { Ref } from 'vue'
import { AxiosError } from 'axios'

export interface ApiState<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
}

export interface ApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useApi<T = any>(
  apiCall: () => Promise<T>,
  options: ApiOptions = {}
): ApiState<T> & { execute: () => Promise<T | null> } {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const execute = async (): Promise<T | null> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiCall()
      data.value = response
      
      if (options.onSuccess) {
        options.onSuccess(response)
      }
      
      return response
    } catch (err) {
      const apiError = err as AxiosError
      const errorMessage = (apiError.response?.data as any)?.message || apiError.message || 'Произошла ошибка'
      
      error.value = new Error(errorMessage)
      
      if (options.onError) {
        options.onError(error.value)
      }
      
      return null
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) {
    execute()
  }

  return {
    data: data as Ref<T | null>,
    error,
    loading,
    execute,
  }
}

export function useApiWithPagination<T = any>(
  apiCall: (page: number, limit: number) => Promise<{ data: T[]; total: number }>,
  limit = 20
) {
  const items = ref<T[]>([])
  const total = ref(0)
  const currentPage = ref(1)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchPage = async (page: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiCall(page, limit)
      items.value = response.data
      total.value = response.total
      currentPage.value = page
    } catch (err) {
      const apiError = err as AxiosError
      error.value = new Error(apiError.message)
    } finally {
      loading.value = false
    }
  }

  const nextPage = () => {
    if (currentPage.value * limit < total.value) {
      fetchPage(currentPage.value + 1)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      fetchPage(currentPage.value - 1)
    }
  }

  return {
    items,
    total,
    currentPage,
    loading,
    error,
    fetchPage,
    nextPage,
    prevPage,
    hasNextPage: () => currentPage.value * limit < total.value,
    hasPrevPage: () => currentPage.value > 1,
  }
}

export function useApiPolling<T = any>(
  apiCall: () => Promise<T>,
  interval: number = 5000
) {
  const { data, error, loading, execute } = useApi(apiCall)
  const isPolling = ref(false)
  let pollingInterval: ReturnType<typeof setInterval> | null = null

  const startPolling = () => {
    if (isPolling.value) return
    
    isPolling.value = true
    execute()
    
    pollingInterval = setInterval(() => {
      execute()
    }, interval)
  }

  const stopPolling = () => {
    if (!isPolling.value) return
    
    isPolling.value = false
    if (pollingInterval) {
      clearInterval(pollingInterval)
      pollingInterval = null
    }
  }

  return {
    data,
    error,
    loading,
    isPolling,
    startPolling,
    stopPolling,
    execute,
  }
}
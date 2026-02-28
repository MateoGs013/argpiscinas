import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

function readPersistedAuthState() {
  const authStoreRaw = localStorage.getItem('auth')
  if (!authStoreRaw) return null

  try {
    const parsed = JSON.parse(authStoreRaw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function getStoredToken() {
  const persistedAuth = readPersistedAuthState()
  return persistedAuth?.token || null
}

function clearStoredAuthState() {
  localStorage.removeItem('auth')
  // Legacy key cleanup from previous versions.
  localStorage.removeItem('token')
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Resuelve una URL de imagen del backend para que funcione en producción.
 * Convierte rutas relativas como /uploads/img.jpg en URLs absolutas.
 */
export function resolveImageUrl(url) {
  if (!url) return ''
  // Ya es una URL absoluta
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (!API_BASE) return url

  // Ruta relativa del backend → anteponer base URL
  return url.startsWith('/') ? `${API_BASE}${url}` : `${API_BASE}/${url}`
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      clearStoredAuthState()
      delete api.defaults.headers.common['Authorization']

      const requestUrl = String(error.config?.url || '')
      const isAuthLoginRequest = requestUrl.includes('/auth/login')
      const isAdminArea = window.location.pathname.startsWith('/admin')
      const isLoginPage = window.location.pathname.startsWith('/admin/login')

      if (!isAuthLoginRequest && isAdminArea && !isLoginPage) {
        window.location.assign('/admin/login')
      }
    }
    
    return Promise.reject(error)
  }
)

export default api

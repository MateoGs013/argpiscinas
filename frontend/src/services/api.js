import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.argpiscinas.pegasuz.com.ar'

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
  // Ruta relativa del backend → anteponer base URL
  return `${API_BASE}${url}`
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
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
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      
      // Only redirect if not on login page — use Vue Router (lazy import to avoid circular deps)
      if (!window.location.pathname.includes('/admin/login')) {
        const { default: router } = await import('@/router')
        router.push({ name: 'admin-login' })
      }
    }
    
    return Promise.reject(error)
  }
)

export default api

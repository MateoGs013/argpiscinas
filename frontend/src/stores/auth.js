import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

function readPersistedToken() {
  const authStoreRaw = localStorage.getItem('auth')
  if (!authStoreRaw) return null

  try {
    const parsed = JSON.parse(authStoreRaw)
    return parsed?.token || null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(readPersistedToken())
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const isEditor = computed(() => user.value?.role === 'EDITOR')

  // Actions
  async function login(email, password) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/login', { email, password })
      token.value = response.data.token
      user.value = response.data.user
      // Token persistence handled by pinia-plugin-persistedstate (no manual localStorage)
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al iniciar sesión'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await api.get('/auth/me')
      user.value = response.data
    } catch (err) {
      // Token inválido
      logout()
    }
  }

  async function updateProfile(data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put('/auth/profile', data)
      user.value = response.data
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar perfil'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('auth')
    // Legacy key cleanup from previous versions.
    localStorage.removeItem('token')
  }

  // Initialize
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    fetchUser()
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isEditor,
    login,
    logout,
    fetchUser,
    updateProfile
  }
}, {
  persist: {
    paths: ['token']
  }
})

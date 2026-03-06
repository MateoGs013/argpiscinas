import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useContentStore = defineStore('content', () => {
  const contentMap = ref({})
  const sections = ref({})
  const loading = ref(false)
  const saving = ref(false)
  const error = ref(null)
  const loaded = ref(false)

  // Obtener todo el contenido (público)
  async function fetchContent() {
    if (loaded.value) return
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/content')
      contentMap.value = data.data
      loaded.value = true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar contenido'
      console.error('Error fetching content:', err)
    } finally {
      loading.value = false
    }
  }

  // Obtener contenido agrupado por sección (admin)
  async function fetchSections() {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/content/sections')
      sections.value = data.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar secciones'
      console.error('Error fetching sections:', err)
    } finally {
      loading.value = false
    }
  }

  // Actualizar un contenido
  async function updateContent(key, value) {
    saving.value = true
    error.value = null
    try {
      await api.put(`/content/${key}`, { value })
      contentMap.value[key] = value
      // Actualizar también en sections
      for (const section of Object.values(sections.value)) {
        const item = section.find(i => i.key === key)
        if (item) {
          item.value = value
          break
        }
      }
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al guardar'
      throw err
    } finally {
      saving.value = false
    }
  }

  // Actualización masiva
  async function bulkUpdate(items) {
    saving.value = true
    error.value = null
    try {
      const { data } = await api.put('/content/bulk', { items })
      // Actualizar el mapa local
      items.forEach(item => {
        contentMap.value[item.key] = item.value
      })
      // Refrescar secciones
      await fetchSections()
      return data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al guardar'
      throw err
    } finally {
      saving.value = false
    }
  }

  // Obtener valor con fallback
  function get(key, fallback = '') {
    return contentMap.value[key] || fallback
  }

  return {
    contentMap,
    sections,
    loading,
    saving,
    error,
    loaded,
    fetchContent,
    fetchSections,
    updateContent,
    bulkUpdate,
    get
  }
})

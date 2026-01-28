import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchTags() {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/tags')
      tags.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los tags'
      return null
    } finally {
      loading.value = false
    }
  }

  async function createTag(data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/tags', data)
      tags.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el tag'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateTag(id, data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/tags/${id}`, data)
      const index = tags.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tags.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar el tag'
      return null
    } finally {
      loading.value = false
    }
  }

  async function deleteTag(id) {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/tags/${id}`)
      tags.value = tags.value.filter(t => t.id !== id)
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar el tag'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    tags,
    loading,
    error,
    fetchTags,
    createTag,
    updateTag,
    deleteTag
  }
})

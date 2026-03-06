import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCategories() {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/categories')
      categories.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar las categorías'
      return null
    } finally {
      loading.value = false
    }
  }

  async function createCategory(data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/categories', data)
      categories.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear la categoría'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateCategory(id, data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/categories/${id}`, data)
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar la categoría'
      return null
    } finally {
      loading.value = false
    }
  }

  async function deleteCategory(id) {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/categories/${id}`)
      categories.value = categories.value.filter(c => c.id !== id)
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar la categoría'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
})

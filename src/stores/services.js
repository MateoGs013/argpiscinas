import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useServicesStore = defineStore('services', () => {
  const services = ref([])
  const currentService = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const hasLoadedAll = ref(false)
  const hasLoadedFeatured = ref(false)

  const featuredServices = computed(() =>
    services.value.filter(s => s.showOnHome)
  )

  async function fetchServices(params = {}) {
    const showOnHome = params.showOnHome === true || params.showOnHome === 'true'

    if (!showOnHome && hasLoadedAll.value) {
      return services.value
    }

    if (showOnHome && (hasLoadedFeatured.value || hasLoadedAll.value)) {
      return services.value.filter((service) => service.showOnHome)
    }

    loading.value = true
    error.value = null

    try {
      const response = await api.get('/services', { params })
      services.value = response.data
      if (showOnHome) {
        hasLoadedFeatured.value = true
      } else {
        hasLoadedAll.value = true
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los servicios'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchServiceBySlug(slug) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/services/${slug}`)
      currentService.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el servicio'
      return null
    } finally {
      loading.value = false
    }
  }

  async function createService(data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/services', data)
      services.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el servicio'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateService(id, data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/services/${id}`, data)
      const numId = Number(id)
      const index = services.value.findIndex(s => s.id === numId)
      if (index !== -1) {
        services.value[index] = response.data
      }
      currentService.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar el servicio'
      return null
    } finally {
      loading.value = false
    }
  }

  async function deleteService(id) {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/services/${id}`)
      const numId = Number(id)
      services.value = services.value.filter(s => s.id !== numId)
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar el servicio'
      return false
    } finally {
      loading.value = false
    }
  }

  function clearCurrentService() {
    currentService.value = null
  }

  return {
    services,
    currentService,
    loading,
    error,
    hasLoadedAll,
    hasLoadedFeatured,
    featuredServices,
    fetchServices,
    fetchServiceBySlug,
    createService,
    updateService,
    deleteService,
    clearCurrentService,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const currentProject = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const hasLoadedDefault = ref(false)

  const featuredProjects = computed(() => 
    projects.value.filter(p => p.featured)
  )

  async function fetchProjects(params = {}) {
    const isDefaultRequest = Object.keys(params).length === 0
    if (isDefaultRequest && hasLoadedDefault.value) {
      return { projects: projects.value }
    }

    loading.value = true
    error.value = null

    try {
      const response = await api.get('/projects', { params })
      // API returns { projects, pagination } — extract the array
      const data = response.data
      projects.value = data.projects || data
      if (isDefaultRequest) {
        hasLoadedDefault.value = true
      }
      return data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los proyectos'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchAllProjects(params = {}) {
    const isDefaultRequest = Object.keys(params).length === 0
    if (isDefaultRequest && hasLoadedDefault.value) {
      return { projects: projects.value }
    }

    loading.value = true
    error.value = null

    try {
      const collected = []
      const baseParams = { ...params }
      delete baseParams.page
      delete baseParams.limit

      let page = 1
      let totalPages = 1

      while (page <= totalPages) {
        const response = await api.get('/projects', {
          params: {
            ...baseParams,
            page,
            limit: 50
          }
        })

        const data = response.data
        const batch = Array.isArray(data?.projects)
          ? data.projects
          : (Array.isArray(data) ? data : [])

        collected.push(...batch)

        const pagesFromApi = Number(data?.pagination?.pages)
        if (!Number.isFinite(pagesFromApi) || pagesFromApi <= 0) {
          break
        }

        totalPages = pagesFromApi
        page += 1
      }

      projects.value = collected
      if (isDefaultRequest) {
        hasLoadedDefault.value = true
      }

      return {
        projects: collected,
        pagination: {
          page: 1,
          limit: 50,
          total: collected.length,
          pages: totalPages
        }
      }
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los proyectos'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchProjectBySlug(slug) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/projects/${slug}`)
      currentProject.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el proyecto'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchProjectById(id) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/projects/${id}`)
      currentProject.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el proyecto'
      return null
    } finally {
      loading.value = false
    }
  }

  async function createProject(data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/projects', data)
      projects.value.unshift(response.data)
      hasLoadedDefault.value = true
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el proyecto'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateProject(id, data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/projects/${id}`, data)
      const numId = Number(id)
      const index = projects.value.findIndex(p => p.id === numId)
      if (index !== -1) {
        projects.value[index] = response.data
      }
      currentProject.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar el proyecto'
      return null
    } finally {
      loading.value = false
    }
  }

  async function deleteProject(id) {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/projects/${id}`)
      const numId = Number(id)
      projects.value = projects.value.filter(p => p.id !== numId)
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar el proyecto'
      return false
    } finally {
      loading.value = false
    }
  }

  function clearCurrentProject() {
    currentProject.value = null
  }

  return {
    projects,
    currentProject,
    loading,
    error,
    featuredProjects,
    hasLoadedDefault,
    fetchProjects,
    fetchAllProjects,
    fetchProjectBySlug,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    clearCurrentProject
  }
})

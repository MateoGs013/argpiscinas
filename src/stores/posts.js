import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const usePostsStore = defineStore('posts', () => {
  // State
  const posts = ref([])
  const currentPost = ref(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const publishedPosts = computed(() => 
    posts.value.filter(p => p.status === 'PUBLISHED')
  )

  const recentPosts = computed(() => 
    [...posts.value]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 5)
  )

  // Actions - Public
  async function fetchPosts(params = {}) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/posts', { params })
      posts.value = response.data.posts
      pagination.value = response.data.pagination
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los posts'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchPostBySlug(slug) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/posts/slug/${slug}`)
      currentPost.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el post'
      return null
    } finally {
      loading.value = false
    }
  }

  // Actions - Admin
  async function fetchAdminPosts(params = {}) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/posts/admin', { params })
      posts.value = response.data.posts
      pagination.value = response.data.pagination
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los posts'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchPostById(id) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/posts/admin/${id}`)
      currentPost.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el post'
      return null
    } finally {
      loading.value = false
    }
  }

  async function createPost(data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/posts', data)
      posts.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el post'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updatePost(id, data) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/posts/${id}`, data)
      const numId = Number(id)
      const index = posts.value.findIndex(p => p.id === numId)
      if (index !== -1) {
        posts.value[index] = response.data
      }
      currentPost.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar el post'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updatePostStatus(id, status) {
    loading.value = true
    error.value = null

    try {
      const response = await api.patch(`/posts/${id}/status`, { status })
      const numId = Number(id)
      const index = posts.value.findIndex(p => p.id === numId)
      if (index !== -1) {
        posts.value[index] = { ...posts.value[index], status: response.data.status }
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cambiar el estado'
      return null
    } finally {
      loading.value = false
    }
  }

  async function deletePost(id) {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/posts/${id}`)
      const numId = Number(id)
      posts.value = posts.value.filter(p => p.id !== numId)
      return true
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar el post'
      return false
    } finally {
      loading.value = false
    }
  }

  function clearCurrentPost() {
    currentPost.value = null
  }

  return {
    posts,
    currentPost,
    pagination,
    loading,
    error,
    publishedPosts,
    recentPosts,
    fetchPosts,
    fetchPostBySlug,
    fetchAdminPosts,
    fetchPostById,
    createPost,
    updatePost,
    updatePostStatus,
    deletePost,
    clearCurrentPost
  }
})

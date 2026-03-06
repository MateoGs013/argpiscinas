<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p class="text-neutral-600">Bienvenido al panel de administración de ARG Piscinas</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.title" class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-500 mb-1">{{ stat.title }}</p>
            <p class="text-3xl font-bold text-neutral-900">{{ stat.value }}</p>
            <p v-if="stat.change" :class="['text-sm mt-1', stat.change > 0 ? 'text-green-600' : 'text-red-600']">
              {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}% este mes
            </p>
          </div>
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.bgColor]">
            <component :is="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Recent Posts -->
      <div class="card">
        <div class="p-6 border-b border-neutral-100">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-neutral-900">Últimos Artículos</h2>
            <RouterLink to="/admin/posts" class="text-sm text-accent-600 hover:text-accent-700">
              Ver todos
            </RouterLink>
          </div>
        </div>
        <div class="divide-y divide-neutral-100">
          <div v-for="post in recentPosts" :key="post.id" class="p-4 flex items-center space-x-4 hover:bg-neutral-50">
            <div v-if="post.featuredImage" class="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img :src="resolveImageUrl(post.featuredImage)" :alt="post.title" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-neutral-900 truncate">{{ post.title }}</p>
              <p class="text-sm text-neutral-500">{{ formatDate(post.createdAt) }}</p>
            </div>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            ]">
              {{ post.published ? 'Publicado' : 'Borrador' }}
            </span>
          </div>
          <div v-if="recentPosts.length === 0" class="p-8 text-center text-neutral-500">
            No hay artículos todavía
          </div>
        </div>
      </div>

      <!-- Recent Contacts -->
      <div class="card">
        <div class="p-6 border-b border-neutral-100">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-neutral-900">Últimos Contactos</h2>
            <RouterLink to="/admin/contactos" class="text-sm text-accent-600 hover:text-accent-700">
              Ver todos
            </RouterLink>
          </div>
        </div>
        <div class="divide-y divide-neutral-100">
          <div v-for="contact in recentContacts" :key="contact.id" class="p-4 hover:bg-neutral-50">
            <div class="flex items-center justify-between mb-1">
              <p class="font-medium text-neutral-900">{{ contact.name }}</p>
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                contact.status !== 'PENDING' ? 'bg-neutral-100 text-neutral-600' : 'bg-primary-200 text-primary-800'
              ]">
                {{ contact.status !== 'PENDING' ? 'Leído' : 'Nuevo' }}
              </span>
            </div>
            <p class="text-sm text-neutral-600 truncate">{{ contact.service || contact.message }}</p>
            <p class="text-xs text-neutral-400 mt-1">{{ formatDate(contact.createdAt) }}</p>
          </div>
          <div v-if="recentContacts.length === 0" class="p-8 text-center text-neutral-500">
            No hay mensajes todavía
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h2 class="text-lg font-bold text-neutral-900 mb-4">Acciones Rápidas</h2>
      <div class="grid md:grid-cols-4 gap-4">
        <RouterLink 
          to="/admin/posts/nuevo"
          class="card p-6 text-center hover:bg-neutral-50 transition-colors group"
        >
          <div class="w-12 h-12 mx-auto mb-4 bg-primary-200 rounded-xl flex items-center justify-center group-hover:bg-primary-300 transition-colors">
            <svg class="w-6 h-6 text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p class="font-medium text-neutral-900">Nuevo Artículo</p>
        </RouterLink>

        <RouterLink 
          to="/admin/proyectos/nuevo"
          class="card p-6 text-center hover:bg-neutral-50 transition-colors group"
        >
          <div class="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p class="font-medium text-neutral-900">Nuevo Proyecto</p>
        </RouterLink>

        <RouterLink 
          to="/admin/categorias"
          class="card p-6 text-center hover:bg-neutral-50 transition-colors group"
        >
          <div class="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p class="font-medium text-neutral-900">Categorías</p>
        </RouterLink>

        <RouterLink 
          to="/admin/contactos"
          class="card p-6 text-center hover:bg-neutral-50 transition-colors group"
        >
          <div class="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
            <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="font-medium text-neutral-900">Ver Mensajes</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import api from '@/services/api'
import { resolveImageUrl } from '@/services/api'

const stats = ref([
  { 
    title: 'Artículos', 
    value: 0, 
    change: 0, 
    bgColor: 'bg-primary-200', 
    iconColor: 'text-primary-800',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' })
        ])
      }
    }
  },
  { 
    title: 'Proyectos', 
    value: 0, 
    bgColor: 'bg-green-100', 
    iconColor: 'text-green-600',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
        ])
      }
    }
  },
  { 
    title: 'Mensajes', 
    value: 0, 
    bgColor: 'bg-orange-100', 
    iconColor: 'text-orange-600',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
        ])
      }
    }
  },
  { 
    title: 'Visitas (hoy)', 
    value: '-', 
    bgColor: 'bg-purple-100', 
    iconColor: 'text-purple-600',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }),
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' })
        ])
      }
    }
  }
])

const recentPosts = ref([])
const recentContacts = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    // Fetch stats using admin endpoints for accurate counts
    const [postsRes, projectsRes, contactsRes] = await Promise.all([
      api.get('/posts/admin?limit=5'),
      api.get('/projects'),
      api.get('/contacts?limit=5')
    ])

    // Posts: admin endpoint returns { posts, pagination: { total } }
    stats.value[0].value = postsRes.data.pagination?.total ?? postsRes.data.posts?.length ?? 0
    
    // Projects: returns plain array
    const projects = Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data.projects || [])
    stats.value[1].value = projects.length
    
    // Contacts: returns { contacts, pagination: { total } }
    stats.value[2].value = contactsRes.data.pagination?.total ?? contactsRes.data.contacts?.length ?? 0

    // Recent posts from admin endpoint
    const posts = postsRes.data.posts || []
    recentPosts.value = posts.map(p => ({
      ...p,
      published: p.status === 'PUBLISHED'
    }))
    
    recentContacts.value = contactsRes.data.contacts || []
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
})
</script>

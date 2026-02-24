<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Artículos</h1>
        <p class="text-neutral-600">Gestiona los artículos del blog</p>
      </div>
      <RouterLink to="/admin/posts/nuevo" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nuevo Artículo
      </RouterLink>
    </div>

    <!-- Filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input 
            v-model="search"
            type="text"
            placeholder="Buscar artículos..."
            class="input"
          />
        </div>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Todos los estados</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
        <select v-model="filterCategory" class="input w-auto">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
    </div>

    <!-- Posts Table -->
    <div class="card overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="inline-block w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <table v-else class="w-full">
        <thead class="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Artículo</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Categoría</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Estado</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Fecha</th>
            <th class="text-right px-6 py-4 text-sm font-semibold text-neutral-600">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="post in filteredPosts" :key="post.id" class="hover:bg-neutral-50">
            <td class="px-6 py-4">
              <div class="flex items-center space-x-4">
                <div v-if="post.featuredImage" class="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img :src="resolveImageUrl(post.featuredImage)" :alt="post.title" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-16 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="font-medium text-neutral-900 truncate">{{ post.title }}</p>
                  <p class="text-sm text-neutral-500 truncate">{{ post.slug }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span v-if="post.categories && post.categories.length > 0" class="px-2 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                {{ post.categories[0].name }}
              </span>
              <span v-else class="text-neutral-400 text-sm">Sin categoría</span>
            </td>
            <td class="px-6 py-4">
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              ]">
                {{ post.status === 'PUBLISHED' ? 'Publicado' : 'Borrador' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-neutral-500">
              {{ formatDate(post.createdAt) }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-end space-x-2">
                <a :href="`/blog/${post.slug}`" target="_blank" class="p-2 text-neutral-400 hover:text-neutral-600">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <RouterLink :to="`/admin/posts/${post.id}`" class="p-2 text-neutral-400 hover:text-primary-900">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </RouterLink>
                <button @click="confirmDelete(post)" class="p-2 text-neutral-400 hover:text-red-600">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredPosts.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-neutral-500">
              No se encontraron artículos
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Artículo</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar "{{ postToDelete?.title }}"? Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deletePost" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { resolveImageUrl } from '@/services/api'
import { useCategoriesStore } from '@/stores/categories'

const postsStore = usePostsStore()
const categoriesStore = useCategoriesStore()

const loading = ref(true)
const search = ref('')
const filterStatus = ref('')
const filterCategory = ref('')
const showDeleteModal = ref(false)
const postToDelete = ref(null)

const categories = computed(() => categoriesStore.categories)

const filteredPosts = computed(() => {
  let posts = postsStore.posts

  if (search.value) {
    const query = search.value.toLowerCase()
    posts = posts.filter(p => p.title.toLowerCase().includes(query))
  }

  if (filterStatus.value) {
    posts = posts.filter(p => filterStatus.value === 'published' ? p.status === 'PUBLISHED' : p.status !== 'PUBLISHED')
  }

  if (filterCategory.value) {
    posts = posts.filter(p => p.categories?.some(c => c.id === parseInt(filterCategory.value)))
  }

  return posts
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const confirmDelete = (post) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

const deletePost = async () => {
  try {
    await postsStore.deletePost(postToDelete.value.id)
    showDeleteModal.value = false
    postToDelete.value = null
  } catch (error) {
    console.error('Error deleting post:', error)
    alert('Error al eliminar el artículo')
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      postsStore.fetchAdminPosts(),
      categoriesStore.fetchCategories()
    ])
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})
</script>

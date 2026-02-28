<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Colecciones</h1>
        <p class="text-neutral-600">Gestiona las colecciones RENOLIT mostradas en la página de servicios</p>
      </div>
      <RouterLink to="/admin/colecciones/nueva" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nueva Colección
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="card overflow-hidden">
      <table class="w-full">
        <thead class="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Imagen</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Nombre</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Tipo</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Muestras</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Extra</th>
            <th class="text-right px-6 py-4 text-sm font-semibold text-neutral-600">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="collection in collections" :key="collection.id" class="hover:bg-neutral-50">
            <td class="px-6 py-4">
              <div class="w-24 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  v-if="collection.heroImage"
                  :src="resolveCollectionImage(collection.heroImage)"
                  :alt="collection.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-[11px] text-neutral-400">
                  Sin imagen
                </div>
              </div>
            </td>
            <td class="px-6 py-4 font-medium text-neutral-900">{{ collection.name }}</td>
            <td class="px-6 py-4 text-neutral-500">{{ collection.type || '-' }}</td>
            <td class="px-6 py-4 text-neutral-500">{{ collection.swatches?.length || 0 }}</td>
            <td class="px-6 py-4 text-neutral-500">+{{ collection.moreCount || 0 }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-end space-x-2">
                <button @click="editCollection(collection)" class="p-2 text-neutral-400 hover:text-primary-900">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete(collection)" class="p-2 text-neutral-400 hover:text-red-600">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="collections.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-neutral-500">
              No hay colecciones todavía
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-100 rounded-boutique text-sm text-red-700">
      {{ errorMessage }}
    </div>

    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Colección</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar "{{ collectionToDelete?.name }}"?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deleteCollection" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { resolveImageUrl } from '@/services/api'
import { useServiceCollectionsStore } from '@/stores/serviceCollections'

const router = useRouter()
const collectionsStore = useServiceCollectionsStore()

const loading = ref(true)
const errorMessage = ref('')
const showDeleteModal = ref(false)
const collectionToDelete = ref(null)

const collections = computed(() => collectionsStore.collections)

function resolveCollectionImage(url) {
  if (!url) return ''
  if (url.startsWith('/Renolit/') || url.startsWith('/ArgPiscinas/')) return url
  return resolveImageUrl(url)
}

function editCollection(collection) {
  router.push(`/admin/colecciones/${collection.id}`)
}

function confirmDelete(collection) {
  collectionToDelete.value = collection
  showDeleteModal.value = true
}

async function deleteCollection() {
  if (!collectionToDelete.value) return
  const result = await collectionsStore.deleteCollection(collectionToDelete.value.id)
  if (!result) {
    errorMessage.value = collectionsStore.error || 'No se pudo eliminar la colección.'
    return
  }
  showDeleteModal.value = false
  collectionToDelete.value = null
  errorMessage.value = ''
}

onMounted(async () => {
  try {
    await collectionsStore.fetchCollections({ force: true })
    errorMessage.value = ''
  } catch (_error) {
    errorMessage.value = collectionsStore.error || 'No se pudieron cargar las colecciones.'
  } finally {
    loading.value = false
  }
})
</script>

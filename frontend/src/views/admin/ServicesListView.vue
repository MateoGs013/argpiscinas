<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Servicios</h1>
        <p class="text-neutral-600">Gestiona los servicios ofrecidos en el sitio</p>
      </div>
      <RouterLink to="/admin/servicios/nuevo" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nuevo Servicio
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
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Título</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Slug</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Mostrar en inicio</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Orden</th>
            <th class="text-right px-6 py-4 text-sm font-semibold text-neutral-600">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="svc in services" :key="svc.id" class="hover:bg-neutral-50">
            <td class="px-6 py-4">
              <div class="w-24 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  v-if="svc.image"
                  :src="resolveImageUrl(svc.image)"
                  :alt="svc.title"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-[11px] text-neutral-400">
                  Sin imagen
                </div>
              </div>
            </td>
            <td class="px-6 py-4 font-medium text-neutral-900">{{ svc.title }}</td>
            <td class="px-6 py-4 text-neutral-500">{{ svc.slug }}</td>
            <td class="px-6 py-4">
              <span :class="svc.showOnHome ? 'text-green-600' : 'text-neutral-400'">
                {{ svc.showOnHome ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-4 text-neutral-500">{{ svc.order }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-end space-x-2">
                <button @click="editService(svc)" class="p-2 text-neutral-400 hover:text-primary-900">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete(svc)" class="p-2 text-neutral-400 hover:text-red-600">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="services.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-neutral-500">
              No hay servicios todavía
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Servicio</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar "{{ serviceToDelete?.title }}"?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deleteService" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useServicesStore } from '@/stores/services'
import { useRouter } from 'vue-router'
import { resolveImageUrl } from '@/services/api'

const servicesStore = useServicesStore()
const router = useRouter()

const loading = ref(true)
const showDeleteModal = ref(false)
const serviceToDelete = ref(null)

const services = computed(() => servicesStore.services)

const editService = (svc) => {
  router.push(`/admin/servicios/${svc.id}`)
}

const confirmDelete = (svc) => {
  serviceToDelete.value = svc
  showDeleteModal.value = true
}

const deleteService = async () => {
  try {
    const ok = await servicesStore.deleteService(serviceToDelete.value.id)
    if (!ok) {
      alert(servicesStore.error || 'Error al eliminar el servicio')
      return
    }
    showDeleteModal.value = false
    serviceToDelete.value = null
  } catch (error) {
    console.error('Error deleting service:', error)
    alert('Error al eliminar el servicio')
  }
}

onMounted(async () => {
  try {
    await servicesStore.fetchServices()
  } catch (error) {
    console.error('Error loading services:', error)
  } finally {
    loading.value = false
  }
})
</script>

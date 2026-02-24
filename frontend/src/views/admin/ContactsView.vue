<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Mensajes de Contacto</h1>
        <p class="text-neutral-600">Gestiona los mensajes recibidos</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="card p-6">
        <p class="text-sm text-neutral-500 mb-1">Total</p>
        <p class="text-3xl font-bold text-neutral-900">{{ contacts.length }}</p>
      </div>
      <div class="card p-6">
        <p class="text-sm text-neutral-500 mb-1">Sin leer</p>
        <p class="text-3xl font-bold text-primary-800">{{ unreadCount }}</p>
      </div>
      <div class="card p-6">
        <p class="text-sm text-neutral-500 mb-1">Este mes</p>
        <p class="text-3xl font-bold text-green-600">{{ thisMonthCount }}</p>
      </div>
    </div>

    <!-- Contacts List -->
    <div class="card overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="inline-block w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else class="divide-y divide-neutral-100">
        <div 
          v-for="contact in contacts" 
          :key="contact.id"
          @click="openContact(contact)"
          class="p-6 hover:bg-neutral-50 cursor-pointer transition-colors"
          :class="{ 'bg-neutral-50/50': !contact.read }"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div :class="[
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg',
                !contact.read ? 'bg-primary-200 text-primary-800' : 'bg-neutral-100 text-neutral-500'
              ]">
                {{ contact.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="font-semibold text-neutral-900">{{ contact.name }}</h3>
                  <span v-if="!contact.read" class="w-2 h-2 bg-primary-800 rounded-full"></span>
                </div>
                <p class="text-sm text-neutral-500">{{ contact.email }}</p>
                <p class="font-medium text-neutral-700 mt-1">{{ contact.subject }}</p>
                <p class="text-sm text-neutral-500 line-clamp-1 mt-1">{{ contact.message }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-neutral-500">{{ formatDate(contact.createdAt) }}</p>
              <button 
                @click.stop="confirmDelete(contact)"
                class="mt-2 p-2 text-neutral-400 hover:text-red-600"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="contacts.length === 0" class="p-12 text-center text-neutral-500">
          No hay mensajes todavía
        </div>
      </div>
    </div>

    <!-- Contact Detail Modal -->
    <div v-if="selectedContact" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-neutral-900">{{ selectedContact.subject }}</h3>
            <p class="text-neutral-500">{{ formatDate(selectedContact.createdAt) }}</p>
          </div>
          <button @click="selectedContact = null" class="p-2 text-neutral-400 hover:text-neutral-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4 mb-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-800 font-bold">
              {{ selectedContact.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-semibold text-neutral-900">{{ selectedContact.name }}</p>
              <a :href="`mailto:${selectedContact.email}`" class="text-accent-600 hover:text-accent-700">
                {{ selectedContact.email }}
              </a>
            </div>
          </div>

          <div v-if="selectedContact.phone" class="flex items-center space-x-2 text-neutral-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a :href="`tel:${selectedContact.phone}`" class="hover:text-primary-900">
              {{ selectedContact.phone }}
            </a>
          </div>

          <div v-if="selectedContact.service" class="flex items-center space-x-2">
            <span class="px-3 py-1 bg-primary-200 text-primary-800 text-sm font-medium rounded-full">
              {{ selectedContact.service }}
            </span>
          </div>
        </div>

        <div class="bg-neutral-50 rounded-xl p-6 mb-6">
          <h4 class="font-semibold text-neutral-900 mb-2">Mensaje:</h4>
          <p class="text-neutral-700 whitespace-pre-wrap">{{ selectedContact.message }}</p>
        </div>

        <div class="flex justify-end space-x-4">
          <a 
            :href="`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`"
            class="btn btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Responder
          </a>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Mensaje</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar este mensaje?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deleteContact" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const contacts = ref([])
const loading = ref(true)
const selectedContact = ref(null)
const showDeleteModal = ref(false)
const contactToDelete = ref(null)

const unreadCount = computed(() => contacts.value.filter(c => !c.read).length)
const thisMonthCount = computed(() => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  return contacts.value.filter(c => new Date(c.createdAt) >= firstDay).length
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openContact = async (contact) => {
  selectedContact.value = contact
  
  if (!contact.read) {
    try {
      await api.patch(`/contacts/${contact.id}`, { read: true })
      contact.read = true
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }
}

const confirmDelete = (contact) => {
  contactToDelete.value = contact
  showDeleteModal.value = true
}

const deleteContact = async () => {
  try {
    await api.delete(`/contacts/${contactToDelete.value.id}`)
    contacts.value = contacts.value.filter(c => c.id !== contactToDelete.value.id)
    showDeleteModal.value = false
    contactToDelete.value = null
    
    if (selectedContact.value?.id === contactToDelete.value?.id) {
      selectedContact.value = null
    }
  } catch (error) {
    console.error('Error deleting contact:', error)
    alert('Error al eliminar el mensaje')
  }
}

onMounted(async () => {
  try {
    const response = await api.get('/contacts')
    contacts.value = response.data.contacts || response.data || []
  } catch (error) {
    console.error('Error loading contacts:', error)
  } finally {
    loading.value = false
  }
})
</script>

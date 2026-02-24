<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Etiquetas</h1>
        <p class="text-neutral-600">Gestiona las etiquetas del blog</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-1">
        <div class="card p-6">
          <h3 class="font-bold text-neutral-900 mb-4">
            {{ editingTag ? 'Editar Etiqueta' : 'Nueva Etiqueta' }}
          </h3>
          <form @submit.prevent="saveTag" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nombre *</label>
              <input 
                v-model="form.name"
                type="text"
                required
                class="input"
                placeholder="Nombre de la etiqueta"
                @input="generateSlug"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Slug</label>
              <input 
                v-model="form.slug"
                type="text"
                class="input"
                placeholder="url-de-la-etiqueta"
              />
            </div>
            <div class="flex space-x-4">
              <button type="submit" class="btn btn-primary flex-1">
                {{ editingTag ? 'Actualizar' : 'Crear' }}
              </button>
              <button 
                v-if="editingTag"
                type="button"
                @click="cancelEdit"
                class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- List -->
      <div class="lg:col-span-2">
        <div class="card p-6">
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="tag in tags" 
              :key="tag.id"
              class="inline-flex items-center px-4 py-2 bg-neutral-100 rounded-full group"
            >
              <span class="text-neutral-700 font-medium">{{ tag.name }}</span>
              <span class="mx-2 text-neutral-400">·</span>
              <span class="text-sm text-neutral-500">{{ tag._count?.posts || 0 }}</span>
              <button 
                @click="editTag(tag)"
                class="ml-3 p-1 text-neutral-400 hover:text-primary-900 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                @click="confirmDelete(tag)"
                class="p-1 text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div v-if="tags.length === 0" class="text-neutral-500 py-8 w-full text-center">
              No hay etiquetas todavía
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Etiqueta</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar "{{ tagToDelete?.name }}"?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deleteTag" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTagsStore } from '@/stores/tags'

const tagsStore = useTagsStore()

const form = ref({
  name: '',
  slug: ''
})

const editingTag = ref(null)
const showDeleteModal = ref(false)
const tagToDelete = ref(null)

const tags = computed(() => tagsStore.tags)

const generateSlug = () => {
  if (!editingTag.value) {
    form.value.slug = form.value.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

const saveTag = async () => {
  try {
    if (editingTag.value) {
      await tagsStore.updateTag(editingTag.value.id, form.value)
    } else {
      await tagsStore.createTag(form.value)
    }
    resetForm()
  } catch (error) {
    console.error('Error saving tag:', error)
    alert('Error al guardar la etiqueta')
  }
}

const editTag = (tag) => {
  editingTag.value = tag
  form.value = {
    name: tag.name,
    slug: tag.slug
  }
}

const cancelEdit = () => {
  resetForm()
}

const confirmDelete = (tag) => {
  tagToDelete.value = tag
  showDeleteModal.value = true
}

const deleteTag = async () => {
  try {
    await tagsStore.deleteTag(tagToDelete.value.id)
    showDeleteModal.value = false
    tagToDelete.value = null
  } catch (error) {
    console.error('Error deleting tag:', error)
    alert('Error al eliminar la etiqueta')
  }
}

const resetForm = () => {
  editingTag.value = null
  form.value = { name: '', slug: '' }
}

onMounted(() => {
  tagsStore.fetchTags()
})
</script>

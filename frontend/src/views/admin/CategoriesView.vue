<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Categorías</h1>
        <p class="text-neutral-600">Gestiona las categorías del blog</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-1">
        <div class="card p-6">
          <h3 class="font-bold text-neutral-900 mb-4">
            {{ editingCategory ? 'Editar Categoría' : 'Nueva Categoría' }}
          </h3>
          <form @submit.prevent="saveCategory" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nombre *</label>
              <input 
                v-model="form.name"
                type="text"
                required
                class="input"
                placeholder="Nombre de la categoría"
                @input="generateSlug"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Slug</label>
              <input 
                v-model="form.slug"
                type="text"
                class="input"
                placeholder="url-de-la-categoria"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Descripción</label>
              <textarea 
                v-model="form.description"
                rows="3"
                class="input resize-none"
                placeholder="Descripción opcional"
              ></textarea>
            </div>
            <div class="flex space-x-4">
              <button type="submit" class="btn btn-primary flex-1">
                {{ editingCategory ? 'Actualizar' : 'Crear' }}
              </button>
              <button 
                v-if="editingCategory"
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
        <div class="card overflow-hidden">
          <div class="sm:hidden px-4 py-2 border-b border-neutral-100 text-xs text-neutral-500">
            Deslizá horizontalmente para ver todas las columnas.
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[640px]">
              <thead class="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Nombre</th>
                  <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Slug</th>
                  <th class="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Posts</th>
                  <th class="text-right px-6 py-4 text-sm font-semibold text-neutral-600 whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                <tr v-for="category in categories" :key="category.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 font-medium text-neutral-900">{{ category.name }}</td>
                  <td class="px-6 py-4 text-neutral-500">{{ category.slug }}</td>
                  <td class="px-6 py-4 text-neutral-500">{{ category._count?.posts || 0 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center justify-end space-x-2">
                      <button @click="editCategory(category)" class="p-2 text-neutral-400 hover:text-primary-900">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="confirmDelete(category)" class="p-2 text-neutral-400 hover:text-red-600">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="categories.length === 0">
                  <td colspan="4" class="px-6 py-12 text-center text-neutral-500">
                    No hay categorías todavía
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Categoría</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar "{{ categoryToDelete?.name }}"?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deleteCategory" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()

const form = ref({
  name: '',
  slug: '',
  description: ''
})

const editingCategory = ref(null)
const showDeleteModal = ref(false)
const categoryToDelete = ref(null)

const categories = computed(() => categoriesStore.categories)

const generateSlug = () => {
  if (!editingCategory.value) {
    form.value.slug = form.value.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

const saveCategory = async () => {
  try {
    if (editingCategory.value) {
      await categoriesStore.updateCategory(editingCategory.value.id, form.value)
    } else {
      await categoriesStore.createCategory(form.value)
    }
    resetForm()
  } catch (error) {
    console.error('Error saving category:', error)
    alert('Error al guardar la categoría')
  }
}

const editCategory = (category) => {
  editingCategory.value = category
  form.value = {
    name: category.name,
    slug: category.slug,
    description: category.description || ''
  }
}

const cancelEdit = () => {
  resetForm()
}

const confirmDelete = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const deleteCategory = async () => {
  try {
    await categoriesStore.deleteCategory(categoryToDelete.value.id)
    showDeleteModal.value = false
    categoryToDelete.value = null
  } catch (error) {
    console.error('Error deleting category:', error)
    alert('Error al eliminar la categoría')
  }
}

const resetForm = () => {
  editingCategory.value = null
  form.value = { name: '', slug: '', description: '' }
}

onMounted(() => {
  categoriesStore.fetchCategories()
})
</script>

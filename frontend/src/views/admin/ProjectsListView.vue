<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Proyectos</h1>
        <p class="text-neutral-600">Gestiona los proyectos del portfolio</p>
      </div>
      <RouterLink to="/admin/proyectos/nuevo" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nuevo Proyecto
      </RouterLink>
    </div>

    <!-- Projects Grid -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="card overflow-hidden group"
      >
        <div class="relative aspect-video overflow-hidden">
          <img 
            :src="resolveImageUrl(project.featuredImage) || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'" 
            :alt="project.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <RouterLink 
              :to="`/admin/proyectos/${project.id}`"
              class="p-3 bg-neutral-50 rounded-full text-neutral-700 hover:text-primary-900"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </RouterLink>
            <button 
              @click="confirmDelete(project)"
              class="p-3 bg-neutral-50 rounded-full text-neutral-700 hover:text-red-600"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="px-2 py-1 bg-primary-200 text-primary-800 text-xs font-medium rounded-full">
              {{ project.category }}
            </span>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              project.featured ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'
            ]">
              {{ project.featured ? 'Destacado' : 'Normal' }}
            </span>
          </div>
          <h3 class="font-bold text-neutral-900">{{ project.title }}</h3>
          <p class="text-sm text-neutral-500 mt-1">{{ project.location }}</p>
        </div>
      </div>

      <div v-if="projects.length === 0" class="col-span-full text-center py-20 text-neutral-500">
        No hay proyectos todavía
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="card p-6 max-w-md w-full">
        <h3 class="text-lg font-bold text-neutral-900 mb-4">Eliminar Proyecto</h3>
        <p class="text-neutral-600 mb-6">
          ¿Estás seguro de que quieres eliminar "{{ projectToDelete?.title }}"?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Cancelar
          </button>
          <button @click="deleteProject" class="btn bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { resolveImageUrl } from '@/services/api'

const projectsStore = useProjectsStore()

const loading = ref(true)
const showDeleteModal = ref(false)
const projectToDelete = ref(null)

const projects = computed(() => projectsStore.projects)

const confirmDelete = (project) => {
  projectToDelete.value = project
  showDeleteModal.value = true
}

const deleteProject = async () => {
  try {
    await projectsStore.deleteProject(projectToDelete.value.id)
    showDeleteModal.value = false
    projectToDelete.value = null
  } catch (error) {
    console.error('Error deleting project:', error)
    alert('Error al eliminar el proyecto')
  }
}

onMounted(async () => {
  try {
    await projectsStore.fetchProjects()
  } catch (error) {
    console.error('Error loading projects:', error)
  } finally {
    loading.value = false
  }
})
</script>

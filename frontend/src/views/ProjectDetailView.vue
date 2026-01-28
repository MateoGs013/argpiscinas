<template>
  <div>
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="!project" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-neutral-900 mb-4">Proyecto no encontrado</h1>
        <RouterLink to="/proyectos" class="btn btn-primary">Ver todos los proyectos</RouterLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="relative py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div class="container-custom relative z-10">
          <RouterLink to="/proyectos" class="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a proyectos
          </RouterLink>
          <div class="max-w-3xl">
            <span class="inline-block px-4 py-1 bg-white/10 text-primary-300 text-sm font-medium rounded-full mb-4">
              {{ project.category }}
            </span>
            <h1 class="text-white mb-4">{{ project.title }}</h1>
            <div class="flex items-center text-white/70">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ project.location }}
            </div>
          </div>
        </div>
      </section>

      <!-- Main Image -->
      <section class="bg-white py-8">
        <div class="container-custom">
          <div class="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <img 
              :src="project.featuredImage || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'" 
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="section-padding bg-white">
        <div class="container-custom">
          <div class="grid lg:grid-cols-3 gap-12">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-bold text-neutral-900 mb-6">Descripción del Proyecto</h2>
              <div class="prose max-w-none" v-html="project.description"></div>

              <!-- Gallery -->
              <div v-if="project.images && project.images.length > 0" class="mt-12">
                <h3 class="text-xl font-bold text-neutral-900 mb-6">Galería de Imágenes</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    v-for="(image, index) in project.images" 
                    :key="index"
                    class="aspect-square rounded-xl overflow-hidden cursor-pointer"
                    @click="openGallery(index)"
                  >
                    <img 
                      :src="image" 
                      :alt="`${project.title} - Imagen ${index + 1}`"
                      class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 space-y-6">
                <!-- Project Details -->
                <div class="card p-6">
                  <h3 class="font-bold text-neutral-900 mb-4">Detalles del Proyecto</h3>
                  <dl class="space-y-4">
                    <div class="flex justify-between">
                      <dt class="text-neutral-500">Tipo</dt>
                      <dd class="font-medium text-neutral-900">{{ project.category }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-neutral-500">Ubicación</dt>
                      <dd class="font-medium text-neutral-900">{{ project.location }}</dd>
                    </div>
                    <div v-if="project.year" class="flex justify-between">
                      <dt class="text-neutral-500">Año</dt>
                      <dd class="font-medium text-neutral-900">{{ project.year }}</dd>
                    </div>
                    <div v-if="project.duration" class="flex justify-between">
                      <dt class="text-neutral-500">Duración</dt>
                      <dd class="font-medium text-neutral-900">{{ project.duration }}</dd>
                    </div>
                  </dl>
                </div>

                <!-- CTA -->
                <div class="card p-6 bg-primary-50 border-2 border-primary-100">
                  <h3 class="text-xl font-bold text-neutral-900 mb-4">¿Te gustaría un proyecto similar?</h3>
                  <p class="text-neutral-600 mb-6">
                    Contáctanos y te ayudamos a hacer realidad tu proyecto.
                  </p>
                  <RouterLink to="/contacto" class="btn btn-primary w-full">
                    Solicitar Presupuesto
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Projects -->
      <section v-if="relatedProjects.length > 0" class="section-padding bg-neutral-50">
        <div class="container-custom">
          <h2 class="text-2xl font-bold text-neutral-900 mb-8">Proyectos Relacionados</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <RouterLink 
              v-for="related in relatedProjects" 
              :key="related.id"
              :to="`/proyectos/${related.slug}`"
              class="group card overflow-hidden"
            >
              <div class="relative aspect-[4/3] overflow-hidden">
                <img 
                  :src="related.featuredImage || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7'" 
                  :alt="related.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div class="p-6">
                <h3 class="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {{ related.title }}
                </h3>
                <p class="text-sm text-neutral-500 mt-1">{{ related.location }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const projectsStore = useProjectsStore()
const loading = ref(true)

const project = computed(() => projectsStore.currentProject)

const relatedProjects = computed(() => {
  if (!project.value) return []
  return projectsStore.projects
    .filter(p => p.category === project.value.category && p.id !== project.value.id)
    .slice(0, 3)
})

const fetchProject = async () => {
  loading.value = true
  try {
    await projectsStore.fetchProjectBySlug(route.params.slug)
    if (project.value) {
      useSeo({
        title: `${project.value.title} | Proyectos`,
        description: project.value.description?.substring(0, 160) || `Proyecto de ${project.value.category} en ${project.value.location}`,
        image: project.value.featuredImage
      })
    }
  } catch (error) {
    console.error('Error loading project:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProject)
watch(() => route.params.slug, fetchProject)
</script>

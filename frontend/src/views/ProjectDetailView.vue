<template>
  <div>
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-midnight-800">
      <div class="inline-block w-6 h-6 border-2 border-silver-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="!project" class="min-h-screen flex items-center justify-center bg-midnight-800">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-white mb-6">Proyecto no encontrado</h1>
        <RouterLink to="/proyectos" class="btn btn-white">Ver todos los proyectos</RouterLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="relative py-40 bg-midnight-800 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
        <div class="container-custom relative z-10">
          <RouterLink to="/proyectos" class="inline-flex items-center text-silver-400/60 hover:text-silver-300 mb-8 transition-colors duration-300 text-sm tracking-wide">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a proyectos
          </RouterLink>
          <div class="max-w-3xl">
            <span class="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-silver-300 text-xs font-medium tracking-widest uppercase rounded-full mb-6">
              {{ project.category }}
            </span>
            <h1 class="text-white mb-6">{{ project.title }}</h1>
            <div class="flex items-center text-silver-400/70 text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ project.location }}
            </div>
          </div>
        </div>
      </section>

      <!-- Main Image -->
      <section class="bg-neutral-50 py-10">
        <div class="container-custom">
          <div class="aspect-cinematic rounded-boutique-lg overflow-hidden shadow-xl">
            <img 
              :src="resolveImageUrl(project.featuredImage) || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'" 
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="section-padding bg-neutral-50">
        <div class="container-custom">
          <div class="grid lg:grid-cols-3 gap-14">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-bold text-neutral-900 mb-6">Descripción del Proyecto</h2>
              <div class="prose max-w-none" v-html="sanitizeHtml(project.description)"></div>

              <!-- Gallery -->
              <div v-if="project.images && project.images.length > 0" class="mt-14">
                <h3 class="text-xl font-bold text-neutral-900 mb-6">Galería de Imágenes</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    v-for="(image, index) in project.images" 
                    :key="index"
                    class="aspect-square rounded-boutique overflow-hidden cursor-pointer"
                    @click="openGallery(index)"
                  >
                    <img 
                      :src="resolveImageUrl(image)" 
                      :alt="`${project.title} - Imagen ${index + 1}`"
                      class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 space-y-6">
                <!-- Project Details -->
                <div class="bg-white rounded-boutique-lg p-7 border border-neutral-100">
                  <h3 class="font-bold text-neutral-900 text-sm mb-5 uppercase tracking-wide">Detalles del Proyecto</h3>
                  <dl class="space-y-4">
                    <div class="flex justify-between items-center">
                      <dt class="text-neutral-400 text-sm">Tipo</dt>
                      <dd class="font-medium text-neutral-900 text-sm">{{ project.category }}</dd>
                    </div>
                    <div class="border-t border-neutral-100"></div>
                    <div class="flex justify-between items-center">
                      <dt class="text-neutral-400 text-sm">Ubicación</dt>
                      <dd class="font-medium text-neutral-900 text-sm">{{ project.location }}</dd>
                    </div>
                    <div v-if="project.year">
                      <div class="border-t border-neutral-100 mb-4"></div>
                      <div class="flex justify-between items-center">
                        <dt class="text-neutral-400 text-sm">Año</dt>
                        <dd class="font-medium text-neutral-900 text-sm">{{ project.year }}</dd>
                      </div>
                    </div>
                    <div v-if="project.duration">
                      <div class="border-t border-neutral-100 mb-4"></div>
                      <div class="flex justify-between items-center">
                        <dt class="text-neutral-400 text-sm">Duración</dt>
                        <dd class="font-medium text-neutral-900 text-sm">{{ project.duration }}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <!-- CTA -->
                <div class="bg-midnight-800 rounded-boutique-lg p-7">
                  <h3 class="text-lg font-bold text-white mb-4">¿Te gustaría un proyecto similar?</h3>
                  <p class="text-silver-400 text-sm mb-6 leading-relaxed">
                    Contáctanos y te ayudamos a hacer realidad tu proyecto.
                  </p>
                  <RouterLink to="/contacto" class="btn btn-white w-full text-sm">
                    Solicitar Presupuesto
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Projects -->
      <section v-if="relatedProjects.length > 0" class="section-padding bg-charcoal-600">
        <div class="container-custom">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Más Trabajos</span>
          <h2 class="text-white mb-10">Proyectos Relacionados</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <RouterLink 
              v-for="related in relatedProjects" 
              :key="related.id"
              :to="`/proyectos/${related.slug}`"
              class="group bg-midnight-800/50 rounded-boutique-lg border border-charcoal-400/10 overflow-hidden hover:border-charcoal-400/30 transition-all duration-500"
            >
              <div class="relative aspect-[4/3] overflow-hidden">
                <img 
                  :src="resolveImageUrl(related.featuredImage) || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7'" 
                  :alt="related.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h3 class="font-bold text-white group-hover:text-silver-300 transition-colors duration-300">
                  {{ related.title }}
                </h3>
                <p class="text-sm text-silver-400/70 mt-2 tracking-wide">{{ related.location }}</p>
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
import { resolveImageUrl } from '@/services/api'
import { sanitizeHtml } from '@/composables/useSanitize'

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
        image: resolveImageUrl(project.value.featuredImage)
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

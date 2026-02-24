<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_VOGUE_urban_DSC_8772.jpg" 
          alt="Proyectos de piscinas realizados"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-800 via-midnight-800/70 to-midnight-800/40"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Nuestro Trabajo</span>
          <h1 class="text-white mb-6">Proyectos Realizados</h1>
          <p class="text-xl text-silver-400 leading-relaxed">
            Descubre algunos de nuestros trabajos más destacados. Cada proyecto refleja 
            nuestro compromiso con la calidad y la satisfacción del cliente.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-6 bg-neutral-50 border-b border-neutral-100 sticky top-[72px] z-30 backdrop-blur-sm bg-neutral-50/95">
      <div class="container-custom">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300',
              activeFilter === filter.value 
                ? 'bg-midnight-800 text-white' 
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block w-6 h-6 border-2 border-midnight-800 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-neutral-400 text-sm">Cargando proyectos...</p>
        </div>

        <div v-else-if="filteredProjects.length === 0" class="text-center py-20">
          <svg class="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p class="text-neutral-500 text-sm">No hay proyectos en esta categoría</p>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink 
            v-for="project in filteredProjects" 
            :key="project.id"
            :to="`/proyectos/${project.slug}`"
            class="group bg-white rounded-boutique-lg border border-neutral-100 overflow-hidden hover:shadow-lg transition-all duration-500"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img 
                :src="resolveImageUrl(project.featuredImage) || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'" 
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1.5 bg-midnight-800/80 backdrop-blur-sm text-white text-xs font-medium tracking-wide rounded-full">
                  {{ project.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-charcoal-500 transition-colors duration-300">
                {{ project.title }}
              </h2>
              <div class="flex items-center text-neutral-400 text-xs mb-3 tracking-wide">
                <svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ project.location }}
              </div>
              <p class="text-neutral-500 text-sm leading-relaxed line-clamp-2">{{ project.description }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-32 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/20 to-transparent"></div>
      <div class="container-custom relative z-10 text-center">
        <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Tu Proyecto</span>
        <h2 class="text-white mb-6">¿Te gustaría ver tu piscina aquí?</h2>
        <p class="text-silver-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Contáctanos y empieza a hacer realidad el proyecto de tu piscina.
        </p>
        <RouterLink to="/contacto" class="btn btn-white btn-lg">
          Empezar Mi Proyecto
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { useSeo } from '@/composables/useSeo'
import { resolveImageUrl } from '@/services/api'

useSeo({
  title: 'Proyectos de Piscinas Realizados',
  description: 'Galería de proyectos de instalación y rehabilitación de piscinas con lámina armada. Descubre nuestros trabajos más destacados.',
  keywords: 'proyectos piscinas, galería piscinas, trabajos realizados, portfolio piscinas'
})

const projectsStore = useProjectsStore()
const loading = ref(true)
const activeFilter = ref('all')

const filters = [
  { value: 'all', label: 'Todos' },
  { value: 'Instalación', label: 'Instalación' },
  { value: 'Rehabilitación', label: 'Rehabilitación' },
  { value: 'Construcción', label: 'Construcción' }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projectsStore.projects
  }
  return projectsStore.projects.filter(p => p.category === activeFilter.value)
})

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

<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 sm:py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="@/assets/img/RENOLIT_VOGUE_urban_DSC_8772.jpg"
          alt="Proyectos de piscinas realizados"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover object-[56%_center] sm:object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-800/70 to-midnight-800/40"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-white/70 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">
            {{ t('projects.hero.label', 'Portfolio') }}
          </span>
          <h1 class="text-white mb-6">
            {{ t('projects.hero.title', 'Nuestros Proyectos') }}
          </h1>
          <p class="text-xl text-silver-300 leading-relaxed">
            {{ t('projects.hero.description', 'Descubre nuestros trabajos de instalación de lámina armada RENOLIT ALKORPLAN en piscinas de toda España.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-3 sm:py-4 bg-neutral-50 border-b border-neutral-100 md:sticky md:top-[72px] z-30 backdrop-blur-sm bg-neutral-50/95">
      <div class="container-custom">
        <div class="bg-white rounded-boutique border border-neutral-200 p-3 sm:p-4 shadow-sm">
          <div class="flex items-center gap-2 sm:gap-3">
            <label class="relative block flex-1">
              <span class="sr-only">Buscar proyecto</span>
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35m1.6-5.15a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
              </svg>
              <input
                v-model.trim="searchQuery"
                type="search"
                placeholder="Buscar proyecto..."
                class="w-full h-11 sm:h-12 pl-9 pr-3 rounded-boutique border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-midnight-700 focus:border-transparent transition-all duration-300"
              />
            </label>

            <button
              type="button"
              class="shrink-0 inline-flex items-center h-11 sm:h-12 px-4 sm:px-5 rounded-boutique border border-neutral-200 text-neutral-700 bg-white text-sm font-medium normal-case tracking-normal whitespace-nowrap hover:border-neutral-300 transition-colors"
              @click="showAdvancedFilters = !showAdvancedFilters"
            >
              Filtros
              <svg
                class="w-4 h-4 ml-2 transition-transform duration-200"
                :class="showAdvancedFilters ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div :class="['mt-4 sm:mt-5', showAdvancedFilters ? 'block' : 'hidden']">
            <div class="h-px bg-neutral-200/80 mb-4 sm:mb-5"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <label class="block">
                <span class="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-1.5">Categoría</span>
                <select v-model="selectedCategory" class="w-full h-11 sm:h-12 px-3 rounded-boutique border border-neutral-200 bg-white text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-midnight-700 focus:border-transparent transition-all duration-300">
                  <option value="all">Todas</option>
                  <option
                    v-for="category in categoryOptions"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </label>

              <label class="block">
                <span class="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-1.5">Ubicación</span>
                <select v-model="selectedLocation" class="w-full h-11 sm:h-12 px-3 rounded-boutique border border-neutral-200 bg-white text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-midnight-700 focus:border-transparent transition-all duration-300">
                  <option value="all">Todas</option>
                  <option
                    v-for="location in locationOptions"
                    :key="location"
                    :value="location"
                  >
                    {{ location }}
                  </option>
                </select>
              </label>

              <label class="block">
                <span class="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-1.5">Año</span>
                <select
                  v-model="selectedYear"
                  :disabled="yearOptions.length === 0"
                  class="w-full h-11 sm:h-12 px-3 rounded-boutique border border-neutral-200 bg-white text-sm text-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-midnight-700 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">{{ yearOptions.length > 0 ? 'Todos' : 'Sin datos' }}</option>
                  <option v-for="year in yearOptions" :key="`year-${year}`" :value="String(year)">
                    {{ year }}
                  </option>
                </select>
              </label>

              <label class="block">
                <span class="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-500 mb-1.5">Ordenar</span>
                <select v-model="sortBy" class="w-full h-11 sm:h-12 px-3 rounded-boutique border border-neutral-200 bg-white text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-midnight-700 focus:border-transparent transition-all duration-300">
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguos</option>
                  <option value="title_asc">Título A-Z</option>
                  <option value="title_desc">Título Z-A</option>
                  <option value="year_desc">Año más nuevo</option>
                  <option value="year_asc">Año más antiguo</option>
                </select>
              </label>
            </div>

            <div class="mt-3 sm:mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200"
                :class="featuredOnly ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300'"
                @click="featuredOnly = !featuredOnly"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Solo destacados
              </button>

              <p class="text-xs text-neutral-500">
                {{ filteredProjects.length }} resultado{{ filteredProjects.length === 1 ? '' : 's' }}
              </p>

              <span v-if="hasActiveFilters" class="text-xs text-neutral-500">
                {{ activeFiltersCount }} filtro{{ activeFiltersCount === 1 ? '' : 's' }} activo{{ activeFiltersCount === 1 ? '' : 's' }}
              </span>

              <button
                v-if="hasActiveFilters"
                type="button"
                class="ml-auto inline-flex items-center text-xs font-semibold text-midnight-800 hover:text-charcoal-500"
                @click="resetFilters"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-14 md:py-20 lg:py-24 bg-neutral-50">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block w-6 h-6 border-2 border-midnight-800 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-neutral-500 text-sm">Cargando proyectos...</p>
        </div>

        <div v-else-if="filteredProjects.length === 0" class="text-center py-20">
          <svg class="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p class="text-neutral-700 font-medium">No encontramos proyectos con esos filtros</p>
          <p class="text-neutral-500 text-sm mt-1">Prueba con otra categoría, ubicación o limpia los filtros activos.</p>
          <button
            v-if="hasActiveFilters"
            type="button"
            class="mt-5 btn bg-midnight-800 text-white hover:bg-charcoal-600"
            @click="resetFilters"
          >
            Ver todos los proyectos
          </button>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink
            v-for="project in filteredProjects"
            :key="project.id"
            :to="`/proyectos/${project.slug}`"
            class="group bg-white rounded-boutique-lg border border-neutral-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="getProjectCover(project)"
                :alt="project.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span
                  v-if="project.category"
                  class="px-3 py-1.5 bg-midnight-800/80 backdrop-blur-sm text-white text-[11px] font-medium tracking-wide rounded-full"
                >
                  {{ project.category }}
                </span>
                <span
                  v-if="project.featured"
                  class="px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm text-neutral-900 text-[11px] font-semibold tracking-wide rounded-full"
                >
                  Destacado
                </span>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-charcoal-500 transition-colors duration-300">
                {{ project.title }}
              </h2>

              <div class="flex items-center flex-wrap gap-x-4 gap-y-1 text-neutral-500 text-xs mb-3 tracking-wide">
                <span v-if="project.location" class="inline-flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ project.location }}
                </span>
                <span v-if="project.year" class="inline-flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z" />
                  </svg>
                  {{ project.year }}
                </span>
              </div>

              <p class="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                {{ project.description || 'Proyecto realizado con instalación profesional de lámina armada RENOLIT ALKORPLAN.' }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-24 sm:py-28 lg:py-32 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/20 to-transparent"></div>
      <div class="container-custom relative z-10 text-center">
        <span class="text-white/70 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">Tu Proyecto</span>
        <h2 class="text-white mb-6">¿Te gustaría ver tu piscina aquí?</h2>
        <p class="text-silver-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
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
import { useContent } from '@/composables/useContent'
import { resolveImageUrl } from '@/services/api'

useSeo({
  title: 'Proyectos de Piscinas Realizados',
  description: 'Galería de proyectos de instalación y rehabilitación de piscinas con lámina armada. Descubre nuestros trabajos más destacados.',
  keywords: 'proyectos piscinas, galería piscinas, trabajos realizados, portfolio piscinas'
})

const { t } = useContent()
const projectsStore = useProjectsStore()
const loading = ref(true)

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedLocation = ref('all')
const selectedYear = ref('all')
const featuredOnly = ref(false)
const sortBy = ref('newest')
const showAdvancedFilters = ref(true)

const normalizeText = (value) => {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const compareStrings = (a, b) => {
  return a.localeCompare(b, 'es', { sensitivity: 'base' })
}

const getProjectTimestamp = (project) => {
  const createdAtTs = Number(new Date(project.createdAt))
  return Number.isFinite(createdAtTs) ? createdAtTs : 0
}

const getProjectYear = (project) => {
  const parsed = Number.parseInt(project?.year, 10)
  return Number.isInteger(parsed) ? parsed : null
}

const getProjectCover = (project) => {
  if (project.featuredImage) {
    return resolveImageUrl(project.featuredImage)
  }

  const rawImages = project.images
  if (Array.isArray(rawImages) && rawImages.length > 0) {
    return resolveImageUrl(rawImages[0])
  }

  if (typeof rawImages === 'string') {
    try {
      const parsedImages = JSON.parse(rawImages)
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        return resolveImageUrl(parsedImages[0])
      }
    } catch {
      // Ignore malformed JSON and use fallback image.
    }
  }

  return 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
}

const categoryOptions = computed(() => {
  const values = projectsStore.projects
    .map((project) => project.category?.trim())
    .filter(Boolean)

  return [...new Set(values)].sort(compareStrings)
})

const locationOptions = computed(() => {
  const values = projectsStore.projects
    .map((project) => project.location?.trim())
    .filter(Boolean)

  return [...new Set(values)].sort(compareStrings)
})

const yearOptions = computed(() => {
  const values = projectsStore.projects
    .map((project) => getProjectYear(project))
    .filter((value) => value !== null)

  return [...new Set(values)].sort((a, b) => b - a)
})

const hasActiveFilters = computed(() => {
  return Boolean(
    searchQuery.value ||
    selectedCategory.value !== 'all' ||
    selectedLocation.value !== 'all' ||
    selectedYear.value !== 'all' ||
    featuredOnly.value ||
    sortBy.value !== 'newest'
  )
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value) count += 1
  if (selectedCategory.value !== 'all') count += 1
  if (selectedLocation.value !== 'all') count += 1
  if (selectedYear.value !== 'all') count += 1
  if (featuredOnly.value) count += 1
  if (sortBy.value !== 'newest') count += 1
  return count
})

const filteredProjects = computed(() => {
  const query = normalizeText(searchQuery.value)
  const categoryFilter = normalizeText(selectedCategory.value)
  const locationFilter = normalizeText(selectedLocation.value)
  const selectedYearNumber = selectedYear.value === 'all'
    ? null
    : Number.parseInt(selectedYear.value, 10)

  const filtered = projectsStore.projects.filter((project) => {
    if (categoryFilter !== 'all' && normalizeText(project.category) !== categoryFilter) {
      return false
    }

    if (locationFilter !== 'all' && normalizeText(project.location) !== locationFilter) {
      return false
    }

    if (selectedYearNumber !== null && getProjectYear(project) !== selectedYearNumber) {
      return false
    }

    if (featuredOnly.value && !project.featured) {
      return false
    }

    if (query) {
      const haystack = [
        project.title,
        project.description,
        project.content,
        project.category,
        project.location
      ].map(normalizeText).join(' ')

      if (!haystack.includes(query)) {
        return false
      }
    }

    return true
  })

  const sorted = [...filtered]
  switch (sortBy.value) {
    case 'oldest':
      sorted.sort((a, b) => getProjectTimestamp(a) - getProjectTimestamp(b))
      break
    case 'title_asc':
      sorted.sort((a, b) => compareStrings(a.title || '', b.title || ''))
      break
    case 'title_desc':
      sorted.sort((a, b) => compareStrings(b.title || '', a.title || ''))
      break
    case 'year_desc':
      sorted.sort((a, b) => (getProjectYear(b) || 0) - (getProjectYear(a) || 0))
      break
    case 'year_asc':
      sorted.sort((a, b) => (getProjectYear(a) || 0) - (getProjectYear(b) || 0))
      break
    case 'newest':
    default:
      sorted.sort((a, b) => getProjectTimestamp(b) - getProjectTimestamp(a))
      break
  }

  return sorted
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedLocation.value = 'all'
  selectedYear.value = 'all'
  featuredOnly.value = false
  sortBy.value = 'newest'
}

onMounted(async () => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    showAdvancedFilters.value = false
  }

  try {
    await projectsStore.fetchAllProjects()
  } catch (error) {
    console.error('Error loading projects:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_TOUCH Elegance (22).jpg" 
          alt="Servicios de instalación de lámina armada"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-800 via-midnight-800/70 to-midnight-800/40"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('services.hero.label', 'Nuestros Servicios') }}</span>
          <h1 class="text-white mb-8 leading-[1.1]">{{ t('services.hero.title', 'Instalación de RENOLIT ALKORPLAN') }}</h1>
          <p class="text-lg text-silver-400 leading-relaxed max-w-xl">
            {{ t('services.hero.description', 'Como instaladores oficiales de RENOLIT ALKORPLAN, ofrecemos servicios especializados de instalación de lámina armada para todo tipo de piscinas.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 gap-6">
          <RouterLink 
            v-for="service in services" 
            :key="service.slug"
            :to="`/servicios/${service.slug}`"
            class="group bg-white rounded-boutique-lg overflow-hidden border border-neutral-100 hover:shadow-xl transition-all duration-500"
          >
            <div class="aspect-video relative overflow-hidden">
              <img 
                :src="service.image" 
                :alt="service.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-midnight-800/70 to-transparent"></div>
              <div class="absolute bottom-5 left-6 right-6">
                <h2 class="text-2xl font-bold text-white">{{ service.title }}</h2>
              </div>
            </div>
            <div class="p-8">
              <p class="text-neutral-600 mb-6 leading-relaxed">{{ service.description }}</p>
              <ul class="space-y-3 mb-8">
                <li v-for="feature in service.features" :key="feature" class="flex items-center text-sm text-neutral-500">
                  <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <span class="inline-flex items-center text-midnight-800 font-medium text-sm tracking-wide group-hover:text-charcoal-500 transition-colors">
                Ver más
                <svg class="w-4 h-4 ml-2 transform transition-transform duration-400 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- RENOLIT Collections -->
    <section class="section-padding bg-midnight-800">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('services.collections.label', 'Colecciones') }}</span>
          <h2 class="text-white mb-6">{{ t('services.collections.title', 'Gama RENOLIT ALKORPLAN') }}</h2>
          <p class="text-silver-400 text-lg leading-relaxed">
            {{ t('services.collections.description', 'Ofrecemos toda la gama de membranas RENOLIT ALKORPLAN para que elijas el acabado perfecto para tu piscina.') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-5">
          <div 
            v-for="collection in collections" 
            :key="collection.id" 
            class="group bg-charcoal-600/40 rounded-boutique-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
          >
            <!-- Main texture image -->
            <div class="aspect-[16/10] relative overflow-hidden">
              <img 
                :src="resolveCollectionImage(collection.activeSwatch.image || collection.heroImage)" 
                :alt="`${collection.name} - ${collection.activeSwatch.name || ''}`"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-midnight-800/80 via-transparent to-transparent"></div>
              <!-- Collection badge -->
              <div class="absolute top-5 left-5">
                <span class="bg-white/10 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">
                  {{ collection.type }}
                </span>
              </div>
              <div class="absolute top-5 right-5">
                <span class="bg-midnight-800/70 backdrop-blur-md text-white text-[10px] font-semibold tracking-[0.12em] px-3 py-1.5 rounded-full border border-white/15">
                  {{ collection.activeSwatch.name || 'Muestra' }}
                </span>
              </div>
              <!-- Collection name overlay -->
              <div class="absolute bottom-5 left-6 right-6">
                <h3 class="text-white font-bold text-lg">{{ collection.name }}</h3>
              </div>
            </div>

            <!-- Info + swatches -->
            <div class="p-6">
              <p class="text-silver-400 text-sm leading-relaxed mb-5">{{ collection.description }}</p>
              
              <!-- Texture swatches -->
              <div class="flex items-center gap-2">
                <button
                  v-for="(swatch, i) in collection.swatches" 
                  :key="i"
                  type="button"
                  class="w-9 h-9 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer"
                  :class="i === collection.activeSwatchIndex ? 'border-white ring-2 ring-white/50 scale-105' : 'border-white/10 hover:border-white/30'"
                  :aria-label="`Ver muestra ${swatch.name} en ${collection.name}`"
                  :aria-pressed="i === collection.activeSwatchIndex"
                  @click="setActiveSwatch(collection.id, i)"
                  @mouseenter="setActiveSwatch(collection.id, i)"
                >
                  <img :src="resolveCollectionImage(swatch.image)" :alt="swatch.name" loading="lazy" decoding="async" class="w-full h-full object-cover" />
                </button>
                <span v-if="collection.moreCount" class="text-silver-500 text-xs ml-1">+{{ collection.moreCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_TOUCH_prestige_Haselhofer_02.jpg" 
          alt="Piscina RENOLIT ALKORPLAN"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-midnight-800/75"></div>
      </div>
        <div class="container-custom relative z-10 text-center">
          <img src="/Renolit/logo-RENOLIT-ALKORPLAN_blanc.png" alt="RENOLIT ALKORPLAN" loading="lazy" decoding="async" class="w-44 h-auto mx-auto mb-8 no-filter" />
        <h2 class="text-white mb-6">{{ t('services.cta.title', '¿Necesitas Asesoramiento?') }}</h2>
        <p class="text-silver-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          {{ t('services.cta.description', 'Te ayudamos a elegir la mejor solución RENOLIT ALKORPLAN para tu piscina. Presupuesto sin compromiso.') }}
        </p>
        <RouterLink to="/contacto" class="btn btn-white btn-lg">
          {{ t('services.cta.button', 'Contactar Ahora') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'
import { onMounted, computed, ref } from 'vue'
import { useServicesStore } from '@/stores/services'
import { resolveImageUrl } from '@/services/api'
import { useContent } from '@/composables/useContent'
import {
  SERVICES_COLLECTIONS_CONTENT_KEY,
  SERVICES_COLLECTIONS_DEFAULTS,
  parseServicesCollectionsContent
} from '@/data/servicesCollectionsDefaults'

const { t } = useContent()

useSeo({
  title: 'Servicios | Instalación RENOLIT ALKORPLAN',
  description: 'Servicios profesionales de instalación de lámina armada RENOLIT ALKORPLAN. Piscinas nuevas, rehabilitaciones e impermeabilización con garantía de 15 años.',
  keywords: 'instalación RENOLIT ALKORPLAN, lámina armada piscinas, rehabilitación piscinas, impermeabilización ALKORPLAN'
})

const servicesStore = useServicesStore()
const services = computed(() => servicesStore.services.map((service) => ({
  ...service,
  image: service.image ? resolveImageUrl(service.image) : '/ArgPiscinas/ARG PISCINAS LOGO OK sin fondo.png',
  features: Array.isArray(service.features) ? service.features : []
})))

onMounted(async () => {
  await servicesStore.fetchServices()
})

const activeSwatchByCollection = ref({})

function getActiveSwatchIndex(collectionId) {
  return activeSwatchByCollection.value[collectionId] ?? 0
}

function setActiveSwatch(collectionId, swatchIndex) {
  activeSwatchByCollection.value[collectionId] = swatchIndex
}

function resolveCollectionImage(url) {
  if (!url) return ''
  if (url.startsWith('/Renolit/') || url.startsWith('/ArgPiscinas/')) {
    return url
  }
  return resolveImageUrl(url)
}

const rawCollectionsContent = computed(() =>
  t(SERVICES_COLLECTIONS_CONTENT_KEY, '')
)

const parsedCollections = computed(() =>
  parseServicesCollectionsContent(
    rawCollectionsContent.value,
    SERVICES_COLLECTIONS_DEFAULTS
  )
)

const collections = computed(() =>
  parsedCollections.value.map((collection) => {
    const activeSwatchIndex = getActiveSwatchIndex(collection.id)
    const activeSwatch = collection.swatches[activeSwatchIndex] || collection.swatches[0]
    return {
      ...collection,
      activeSwatchIndex,
      activeSwatch
    }
  })
)
</script>

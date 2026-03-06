<template>
  <div v-if="loading" class="py-40 text-center">
    <span>Cargando servicio...</span>
  </div>
  <div v-else>
    <div v-if="error" class="py-40 text-center text-red-600">
      {{ error }}
    </div>
    <div v-else-if="service">
      <!-- Hero -->
      <section class="relative py-40 bg-midnight-800 overflow-hidden">
        <div class="absolute inset-0">
          <img
            v-if="service.image"
            :src="resolveImageUrl(service.image)"
            alt=""
            loading="eager"
            fetchpriority="high"
            decoding="async"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
        </div>
        <div class="container-custom relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-white mb-6 leading-tight">{{ displayTitle }}</h1>
            <p class="text-xl text-silver-400 leading-relaxed" v-if="displayDescription">
              {{ displayDescription }}
            </p>
          </div>
        </div>
      </section>

      <!-- CMS Body -->
      <section class="section-padding bg-neutral-50" v-if="cmsBody">
        <div class="container-custom">
          <div class="prose max-w-none" v-html="sanitizeHtml(cmsBody)"></div>
        </div>
      </section>

      <!-- Features -->
      <section class="section-padding bg-neutral-50" v-if="service.features && service.features.length">
        <div class="container-custom">
          <h2 class="text-2xl font-bold mb-6">Características</h2>
          <ul class="space-y-3">
            <li v-for="(feat, idx) in service.features" :key="idx" class="flex items-center text-neutral-500 text-sm">
              <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
              </svg>
              {{ feat }}
            </li>
          </ul>
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
          <h2 class="text-white mb-6">¿Necesitas Asesoramiento?</h2>
          <p class="text-silver-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Te ayudamos a elegir la mejor solución RENOLIT ALKORPLAN para tu piscina. 
            Presupuesto sin compromiso.
          </p>
          <RouterLink to="/contacto" class="btn btn-white btn-lg">
            Contactar Ahora
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useServicesStore } from '@/stores/services'
import { useSeo } from '@/composables/useSeo'
import { resolveImageUrl } from '@/services/api'
import { sanitizeHtml } from '@/composables/useSanitize'

const route = useRoute()
const servicesStore = useServicesStore()

const service = ref(null)
const loading = ref(true)
const error = ref(null)

const cmsBody = computed(() => {
  if (!service.value) return ''
  return service.value.content || ''
})

const displayTitle = computed(() => {
  if (!service.value) return ''
  return service.value.title
})

const displayDescription = computed(() => {
  if (!service.value) return ''
  return service.value.description || ''
})

async function fetchService() {
  loading.value = true
  error.value = null
  const data = await servicesStore.fetchServiceBySlug(route.params.slug)
  if (data) {
    service.value = data
    useSeo({
      title: data.title,
      description: data.description || '',
      keywords: data.slug
    })
  } else {
    error.value = 'Servicio no encontrado.'
  }
  loading.value = false
}

onMounted(fetchService)
watch(() => route.params.slug, fetchService)
</script>

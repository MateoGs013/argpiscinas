<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-primary-300 font-semibold text-sm uppercase tracking-wider mb-4 block">Nuestros Servicios</span>
          <h1 class="text-white mb-6">Servicios Profesionales para tu Piscina</h1>
          <p class="text-xl text-white/80">
            Ofrecemos soluciones integrales para la instalación, rehabilitación y mantenimiento de piscinas 
            con los más altos estándares de calidad.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 gap-8">
          <RouterLink 
            v-for="service in services" 
            :key="service.slug"
            :to="`/servicios/${service.slug}`"
            class="group card overflow-hidden"
          >
            <div class="aspect-video relative overflow-hidden">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h2 class="text-2xl font-bold text-white">{{ service.title }}</h2>
              </div>
            </div>
            <div class="p-6">
              <p class="text-neutral-600 mb-4">{{ service.description }}</p>
              <ul class="space-y-2 mb-6">
                <li v-for="feature in service.features" :key="feature" class="flex items-center text-sm text-neutral-600">
                  <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <span class="inline-flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                Ver más
                <svg class="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-primary-600">
      <div class="container-custom text-center">
        <h2 class="text-white mb-6">¿Necesitas Asesoramiento?</h2>
        <p class="text-primary-100 text-xl mb-10 max-w-2xl mx-auto">
          Nuestro equipo de expertos está listo para ayudarte a elegir la mejor solución para tu piscina.
        </p>
        <RouterLink to="/contacto" class="btn btn-white btn-lg">
          Contactar Ahora
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Servicios de Piscinas',
  description: 'Servicios profesionales de instalación, rehabilitación, impermeabilización y construcción de piscinas con lámina armada.',
  keywords: 'servicios piscinas, instalación lámina armada, rehabilitación piscinas, impermeabilización, construcción piscinas'
})

const services = [
  {
    slug: 'instalacion-lamina-armada',
    title: 'Instalación de Lámina Armada',
    description: 'Instalación profesional de lámina armada PVC para piscinas nuevas o existentes.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    features: [
      'Garantía de 10 años',
      'Materiales de primera calidad',
      'Acabados personalizados',
      'Instalación rápida y limpia'
    ]
  },
  {
    slug: 'rehabilitacion-piscinas',
    title: 'Rehabilitación de Piscinas',
    description: 'Renovación integral de piscinas con problemas de filtraciones, gresite deteriorado o daños estructurales.',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    features: [
      'Diagnóstico completo',
      'Reparación de fugas',
      'Renovación estética',
      'Solución definitiva'
    ]
  },
  {
    slug: 'impermeabilizacion',
    title: 'Impermeabilización',
    description: 'Sistemas de impermeabilización profesional para garantizar la estanqueidad de tu piscina.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1475&q=80',
    features: [
      'Sellado total',
      'Prevención de humedades',
      'Protección duradera',
      'Sin filtraciones'
    ]
  },
  {
    slug: 'construccion',
    title: 'Construcción de Piscinas',
    description: 'Diseño y construcción de piscinas a medida, desde el proyecto hasta la entrega.',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b021aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    features: [
      'Diseño personalizado',
      'Trámites incluidos',
      'Llave en mano',
      'Financiación disponible'
    ]
  }
]
</script>

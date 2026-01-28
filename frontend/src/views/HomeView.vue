<template>
  <div>
    <!-- Hero Section -->
    <section ref="heroRef" class="relative min-h-screen flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-pattern"></div>
      </div>

      <!-- Animated Water Effect -->
      <div class="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <svg class="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="white" fill-opacity="0.3" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </path>
        </svg>
      </div>

      <div class="container-custom relative z-10 py-32">
        <div class="max-w-4xl">
          <div class="hero-subtitle mb-6">
            <span class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Más de 15 años de experiencia
            </span>
          </div>
          
          <h1 class="hero-title text-white mb-6 leading-tight">
            Expertos en <span class="text-primary-300">Lámina Armada</span> para Piscinas
          </h1>
          
          <p class="hero-subtitle text-xl md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            Instalación, rehabilitación e impermeabilización de piscinas con los materiales más avanzados. 
            Garantía de calidad y durabilidad.
          </p>
          
          <div class="hero-cta flex flex-col sm:flex-row gap-4">
            <RouterLink to="/contacto" class="btn btn-white btn-lg">
              Solicitar Presupuesto
              <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
            <RouterLink to="/proyectos" class="btn btn-lg bg-transparent text-white border-2 border-white/30 hover:bg-white/10">
              Ver Proyectos
            </RouterLink>
          </div>

          <!-- Trust Indicators -->
          <div class="hero-subtitle mt-16 flex flex-wrap gap-8 items-center">
            <div class="flex items-center space-x-2 text-white/70">
              <svg class="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Garantía 10 años</span>
            </div>
            <div class="flex items-center space-x-2 text-white/70">
              <svg class="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>+500 proyectos</span>
            </div>
            <div class="flex items-center space-x-2 text-white/70">
              <svg class="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Cobertura nacional</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Services Section -->
    <section ref="servicesRef" class="section-padding bg-white">
      <div class="container-custom">
        <div class="section-header text-center max-w-3xl mx-auto mb-16">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4 block">Nuestros Servicios</span>
          <h2 class="text-neutral-900 mb-6">Soluciones Profesionales para tu Piscina</h2>
          <p class="text-neutral-600 text-lg">
            Ofrecemos servicios integrales de instalación y mantenimiento de piscinas, 
            utilizando lámina armada de la más alta calidad.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <RouterLink 
            v-for="service in services" 
            :key="service.slug"
            :to="`/servicios/${service.slug}`"
            class="animate-item card card-hover p-8 text-center group"
          >
            <div class="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <component :is="service.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">{{ service.title }}</h3>
            <p class="text-neutral-600">{{ service.description }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section ref="benefitsRef" class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="section-header">
            <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4 block">¿Por qué elegirnos?</span>
            <h2 class="text-neutral-900 mb-6">La Mejor Opción para tu Piscina</h2>
            <p class="text-neutral-600 text-lg mb-8">
              Con más de 15 años de experiencia en el sector, garantizamos resultados excepcionales 
              y una atención personalizada en cada proyecto.
            </p>

            <div class="space-y-6">
              <div v-for="benefit in benefits" :key="benefit.title" class="animate-item flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-neutral-900 mb-1">{{ benefit.title }}</h4>
                  <p class="text-neutral-600">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="hero-image aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Piscina con lámina armada" 
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Stats Card -->
            <div class="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 animate-item">
              <div class="flex items-center space-x-4">
                <div class="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div class="text-3xl font-bold text-neutral-900" ref="counterRef">500+</div>
                  <div class="text-sm text-neutral-500">Proyectos completados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="section-header text-center max-w-3xl mx-auto mb-16">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4 block">Nuestro Proceso</span>
          <h2 class="text-neutral-900 mb-6">Cómo Trabajamos</h2>
          <p class="text-neutral-600 text-lg">
            Un proceso transparente y eficiente para garantizar los mejores resultados en tu proyecto.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in processSteps" :key="step.title" class="animate-item relative">
            <div class="text-center">
              <div class="relative inline-block mb-6">
                <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-3xl font-bold text-primary-600">{{ index + 1 }}</span>
                </div>
                <div v-if="index < processSteps.length - 1" class="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary-200 transform -translate-y-1/2" style="width: calc(100% + 2rem);"></div>
              </div>
              <h3 class="text-xl font-bold text-neutral-900 mb-3">{{ step.title }}</h3>
              <p class="text-neutral-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="section-padding bg-neutral-900">
      <div class="container-custom">
        <div class="section-header text-center max-w-3xl mx-auto mb-16">
          <span class="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Nuestro Trabajo</span>
          <h2 class="text-white mb-6">Proyectos Destacados</h2>
          <p class="text-neutral-400 text-lg">
            Descubre algunos de nuestros trabajos más recientes y déjate inspirar.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink 
            v-for="project in featuredProjects" 
            :key="project.slug"
            :to="`/proyectos/${project.slug}`"
            class="animate-item group relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <span class="text-primary-400 text-sm font-medium">{{ project.location }}</span>
              <h3 class="text-xl font-bold text-white mt-1">{{ project.title }}</h3>
            </div>
          </RouterLink>
        </div>

        <div class="text-center mt-12">
          <RouterLink to="/proyectos" class="btn btn-primary btn-lg">
            Ver Todos los Proyectos
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="section-header text-center max-w-3xl mx-auto mb-16">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4 block">Testimonios</span>
          <h2 class="text-neutral-900 mb-6">Lo Que Dicen Nuestros Clientes</h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="animate-item card p-8">
            <!-- Stars -->
            <div class="flex space-x-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-neutral-600 mb-6 italic">"{{ testimonial.content }}"</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                {{ testimonial.initials }}
              </div>
              <div class="ml-4">
                <div class="font-semibold text-neutral-900">{{ testimonial.name }}</div>
                <div class="text-sm text-neutral-500">{{ testimonial.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600">
      <div class="container-custom text-center">
        <h2 class="text-white mb-6">¿Listo para Transformar tu Piscina?</h2>
        <p class="text-primary-100 text-xl mb-10 max-w-2xl mx-auto">
          Contáctanos hoy y recibe un presupuesto personalizado sin compromiso. 
          Nuestro equipo de expertos está listo para ayudarte.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/contacto" class="btn btn-white btn-lg">
            Solicitar Presupuesto
          </RouterLink>
          <a href="tel:+34900000000" class="btn btn-lg bg-transparent text-white border-2 border-white/30 hover:bg-white/10">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Llamar Ahora
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useSeo, useStructuredData } from '@/composables/useSeo'
import { useAnimations } from '@/composables/useAnimations'

// SEO
useSeo({
  title: 'ARG Piscinas | Instalación y Rehabilitación de Piscinas con Lámina Armada',
  description: 'Especialistas en instalación y rehabilitación de piscinas con lámina armada. Más de 15 años de experiencia, garantía de calidad y presupuesto sin compromiso.',
  keywords: 'piscinas, lámina armada, rehabilitación piscinas, impermeabilización, construcción piscinas, Madrid'
})

useStructuredData('localBusiness', {
  description: 'Especialistas en instalación y rehabilitación de piscinas con lámina armada.',
  phone: '+34 900 000 000'
})

// Animations
const { animateHero, animateOnScroll } = useAnimations()
const heroRef = ref(null)
const servicesRef = ref(null)
const benefitsRef = ref(null)

onMounted(() => {
  // Hero animation
  animateHero(heroRef)
  
  // Scroll animations
  animateOnScroll('.animate-item')
})

// Data
const services = [
  {
    slug: 'instalacion-lamina-armada',
    title: 'Instalación Lámina Armada',
    description: 'Instalación profesional con los mejores materiales del mercado.',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
        ])
      }
    }
  },
  {
    slug: 'rehabilitacion-piscinas',
    title: 'Rehabilitación',
    description: 'Renovamos tu piscina con soluciones duraderas y eficientes.',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
        ])
      }
    }
  },
  {
    slug: 'impermeabilizacion',
    title: 'Impermeabilización',
    description: 'Soluciones integrales contra filtraciones y humedades.',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
        ])
      }
    }
  },
  {
    slug: 'construccion',
    title: 'Construcción',
    description: 'Diseño y construcción de piscinas a medida.',
    icon: {
      render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
        ])
      }
    }
  }
]

const benefits = [
  {
    title: 'Garantía de 10 años',
    description: 'Todos nuestros trabajos están respaldados por una garantía extendida.'
  },
  {
    title: 'Materiales Premium',
    description: 'Utilizamos láminas armadas de las mejores marcas europeas.'
  },
  {
    title: 'Equipo Certificado',
    description: 'Técnicos especializados con formación continua.'
  },
  {
    title: 'Presupuesto Sin Compromiso',
    description: 'Te ofrecemos un presupuesto detallado y transparente.'
  }
]

const processSteps = [
  {
    title: 'Consulta',
    description: 'Evaluamos tu proyecto y necesidades específicas.'
  },
  {
    title: 'Presupuesto',
    description: 'Elaboramos un presupuesto detallado y personalizado.'
  },
  {
    title: 'Ejecución',
    description: 'Realizamos el trabajo con máxima profesionalidad.'
  },
  {
    title: 'Entrega',
    description: 'Te entregamos tu piscina lista para disfrutar.'
  }
]

const featuredProjects = [
  {
    slug: 'piscina-residencial-madrid-norte',
    title: 'Rehabilitación Chalet Madrid Norte',
    location: 'Madrid',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b021aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    slug: 'comunidad-vecinos-valencia',
    title: 'Piscina Comunitaria',
    location: 'Valencia',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    slug: 'piscina-infinity-marbella',
    title: 'Piscina Infinity',
    location: 'Marbella',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1475&q=80'
  }
]

const testimonials = [
  {
    name: 'Carlos Martínez',
    location: 'Madrid',
    content: 'Increíble transformación de nuestra piscina. El equipo fue profesional, puntual y el resultado superó nuestras expectativas.',
    initials: 'CM'
  },
  {
    name: 'María García',
    location: 'Valencia',
    content: 'Después de años con problemas de fugas, por fin tenemos una piscina perfecta. El proceso fue rápido y limpio.',
    initials: 'MG'
  },
  {
    name: 'Comunidad Los Olivos',
    location: 'Barcelona',
    content: 'Rehabilitaron nuestra piscina comunitaria en tiempo récord. La comunicación con la comunidad fue excelente.',
    initials: 'LO'
  }
]
</script>

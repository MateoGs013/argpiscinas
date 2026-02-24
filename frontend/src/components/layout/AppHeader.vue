<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-600"
    :class="[
      isScrolled 
        ? 'bg-midnight-800/95 backdrop-blur-xl shadow-2xl shadow-midnight-950/30 py-3' 
        : 'py-5'
    ]"
  >
    <!-- Gradient overlay for contrast when transparent -->
    <div 
      v-if="!isScrolled" 
      class="absolute inset-0 bg-gradient-to-b from-midnight-800/70 via-midnight-800/30 to-transparent pointer-events-none"
    ></div>
    <div class="max-w-full mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-3 group">
          <img 
            src="/ArgPiscinas/LOGO NAV.png" 
            alt="ARG Piscinas - Instalador Oficial RENOLIT ALKORPLAN"
            class="h-12 md:h-14 w-auto transition-all duration-500 no-filter"
            :class="isScrolled ? 'brightness-100' : 'brightness-110'"
          />
          <span 
            class="text-xl font-bold tracking-tight transition-all duration-500"
            :class="isScrolled ? 'text-white' : 'text-white'"
          >
            ARG Piscinas
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-12">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            class="text-sm font-medium tracking-widest uppercase transition-all duration-400 relative group"
            :class="isScrolled ? 'text-silver-300 hover:text-white' : 'text-white/80 hover:text-white'"
          >
            {{ link.label }}
            <span class="absolute -bottom-1.5 left-0 w-0 h-px transition-all duration-400 group-hover:w-full"
              :class="isScrolled ? 'bg-silver-300' : 'bg-white/60'"
            ></span>
          </RouterLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:flex items-center space-x-6">
          <!-- Badge Instalador Oficial -->
          <div 
            class="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase"
            :class="isScrolled ? 'bg-charcoal-600/60 text-white border border-charcoal-400/30' : 'bg-white/15 text-white border border-white/20 backdrop-blur-sm'"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Instalador Oficial</span>
          </div>
          <RouterLink 
            to="/contacto" 
            class="btn btn-sm transition-all duration-400"
            :class="isScrolled 
              ? 'bg-white text-midnight-800 hover:bg-silver-100' 
              : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'"
          >
            Solicitar Presupuesto
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 rounded-boutique transition-colors duration-300"
          :class="isScrolled ? 'text-white hover:bg-charcoal-600' : 'text-white hover:bg-white/10'"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden absolute top-full left-0 right-0 bg-midnight-800/98 backdrop-blur-xl border-t border-charcoal-600/30"
      >
        <div class="container-custom py-8 space-y-2">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            class="block py-3 px-4 text-silver-300 hover:text-white hover:bg-charcoal-600/30 rounded-boutique text-sm font-medium tracking-widest uppercase transition-all duration-300"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
          <div class="pt-6 border-t border-charcoal-600/30 mt-4">
            <div class="flex items-center justify-center space-x-2 mb-5 text-silver-400 text-xs tracking-wider uppercase">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">Instalador Oficial RENOLIT ALKORPLAN</span>
            </div>
            <RouterLink 
              to="/contacto" 
              class="btn bg-white text-midnight-800 hover:bg-silver-100 w-full"
              @click="isMobileMenuOpen = false"
            >
              Solicitar Presupuesto
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' }
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

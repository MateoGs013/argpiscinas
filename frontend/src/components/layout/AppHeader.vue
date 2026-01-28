<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent',
      isScrolled ? 'py-3' : 'py-4'
    ]"
  >
    <div class="container-custom">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:bg-primary-700 transition-colors">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M2 16C2 16 5 10 12 10C19 10 22 16 22 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              <path d="M2 20C2 20 5 14 12 14C19 14 22 20 22 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
            </svg>
          </div>
          <span 
            class="font-display font-bold text-xl transition-colors"
            :class="isScrolled ? 'text-neutral-900' : 'text-white'"
          >
            ARG Piscinas
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            class="font-medium transition-colors relative group"
            :class="isScrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white/90 hover:text-white'"
          >
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
          </RouterLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:block">
          <RouterLink 
            to="/contacto" 
            class="btn"
            :class="isScrolled ? 'btn-primary' : 'btn-white'"
          >
            Solicitar Presupuesto
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 rounded-lg transition-colors"
          :class="isScrolled ? 'text-neutral-900 hover:bg-neutral-100' : 'text-white hover:bg-white/10'"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-neutral-100"
      >
        <div class="container-custom py-6 space-y-4">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            class="block py-3 px-4 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
          <div class="pt-4 border-t border-neutral-100">
            <RouterLink 
              to="/contacto" 
              class="btn btn-primary w-full"
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

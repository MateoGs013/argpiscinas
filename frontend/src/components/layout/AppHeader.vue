<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-600"
    :class="[
      isScrolled || isMobileMenuOpen
        ? 'bg-midnight-800/95 backdrop-blur-xl shadow-2xl shadow-midnight-950/30 py-3' 
        : 'py-5'
    ]"
  >
    <!-- Gradient overlay for contrast when transparent -->
    <div 
      v-if="!isScrolled && !isMobileMenuOpen" 
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
            {{ siteName }}
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-12">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            :aria-current="isActiveLink(link.to) ? 'page' : undefined"
            class="text-sm font-medium tracking-widest uppercase transition-all duration-400 relative group"
            :class="[
              isScrolled ? 'text-silver-300 hover:text-white' : 'text-white/80 hover:text-white',
              isActiveLink(link.to) ? '!text-white' : ''
            ]"
          >
            {{ link.label }}
            <span
              class="absolute -bottom-1.5 left-0 h-px transition-all duration-400"
              :class="[
                isScrolled ? 'bg-silver-300' : 'bg-white/60',
                isActiveLink(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
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
            {{ ctaLabel }}
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 rounded-boutique transition-colors duration-300"
          :class="isScrolled || isMobileMenuOpen ? 'text-white hover:bg-charcoal-600' : 'text-white hover:bg-white/10'"
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

  </header>

  <Teleport to="body">
    <div
      class="lg:hidden fixed inset-0 z-[80] transition-opacity duration-300"
      :class="isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <aside
        class="absolute inset-0 bg-midnight-900 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out flex flex-col"
        :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex items-center justify-between px-5 py-5 border-b border-charcoal-600/40">
          <span class="text-xs text-silver-400 tracking-[0.18em] uppercase font-medium">Menú</span>
          <button
            class="p-2 rounded-boutique text-silver-300 hover:text-white hover:bg-charcoal-600/40 transition-colors"
            aria-label="Cerrar menú"
            @click="isMobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          <RouterLink
            v-for="(link, index) in navLinks"
            :key="`drawer-${link.to}`"
            :to="link.to"
            :aria-current="isActiveLink(link.to) ? 'page' : undefined"
            class="block py-3.5 px-4 rounded-boutique text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 border"
            :class="[
              isActiveLink(link.to)
                ? 'bg-white/10 text-white border-white/20'
                : 'text-silver-300 hover:text-white hover:bg-charcoal-600/30 border-transparent',
              isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            ]"
            :style="{ transitionDelay: isMobileMenuOpen ? `${90 + index * 45}ms` : '0ms' }"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <div
          class="px-4 py-5 border-t border-charcoal-600/40 bg-midnight-800/40 transition-all duration-300"
          :class="isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: isMobileMenuOpen ? `${120 + navLinks.length * 45}ms` : '0ms' }"
        >
          <div class="flex items-center justify-center space-x-2 mb-4 text-silver-400 text-xs tracking-wider uppercase">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Instalador Oficial</span>
          </div>
          <RouterLink
            to="/contacto"
            class="btn bg-white text-midnight-800 hover:bg-silver-100 w-full"
            @click="isMobileMenuOpen = false"
          >
            {{ ctaLabel }}
          </RouterLink>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useContent } from '@/composables/useContent'
import { useSiteConfig } from '@/composables/useSiteConfig'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' }
]

const { t } = useContent()
const { siteName } = useSiteConfig()
const ctaLabel = computed(() => t('header.cta_label', 'Solicitar Presupuesto'))
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function normalizePath(path) {
  if (!path) return '/'
  if (path === '/') return path
  return path.replace(/\/+$/, '')
}

function isActiveLink(targetPath) {
  const currentPath = normalizePath(route.path)
  const target = normalizePath(targetPath)

  if (target === '/') {
    return currentPath === '/'
  }

  return currentPath === target || currentPath.startsWith(`${target}/`)
}

let scrollTicking = false
function handleScroll() {
  if (!scrollTicking) {
    scrollTicking = true
    requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 50
      scrollTicking = false
    })
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    isMobileMenuOpen.value = false
  }
}

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
  }
)

watch(isMobileMenuOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

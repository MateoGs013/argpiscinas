<template>
  <footer class="bg-midnight-800 text-silver-400">
    <!-- Main Footer -->
    <div class="container-custom py-20 lg:py-28">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="flex items-center space-x-3 mb-6">
            <img 
              src="/ArgPiscinas/LOGO NAV.png" 
              alt="ARG Piscinas - Instalador Oficial RENOLIT ALKORPLAN" 
              class="h-14 no-filter"
            />
            <span class="text-xl font-bold tracking-tight text-white">ARG Piscinas</span>
          </RouterLink>
          <p class="text-silver-400/70 mb-6 leading-relaxed text-sm">
            Instaladores oficiales de RENOLIT ALKORPLAN. Especialistas en lámina armada 
            para piscinas con garantía de 15 años.
          </p>
          <!-- Certification Badge -->
          <div class="flex items-center space-x-2.5 mb-8 bg-charcoal-600/40 rounded-boutique px-4 py-3 border border-charcoal-400/10">
            <img src="/Renolit/logo-RENOLIT-ALKORPLAN_blanc.png" alt="RENOLIT ALKORPLAN" class="w-32 h-auto no-filter" />
            <span class="text-xs text-silver-400/60 tracking-wide">Instalador Certificado</span>
          </div>
          <!-- Social Links -->
          <div class="flex space-x-3">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.url" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-charcoal-600/40 hover:bg-charcoal-600 rounded-boutique flex items-center justify-center transition-all duration-400 border border-charcoal-400/10 hover:border-charcoal-400/30"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white tracking-wide uppercase mb-8">Servicios ALKORPLAN</h4>
          <ul class="space-y-4">
            <li v-for="link in serviceLinks" :key="link.to">
              <RouterLink 
                :to="link.to" 
                class="text-silver-400/70 hover:text-white transition-colors duration-300 text-sm"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white tracking-wide uppercase mb-8">Empresa</h4>
          <ul class="space-y-4">
            <li v-for="link in companyLinks" :key="link.to">
              <RouterLink 
                :to="link.to" 
                class="text-silver-400/70 hover:text-white transition-colors duration-300 text-sm"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white tracking-wide uppercase mb-8">Contacto</h4>
          <ul class="space-y-5">
            <li class="flex items-start space-x-3">
              <svg class="w-4 h-4 text-silver-400/50 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-silver-400/70 text-sm">Madrid, España</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-4 h-4 text-silver-400/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+34900000000" class="text-silver-400/70 hover:text-white transition-colors duration-300 text-sm">
                +34 900 000 000
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-4 h-4 text-silver-400/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@argpiscinas.com" class="text-silver-400/70 hover:text-white transition-colors duration-300 text-sm">
                info@argpiscinas.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-charcoal-400/10">
      <div class="container-custom py-7">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-silver-400/40 text-xs tracking-wide">
            © {{ currentYear }} ARG Piscinas — Instalador Oficial RENOLIT ALKORPLAN
          </p>
          <div class="flex space-x-8">
            <span class="text-silver-400/40 text-xs tracking-wide cursor-default">
              Política de Privacidad
            </span>
            <span class="text-silver-400/40 text-xs tracking-wide cursor-default">
              Cookies
            </span>
            <span class="text-silver-400/40 text-xs tracking-wide cursor-default">
              Aviso Legal
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, h } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const serviceLinks = [
  { to: '/servicios/instalacion-lamina-armada', label: 'Piscinas Nuevas' },
  { to: '/servicios/rehabilitacion-piscinas', label: 'Rehabilitación de Piscinas' },
  { to: '/servicios/impermeabilizacion', label: 'Impermeabilización' }
]

const companyLinks = [
  { to: '/nosotros', label: 'Sobre Nosotros' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' }
]

// Social icons as render functions
const FacebookIcon = {
  render() {
    return h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' })
    ])
  }
}

const InstagramIcon = {
  render() {
    return h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' })
    ])
  }
}

const LinkedInIcon = {
  render() {
    return h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
    ])
  }
}

const socials = [
  { name: 'Facebook', url: 'https://facebook.com/argpiscinas', icon: FacebookIcon },
  { name: 'Instagram', url: 'https://instagram.com/argpiscinas', icon: InstagramIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/argpiscinas', icon: LinkedInIcon }
]
</script>

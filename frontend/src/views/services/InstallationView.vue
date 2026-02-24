<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('services.installation.hero_label', 'Servicio Especializado') }}</span>
          <h1 class="text-white mb-6">{{ t('services.installation.hero_title', 'Instalación de Lámina Armada') }}</h1>
          <p class="text-xl text-silver-400 leading-relaxed">
            {{ t('services.installation.hero_desc', 'La solución más duradera y estética para impermeabilizar tu piscina. Instalación profesional con garantía de 15 años.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-14">
          <!-- Main Content -->
          <div class="lg:col-span-2 prose max-w-none" v-html="sanitizeHtml(t('services.installation.content', defaultBody))"></div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <!-- CTA Card -->
              <div class="bg-midnight-800 rounded-boutique-lg p-7">
                <h3 class="text-lg font-bold text-white mb-4">{{ t('services.installation.sidebar_cta_title', '¿Interesado en este servicio?') }}</h3>
                <p class="text-silver-400 text-sm mb-6 leading-relaxed">
                  {{ t('services.installation.sidebar_cta_desc', 'Solicita un presupuesto personalizado sin compromiso.') }}
                </p>
                <RouterLink to="/contacto" class="btn btn-white w-full text-sm">
                  {{ t('services.installation.sidebar_cta_button', 'Solicitar Presupuesto') }}
                </RouterLink>
              </div>

              <!-- Features Card -->
              <div class="bg-white rounded-boutique-lg p-7 border border-neutral-100">
                <h4 class="font-bold text-neutral-900 text-sm mb-5 uppercase tracking-wide">{{ t('services.installation.sidebar_features_title', 'Incluye:') }}</h4>
                <ul class="space-y-3">
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.installation.sidebar_feat1', 'Garantía de 15 años') }}
                  </li>
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.installation.sidebar_feat2', 'Materiales certificados') }}
                  </li>
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.installation.sidebar_feat3', 'Técnicos especializados') }}
                  </li>
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.installation.sidebar_feat4', 'Presupuesto detallado') }}
                  </li>
                </ul>
              </div>

              <!-- Contact Card -->
              <div class="bg-charcoal-600 rounded-boutique-lg p-7">
                <h4 class="font-bold text-white mb-2">{{ t('services.installation.sidebar_contact_title', '¿Preguntas?') }}</h4>
                <p class="text-silver-400/70 text-sm mb-4">{{ t('services.installation.sidebar_contact_desc', 'Llámanos para resolver cualquier duda.') }}</p>
                <a href="tel:+34900000000" class="flex items-center text-white font-medium text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ t('services.installation.sidebar_contact_phone', '+34 900 000 000') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo, useStructuredData } from '@/composables/useSeo'
import { useContent } from '@/composables/useContent'
import { sanitizeHtml } from '@/composables/useSanitize'

const { t } = useContent()

const defaultBody = `<h2>¿Qué es la Lámina Armada?</h2>
            <p>
              La lámina armada es un revestimiento de PVC reforzado con poliéster que se utiliza para 
              impermeabilizar piscinas. Es el sistema más avanzado y duradero del mercado, ofreciendo 
              una vida útil de más de 20 años con el mantenimiento adecuado.
            </p>

            <img 
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Piscina con lámina armada instalada"
              class="rounded-boutique-lg"
            />

            <h2>Ventajas de la Lámina Armada</h2>
            <ul>
              <li><strong>Durabilidad excepcional:</strong> Más de 20 años de vida útil con garantía de fabricante.</li>
              <li><strong>Impermeabilización total:</strong> Sistema 100% estanco sin juntas ni fisuras.</li>
              <li><strong>Versatilidad estética:</strong> Amplia gama de colores y acabados disponibles.</li>
              <li><strong>Instalación rápida:</strong> Una piscina estándar puede estar lista en 5-7 días.</li>
              <li><strong>Bajo mantenimiento:</strong> Superficie lisa que evita la acumulación de algas.</li>
              <li><strong>Resistencia UV:</strong> No se decolora con la exposición solar.</li>
            </ul>

            <h2>Nuestro Proceso de Instalación</h2>
            <h3>1. Evaluación inicial</h3>
            <p>
              Realizamos una inspección completa de tu piscina para determinar el estado del vaso 
              y planificar la instalación óptima.
            </p>

            <h3>2. Preparación del vaso</h3>
            <p>
              Limpiamos y preparamos la superficie, reparando cualquier imperfección para garantizar 
              una instalación perfecta.
            </p>

            <h3>3. Instalación de la lámina</h3>
            <p>
              Colocamos la lámina armada utilizando técnicas de termosoldadura que garantizan una 
              unión perfecta y estanca.
            </p>

            <h3>4. Acabados y entrega</h3>
            <p>
              Instalamos los accesorios (skimmers, impulsores, iluminación) y realizamos las pruebas 
              finales antes de la entrega.
            </p>

            <h2>Materiales que Utilizamos</h2>
            <p>
              Trabajamos exclusivamente con las mejores marcas del mercado europeo:
            </p>
            <ul>
              <li><strong>RENOLIT ALKORPLAN:</strong> Líder mundial en láminas para piscinas.</li>
              <li><strong>CEFIL:</strong> Fabricante español de alta calidad.</li>
              <li><strong>FLAGPOOL:</strong> Marca premium con acabados exclusivos.</li>
            </ul>`

useSeo({
  title: 'Instalación de Lámina Armada para Piscinas',
  description: 'Servicio profesional de instalación de lámina armada PVC para piscinas. Garantía de 15 años, materiales premium y técnicos certificados.',
  keywords: 'lámina armada, instalación piscinas, PVC piscinas, impermeabilización, revestimiento piscinas'
})

useStructuredData('service', {
  name: 'Instalación de Lámina Armada',
  description: 'Servicio profesional de instalación de lámina armada PVC para piscinas con garantía de 15 años.',
  type: 'Instalación de revestimientos para piscinas'
})
</script>

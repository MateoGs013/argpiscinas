<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('services.waterproofing.hero_label', 'Servicio Especializado') }}</span>
          <h1 class="text-white mb-6">{{ t('services.waterproofing.hero_title', 'Impermeabilización de Piscinas') }}</h1>
          <p class="text-xl text-silver-400 leading-relaxed">
            {{ t('services.waterproofing.hero_desc', 'Sistemas profesionales de impermeabilización para garantizar la estanqueidad total de tu piscina y eliminar filtraciones definitivamente.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-14">
          <div class="lg:col-span-2 prose max-w-none" v-html="sanitizeHtml(t('services.waterproofing.content', defaultBody))"></div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <div class="bg-midnight-800 rounded-boutique-lg p-7">
                <h3 class="text-lg font-bold text-white mb-4">{{ t('services.waterproofing.sidebar_cta_title', '¿Problemas de filtraciones?') }}</h3>
                <p class="text-silver-400 text-sm mb-6 leading-relaxed">
                  {{ t('services.waterproofing.sidebar_cta_desc', 'Te ayudamos a identificar el origen y te proponemos la mejor solución.') }}
                </p>
                <RouterLink to="/contacto" class="btn btn-white w-full text-sm">
                  {{ t('services.waterproofing.sidebar_cta_button', 'Consultar') }}
                </RouterLink>
              </div>

              <div class="bg-white rounded-boutique-lg p-7 border border-neutral-100">
                <h4 class="font-bold text-neutral-900 text-sm mb-5 uppercase tracking-wide">{{ t('services.waterproofing.sidebar_features_title', 'Garantizamos:') }}</h4>
                <ul class="space-y-3">
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.waterproofing.sidebar_feat1', 'Estanqueidad 100%') }}
                  </li>
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.waterproofing.sidebar_feat2', 'Garantía por escrito') }}
                  </li>
                  <li class="flex items-center text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-midnight-800 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ t('services.waterproofing.sidebar_feat3', 'Materiales certificados') }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'
import { useContent } from '@/composables/useContent'
import { sanitizeHtml } from '@/composables/useSanitize'

const { t } = useContent()

const defaultBody = `<h2>Importancia de la Impermeabilización</h2>
            <p>
              Una piscina mal impermeabilizada puede causar problemas graves: pérdida de agua, 
              daños estructurales, humedades en zonas cercanas y un gasto continuo en productos 
              químicos y agua.
            </p>

            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1475&q=80" 
              alt="Impermeabilización de piscina"
              class="rounded-boutique-lg"
            />

            <h2>Sistemas de Impermeabilización</h2>
            
            <h3>Lámina Armada PVC</h3>
            <p>
              El sistema más avanzado del mercado. Crea una barrera 100% estanca que se adapta 
              a cualquier forma de vaso.
            </p>

            <h3>Poliurea</h3>
            <p>
              Ideal para piscinas con formas complejas o zonas de difícil acceso. 
              Se aplica por proyección y forma una membrana continua.
            </p>

            <h3>Morteros Impermeabilizantes</h3>
            <p>
              Solución económica para casos específicos, como reparaciones puntuales 
              o preparación de superficies.
            </p>

            <h2>¿Cuándo Necesitas Impermeabilizar?</h2>
            <ul>
              <li>Construcción de nueva piscina</li>
              <li>Fugas o filtraciones detectadas</li>
              <li>Renovación del revestimiento</li>
              <li>Cambio de gresite a lámina</li>
              <li>Daños por movimientos estructurales</li>
            </ul>

            <h2>Nuestro Proceso</h2>
            <ol>
              <li><strong>Inspección:</strong> Identificamos el origen de las filtraciones.</li>
              <li><strong>Diagnóstico:</strong> Evaluamos el mejor sistema para tu caso.</li>
              <li><strong>Preparación:</strong> Acondicionamos la superficie.</li>
              <li><strong>Aplicación:</strong> Instalamos el sistema de impermeabilización.</li>
              <li><strong>Verificación:</strong> Comprobamos la estanqueidad total.</li>
            </ol>`

useSeo({
  title: 'Impermeabilización de Piscinas',
  description: 'Sistemas profesionales de impermeabilización de piscinas. Eliminamos filtraciones definitivamente con lámina armada, poliurea y morteros especiales.',
  keywords: 'impermeabilización piscinas, filtraciones piscina, sellado piscinas, estanqueidad piscinas'
})
</script>

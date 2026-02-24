<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('services.rehabilitation.hero_label', 'Servicio Especializado') }}</span>
          <h1 class="text-white mb-6">{{ t('services.rehabilitation.hero_title', 'Rehabilitación de Piscinas') }}</h1>
          <p class="text-xl text-silver-400 leading-relaxed">
            {{ t('services.rehabilitation.hero_desc', 'Devolvemos la vida a tu piscina. Solucionamos filtraciones, deterioro del gresite y cualquier problema estructural con resultados garantizados.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-14">
          <div class="lg:col-span-2 prose max-w-none" v-html="sanitizeHtml(t('services.rehabilitation.content', defaultBody))"></div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <div class="bg-midnight-800 rounded-boutique-lg p-7">
                <h3 class="text-lg font-bold text-white mb-4">{{ t('services.rehabilitation.sidebar_cta_title', '¿Tu piscina necesita rehabilitación?') }}</h3>
                <p class="text-silver-400 text-sm mb-6 leading-relaxed">
                  {{ t('services.rehabilitation.sidebar_cta_desc', 'Solicita una inspección gratuita y te daremos un diagnóstico completo.') }}
                </p>
                <RouterLink to="/contacto" class="btn btn-white w-full text-sm">
                  {{ t('services.rehabilitation.sidebar_cta_button', 'Solicitar Inspección') }}
                </RouterLink>
              </div>

              <div class="bg-white rounded-boutique-lg p-7 border border-neutral-100">
                <h4 class="font-bold text-neutral-900 text-sm mb-5 uppercase tracking-wide">{{ t('services.rehabilitation.sidebar_alerts_title', 'Señales de alerta:') }}</h4>
                <ul class="space-y-3">
                  <li class="flex items-start text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {{ t('services.rehabilitation.sidebar_alert1', 'Nivel de agua baja constantemente') }}
                  </li>
                  <li class="flex items-start text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {{ t('services.rehabilitation.sidebar_alert2', 'Gresite que se despega') }}
                  </li>
                  <li class="flex items-start text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {{ t('services.rehabilitation.sidebar_alert3', 'Manchas que no desaparecen') }}
                  </li>
                  <li class="flex items-start text-neutral-500 text-sm">
                    <svg class="w-4 h-4 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {{ t('services.rehabilitation.sidebar_alert4', 'Grietas visibles') }}
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
import { useSeo, useStructuredData } from '@/composables/useSeo'
import { useContent } from '@/composables/useContent'
import { sanitizeHtml } from '@/composables/useSanitize'

const { t } = useContent()

const defaultBody = `<h2>¿Cuándo Rehabilitar tu Piscina?</h2>
            <p>
              Las piscinas, como cualquier estructura, sufren desgaste con el tiempo. 
              Si observas alguna de estas señales, es momento de considerar una rehabilitación:
            </p>

            <ul>
              <li>Pérdida de agua anormal (más de 5cm por semana)</li>
              <li>Gresite desprendido o deteriorado</li>
              <li>Manchas persistentes o decoloración</li>
              <li>Grietas visibles en el vaso</li>
              <li>Problemas de humedad en zonas circundantes</li>
            </ul>

            <img 
              src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Rehabilitación de piscina"
              class="rounded-boutique-lg"
            />

            <h2>Nuestra Solución: Lámina Armada</h2>
            <p>
              La rehabilitación con lámina armada es la solución más eficiente y duradera. 
              A diferencia de volver a engrestar, la lámina armada:
            </p>

            <ul>
              <li><strong>Sella completamente</strong> cualquier fuga existente</li>
              <li><strong>Cubre imperfecciones</strong> sin necesidad de picar</li>
              <li><strong>Renueva la estética</strong> por completo</li>
              <li><strong>Añade años de vida</strong> a la estructura</li>
              <li><strong>Reduce el mantenimiento</strong> futuro</li>
            </ul>

            <h2>Proceso de Rehabilitación</h2>
            
            <h3>1. Diagnóstico</h3>
            <p>
              Realizamos una evaluación completa del estado del vaso, identificando fugas, 
              daños estructurales y otros problemas.
            </p>

            <h3>2. Vaciado y Limpieza</h3>
            <p>
              Vaciamos la piscina y realizamos una limpieza profunda de toda la superficie.
            </p>

            <h3>3. Reparaciones Estructurales</h3>
            <p>
              Reparamos grietas, sellamos filtraciones y nivelamos la superficie para 
              la instalación óptima de la lámina.
            </p>

            <h3>4. Instalación de Lámina</h3>
            <p>
              Colocamos la lámina armada con técnicas de termosoldadura profesional.
            </p>

            <h3>5. Puesta en Marcha</h3>
            <p>
              Llenamos la piscina, equilibramos el agua y te entregamos tu piscina 
              completamente renovada.
            </p>

            <h2>Ventajas vs. Reengresitado</h2>
            <table>
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Lámina Armada</th>
                  <th>Gresite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Durabilidad</td>
                  <td>+20 años</td>
                  <td>10-15 años</td>
                </tr>
                <tr>
                  <td>Tiempo de obra</td>
                  <td>5-10 días</td>
                  <td>3-4 semanas</td>
                </tr>
                <tr>
                  <td>Estanqueidad</td>
                  <td>100%</td>
                  <td>Depende de juntas</td>
                </tr>
                <tr>
                  <td>Mantenimiento</td>
                  <td>Mínimo</td>
                  <td>Regular</td>
                </tr>
              </tbody>
            </table>`

useSeo({
  title: 'Rehabilitación de Piscinas con Lámina Armada',
  description: 'Servicio de rehabilitación de piscinas con lámina armada. Solucionamos filtraciones, gresite deteriorado y daños estructurales. Diagnóstico gratuito.',
  keywords: 'rehabilitación piscinas, reparación piscinas, filtraciones piscina, renovar piscina, lámina armada'
})

useStructuredData('service', {
  name: 'Rehabilitación de Piscinas',
  description: 'Servicio profesional de rehabilitación de piscinas con lámina armada.',
  type: 'Rehabilitación y reparación de piscinas'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('about.hero.label', 'Conócenos') }}</span>
          <h1 class="text-white mb-8 leading-[1.1]">{{ t('about.hero.title', 'Instaladores Oficiales RENOLIT ALKORPLAN') }}</h1>
          <p class="text-lg text-silver-400 leading-relaxed max-w-xl">
            {{ t('about.hero.description', 'Somos especialistas certificados en instalación de lámina armada RENOLIT ALKORPLAN, la membrana más utilizada en el mundo para el revestimiento de piscinas.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 class="text-neutral-900 mb-8">{{ t('about.content.title', 'Quiénes Somos') }}</h2>
            <div class="space-y-5 text-neutral-600 leading-relaxed">
              <p>
                {{ t('about.content.paragraph1', 'ARG Piscinas es una empresa especializada exclusivamente en la instalación de lámina armada RENOLIT ALKORPLAN para piscinas. Como instaladores oficiales certificados, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.') }}
              </p>
              <p>
                {{ t('about.content.paragraph2', 'Nuestra especialización nos permite ofrecer un servicio de máxima calidad, centrado en lo que mejor sabemos hacer: impermeabilizar piscinas con la tecnología más avanzada del mercado.') }}
              </p>
              <p>
                {{ t('about.content.paragraph3', 'Trabajamos tanto en piscinas de nueva construcción como en rehabilitaciones, ofreciendo soluciones personalizadas para cada proyecto con la garantía oficial de RENOLIT.') }}
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-[3/4] rounded-boutique-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Instalación de lámina RENOLIT ALKORPLAN"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Badge Certificación -->
            <div class="absolute -bottom-6 -left-6 bg-white rounded-boutique-lg shadow-2xl p-5 border border-neutral-100">
              <img src="/Renolit/logo RENOLIT ALKORPLAN+Instalador_negro.png" alt="Instalador Oficial RENOLIT" class="w-48 h-auto no-filter" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RENOLIT ALKORPLAN Section -->
    <section class="section-padding bg-charcoal-600">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Tecnología</span>
          <h2 class="text-white mb-6">¿Por qué RENOLIT ALKORPLAN?</h2>
          <p class="text-silver-400 text-lg leading-relaxed">
            Trabajamos exclusivamente con RENOLIT ALKORPLAN porque es la mejor solución 
            del mercado para el revestimiento de piscinas.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-midnight-800/50 rounded-boutique-lg p-10 text-center border border-charcoal-400/10">
            <div class="w-14 h-14 mx-auto mb-8 bg-charcoal-600/60 rounded-boutique flex items-center justify-center">
              <svg class="w-7 h-7 text-silver-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">100% Estanqueidad</h3>
            <p class="text-silver-400 text-sm leading-relaxed">
              Impermeabilización total garantizada. La única membrana que puede garantizar 
              la estanqueidad de tu piscina independientemente de su ubicación.
            </p>
          </div>

          <div class="bg-midnight-800/50 rounded-boutique-lg p-10 text-center border border-charcoal-400/10">
            <div class="w-14 h-14 mx-auto mb-8 bg-charcoal-600/60 rounded-boutique flex items-center justify-center">
              <svg class="w-7 h-7 text-silver-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Resistencia UV</h3>
            <p class="text-silver-400 text-sm leading-relaxed">
              Protección lacada de alta concentración UV que protege contra el sol, 
              el paso del tiempo y las condiciones climáticas adversas.
            </p>
          </div>

          <div class="bg-midnight-800/50 rounded-boutique-lg p-10 text-center border border-charcoal-400/10">
            <div class="w-14 h-14 mx-auto mb-8 bg-charcoal-600/60 rounded-boutique flex items-center justify-center">
              <svg class="w-7 h-7 text-silver-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Variedad de Diseños</h3>
            <p class="text-silver-400 text-sm leading-relaxed">
              Amplia gama de colecciones: TOUCH, VOGUE, CERAMICS, RELIEF y más, 
              para personalizar tu piscina según tu estilo.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <span class="text-silver-500 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Compromiso</span>
          <h2 class="text-neutral-900 mb-6">Nuestra Garantía</h2>
          <p class="text-neutral-600 text-lg leading-relaxed">
            Como instaladores oficiales, ofrecemos todas las garantías de RENOLIT ALKORPLAN.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-midnight-800 rounded-full flex items-center justify-center">
              <span class="text-xl font-bold text-white">10</span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Años de Garantía</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">
              Garantía escrita oficial de RENOLIT sobre la impermeabilización.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-midnight-800 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Certificación Oficial</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">
              Instaladores formados y certificados directamente por RENOLIT.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-midnight-800 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Material Original</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">
              Utilizamos exclusivamente láminas RENOLIT ALKORPLAN originales.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-midnight-800 rounded-full flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">Técnicas Oficiales</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">
              Seguimos los protocolos de instalación establecidos por RENOLIT.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-midnight-800"></div>
      <div class="container-custom relative z-10 text-center">
        <img src="/Renolit/logo-RENOLIT-ALKORPLAN_blanc.png" alt="RENOLIT ALKORPLAN" class="w-44 h-auto mx-auto mb-8 no-filter" />
        <h2 class="text-white mb-6">{{ t('about.cta.title', '¿Listo para tu Proyecto?') }}</h2>
        <p class="text-silver-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          {{ t('about.cta.description', 'Contacta con nosotros y recibe un presupuesto personalizado para la instalación de RENOLIT ALKORPLAN en tu piscina.') }}
        </p>
        <RouterLink to="/contacto" class="btn btn-white btn-lg">
          {{ t('about.cta.button', 'Solicitar Presupuesto') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'
import { useContent } from '@/composables/useContent'

const { t } = useContent()

useSeo({
  title: 'Sobre Nosotros | Instaladores Oficiales RENOLIT ALKORPLAN',
  description: 'ARG Piscinas, instaladores oficiales certificados de RENOLIT ALKORPLAN. Especialistas en instalación de lámina armada para piscinas con garantía de 15 años.',
  keywords: 'instaladores oficiales RENOLIT, ALKORPLAN certificados, lámina armada piscinas, garantía RENOLIT'
})
</script>

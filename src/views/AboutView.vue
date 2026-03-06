<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-midnight-800 pt-36 pb-24 lg:pt-44 lg:pb-28">
      <div class="absolute inset-0">
        <img
          src="@/assets/img/RENOLIT_3000- Marbre (7).jpg"
          alt="Equipo instalando lámina armada"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover about-image"
        />
        <div class="absolute inset-0 bg-gradient-to-tr from-midnight-800 via-midnight-800/82 to-midnight-800/45"></div>
        <div class="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="grid gap-10 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr] items-end">
          <div>
            <span class="text-silver-300/75 font-medium text-xs uppercase tracking-[0.22em] mb-6 block">
              {{ t('about.hero.label', 'Conócenos') }}
            </span>
            <h1 class="text-white mb-8 leading-[1.07] max-w-4xl">
              {{ t('about.hero.title', 'Instaladores Oficiales RENOLIT ALKORPLAN') }}
            </h1>
            <p class="text-lg text-silver-400 leading-relaxed max-w-2xl">
              {{ t('about.hero.description', 'Somos especialistas certificados en instalación de lámina armada RENOLIT ALKORPLAN, la membrana más utilizada en el mundo para el revestimiento de piscinas.') }}
            </p>
            <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.16em] uppercase text-silver-300/55">
              <span>{{ t('about.hero.trust_1', 'Equipo certificado') }}</span>
              <span class="w-1 h-1 rounded-full bg-white/20"></span>
              <span>{{ t('about.hero.trust_2', 'Material oficial') }}</span>
              <span class="w-1 h-1 rounded-full bg-white/20"></span>
              <span>{{ t('about.hero.trust_3', 'Resultados duraderos') }}</span>
            </div>
          </div>

          <div class="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <article
              v-for="stat in aboutStats"
              :key="stat.label"
              class="rounded-boutique-lg border border-white/15 bg-white/[0.07] backdrop-blur-md p-5"
            >
              <p class="text-2xl lg:text-[1.75rem] font-bold text-white">{{ stat.value }}</p>
              <p class="text-[11px] mt-1 text-silver-300/80 uppercase tracking-[0.12em]">{{ stat.label }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-neutral-50 relative overflow-hidden">
      <div class="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/80 to-transparent pointer-events-none"></div>
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span class="text-silver-500 font-medium text-xs uppercase tracking-[0.2em] mb-5 block">
              {{ t('about.content.label', 'Nuestra esencia') }}
            </span>
            <h2 class="text-neutral-900 mb-8 max-w-xl">{{ t('about.content.title', 'Quiénes Somos') }}</h2>
            <div class="space-y-5 text-neutral-600 leading-relaxed max-w-2xl">
              <p>{{ t('about.content.paragraph1', 'ARG Piscinas es una empresa especializada exclusivamente en la instalación de lámina armada RENOLIT ALKORPLAN para piscinas. Como instaladores oficiales certificados, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.') }}</p>
              <p>{{ t('about.content.paragraph2', 'Nuestra especialización nos permite ofrecer un servicio de máxima calidad, centrado en lo que mejor sabemos hacer: impermeabilizar piscinas con la tecnología más avanzada del mercado.') }}</p>
              <p>{{ t('about.content.paragraph3', 'Trabajamos tanto en piscinas de nueva construcción como en rehabilitaciones, ofreciendo soluciones personalizadas para cada proyecto con la garantía oficial de RENOLIT.') }}</p>
            </div>

            <div class="mt-10 space-y-3">
              <div
                v-for="pillar in pillars"
                :key="pillar"
                class="flex items-center gap-3 text-sm text-neutral-700"
              >
                <span class="w-6 h-6 rounded-full bg-midnight-800 text-white text-xs flex items-center justify-center">✓</span>
                <span>{{ pillar }}</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="aspect-[4/5] rounded-boutique-lg overflow-hidden shadow-xl shadow-midnight-900/10">
              <img
                src="@/assets/img/RENOLIT_TOUCH_Vanity_DSC_0893.jpg"
                alt="Detalle de terminación premium"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover about-image"
              />
            </div>
            <div class="absolute -bottom-6 -left-6 bg-white rounded-boutique-lg shadow-2xl p-5 border border-neutral-100">
              <img
                src="/Renolit/logo RENOLIT ALKORPLAN+Instalador_negro.png"
                alt="Instalador Oficial RENOLIT"
                loading="lazy"
                decoding="async"
                class="w-44 h-auto no-filter"
              />
            </div>
            <div class="absolute -top-6 -right-6 hidden md:block rounded-boutique-lg bg-midnight-800 text-white p-5 max-w-[220px] shadow-xl">
              <p class="text-[11px] uppercase tracking-[0.15em] text-silver-300/80 mb-2">
                {{ t('about.content.quote_label', 'Compromiso') }}
              </p>
              <p class="text-sm leading-relaxed">
                {{ t('about.content.quote', 'Cada obra se ejecuta con protocolo técnico oficial y control de calidad en cada fase.') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="section-padding bg-midnight-800">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-silver-400/65 font-medium text-xs uppercase tracking-[0.2em] mb-5 block">
            {{ t('about.highlights.label', 'Cómo trabajamos') }}
          </span>
          <h2 class="text-white mb-4">{{ t('about.highlights.title', 'Un estándar de ejecución que se nota en el resultado') }}</h2>
          <p class="text-silver-400 text-lg leading-relaxed">
            {{ t('about.highlights.description', 'Combinamos criterio técnico, procesos claros y seguimiento real para que cada proyecto se entregue con confianza.') }}
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <article
            v-for="(item, index) in highlights"
            :key="item.title"
            class="group rounded-boutique-lg border border-white/10 bg-charcoal-600/45 p-8 hover:bg-charcoal-600/60 hover:border-white/20 transition-all duration-500"
          >
            <div class="flex items-start justify-between mb-7">
              <div class="w-12 h-12 bg-white/[0.08] rounded-boutique flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
                </svg>
              </div>
              <span class="text-silver-400/45 text-xs tracking-[0.15em]">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
            <p class="text-silver-400 leading-relaxed text-sm">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Method -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <span class="text-silver-500 font-medium text-xs uppercase tracking-[0.2em] mb-5 block">
              {{ t('about.method.label', 'Método') }}
            </span>
            <h2 class="text-neutral-900 mb-6">{{ t('about.method.title', 'Planificación, ejecución y cierre sin improvisaciones') }}</h2>
            <p class="text-neutral-600 leading-relaxed">
              {{ t('about.method.description', 'Cada proyecto sigue un flujo claro para garantizar plazos, calidad de terminación y una experiencia de cliente transparente.') }}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <article
              v-for="(step, idx) in methodSteps"
              :key="step.title"
              class="rounded-boutique-lg border border-neutral-200 bg-white p-6"
            >
              <div class="w-8 h-8 rounded-full bg-midnight-800 text-white text-xs font-semibold flex items-center justify-center mb-4">
                {{ idx + 1 }}
              </div>
              <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ step.title }}</h3>
              <p class="text-sm text-neutral-500 leading-relaxed">{{ step.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="@/assets/img/RENOLIT_TOUCH_prestige_Haselhofer_02.jpg"
          alt="Piscina terminada con RENOLIT"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover about-image"
        />
        <div class="absolute inset-0 bg-midnight-800/80"></div>
      </div>
      <div class="container-custom relative z-10 text-center">
        <img src="/Renolit/logo-RENOLIT-ALKORPLAN_blanc.png" alt="RENOLIT ALKORPLAN" loading="lazy" decoding="async" class="w-44 h-auto mx-auto mb-8 no-filter" />
        <h2 class="text-white mb-6">{{ t('about.cta.title', '¿Listo para tu Proyecto?') }}</h2>
        <p class="text-silver-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          {{ t('about.cta.description', 'Contacta con nosotros y recibe un presupuesto personalizado para la instalación de RENOLIT ALKORPLAN en tu piscina.') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/contacto" class="btn btn-white btn-lg">{{ t('about.cta.button', 'Solicitar Presupuesto') }}</RouterLink>
          <RouterLink to="/proyectos" class="btn btn-outline btn-lg">Ver Proyectos</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useContent } from '@/composables/useContent'

const { t } = useContent()

const aboutStats = computed(() => [
  {
    value: t('about.hero.stat_1_value', '15 años'),
    label: t('about.hero.stat_1_label', 'Experiencia aplicada')
  },
  {
    value: t('about.hero.stat_2_value', '100%'),
    label: t('about.hero.stat_2_label', 'Foco en impermeabilización')
  },
  {
    value: t('about.hero.stat_3_value', 'Oficial'),
    label: t('about.hero.stat_3_label', 'Certificación RENOLIT')
  }
])

const pillars = computed(() => [
  t('about.content.pillar_1', 'Diagnóstico técnico antes de ejecutar'),
  t('about.content.pillar_2', 'Instalación con protocolo de soldadura certificado'),
  t('about.content.pillar_3', 'Seguimiento post-obra para garantizar rendimiento')
])

const highlights = computed(() => [
  {
    title: t('about.highlights.item_1_title', 'Diagnóstico técnico'),
    description: t('about.highlights.item_1_desc', 'Evaluamos estructura, terminaciones y puntos críticos para definir la mejor solución desde el inicio.'),
    icon: 'M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z'
  },
  {
    title: t('about.highlights.item_2_title', 'Instalación certificada'),
    description: t('about.highlights.item_2_desc', 'Aplicamos protocolos oficiales de soldadura y colocación para asegurar estanqueidad y durabilidad.'),
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    title: t('about.highlights.item_3_title', 'Seguimiento real'),
    description: t('about.highlights.item_3_desc', 'Te acompañamos antes, durante y después de la obra para que el resultado se mantenga impecable.'),
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
])

const methodSteps = computed(() => [
  {
    title: t('about.method.step_1_title', 'Relevamiento'),
    description: t('about.method.step_1_desc', 'Analizamos estado general del vaso, filtraciones y requerimientos funcionales del proyecto.')
  },
  {
    title: t('about.method.step_2_title', 'Plan técnico'),
    description: t('about.method.step_2_desc', 'Definimos materiales, secuencia de instalación y tiempos con alcance claro desde el inicio.')
  },
  {
    title: t('about.method.step_3_title', 'Ejecución'),
    description: t('about.method.step_3_desc', 'Instalación precisa con control de calidad continuo en cada fase de obra.')
  },
  {
    title: t('about.method.step_4_title', 'Entrega y seguimiento'),
    description: t('about.method.step_4_desc', 'Validamos terminación final, funcionamiento y pautas de cuidado para máxima durabilidad.')
  }
])

useSeo({
  title: 'Sobre Nosotros | Instaladores Oficiales RENOLIT ALKORPLAN',
  description: 'ARG Piscinas, instaladores oficiales certificados de RENOLIT ALKORPLAN. Especialistas en instalación de lámina armada para piscinas con garantía de 15 años.',
  keywords: 'instaladores oficiales RENOLIT, ALKORPLAN certificados, lámina armada piscinas, garantía RENOLIT'
})
</script>

<style scoped>
.about-image {
  filter: saturate(0.7) contrast(1.08) brightness(0.9);
}

.about-image:hover {
  filter: saturate(0.82) contrast(1.1) brightness(0.95);
}
</style>

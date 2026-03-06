<template>
  <div>
    <!-- Hero Section -->
    <section ref="heroRef" class="relative min-h-[90svh] sm:min-h-screen overflow-hidden bg-midnight-800">
      <!-- Background Image -->
      <div class="hero-image absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_TOUCH_Vanity_DSC_0893.jpg" 
          alt="Piscina de diseño con lámina armada RENOLIT"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover object-[58%_center] sm:object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-midnight-900/90 via-midnight-800/55 to-midnight-800/20"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-midnight-800/25 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 min-h-[90svh] sm:min-h-screen flex items-end pt-24 sm:pt-32 lg:pt-36 pb-10 lg:pb-12">
        <div class="max-w-full w-full mx-auto px-10 sm:px-14 lg:px-20 xl:px-24">
          <div class="grid lg:grid-cols-[minmax(0,1fr),220px] gap-8 lg:gap-10 items-end">
            <div class="max-w-3xl">
              <div class="hero-subtitle mb-8">
                <img
                  src="/Renolit/RENOLIT%20ALKORPLAN%2001%20Blanco.png"
                  alt="RENOLIT ALKORPLAN — Inspiring Pool Surfaces"
                  loading="eager"
                  decoding="async"
                  class="h-24 sm:h-28 md:h-40 lg:h-52 w-auto opacity-85 no-filter"
                />
              </div>

              <h1 class="hero-title text-white font-semibold leading-[1.02] mb-5 text-4xl md:text-6xl lg:text-[4rem]">
                {{ t('home.hero.title', 'La mejor lámina, bien instalada.') }}
              </h1>

              <p class="hero-subtitle text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                {{ t('home.hero.subtitle', 'RENOLIT ALKORPLAN resuelve filtraciones e impermeabilización de una vez. Sin intermediarios.') }}
              </p>

              <div class="hero-cta flex flex-wrap items-center gap-4 sm:gap-6">
                <RouterLink to="/contacto" class="inline-flex items-center px-7 py-3.5 bg-white text-midnight-800 text-xs font-semibold tracking-[0.15em] uppercase rounded-boutique hover:bg-neutral-100 transition-all duration-300 shadow-lg shadow-black/20">
                  {{ t('home.hero.cta_primary', 'Pedir Presupuesto') }}
                  <svg class="w-3.5 h-3.5 ml-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </RouterLink>
                <RouterLink to="/proyectos" class="text-white/75 text-xs font-medium tracking-[0.15em] uppercase hover:text-white transition-colors duration-300">
                  {{ t('home.hero.cta_secondary', 'Ver Proyectos') }}
                </RouterLink>
              </div>

              <!-- Mobile seals -->
              <div class="lg:hidden mt-8 grid grid-cols-2 gap-2.5 max-w-[14rem]">
                <div
                  v-for="seal in heroSeals"
                  :key="`mobile-seal-${seal}`"
                  class="relative w-24 h-24 rounded-full border-2 border-white/35 bg-white/12 ring-1 ring-inset ring-white/20 backdrop-blur-sm shadow-md shadow-black/25 flex flex-col items-center justify-center text-center px-2"
                >
                  <span class="pointer-events-none absolute inset-[4px] rounded-full border border-white/25"></span>
                  <svg class="w-3.5 h-3.5 text-white/90 mb-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-white text-[9px] font-semibold tracking-[0.11em] uppercase leading-[1.2]">
                    {{ seal }}
                  </span>
                </div>
              </div>
            </div>

            <div class="hidden lg:flex hero-subtitle flex-col items-center gap-4 pb-3">
              <div
                v-for="seal in heroSeals"
                :key="`desktop-seal-${seal}`"
                class="relative w-32 h-32 rounded-full border-2 border-white/35 bg-white/12 ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-lg shadow-black/30 flex flex-col items-center justify-center text-center px-3 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span class="pointer-events-none absolute inset-[5px] rounded-full border border-white/25"></span>
                <svg class="w-4 h-4 text-white/90 mb-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white text-[10px] font-semibold tracking-[0.13em] uppercase leading-[1.25]">
                  {{ seal }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- RENOLIT ALKORPLAN Section — Split layout with editorial feel -->
    <section class="py-14 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span class="text-midnight-800/70 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.renolit.label', '¿Por qué RENOLIT ALKORPLAN?') }}</span>
            <h2 class="text-neutral-900 mb-8 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.renolit.title', 'La Mejor Lámina Armada del Mercado') }}</h2>
            <p class="text-neutral-700 text-[1.08rem] mb-10 leading-relaxed">
              {{ t('home.renolit.description', 'RENOLIT ALKORPLAN es la membrana armada más utilizada en el mundo para el revestimiento de piscinas. Como instaladores oficiales certificados, garantizamos una instalación profesional con materiales de primera calidad.') }}
            </p>
            
            <div class="space-y-6 mb-10">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-midnight-800/95 rounded-boutique flex items-center justify-center flex-shrink-0 shadow-sm shadow-midnight-800/30">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 text-[1.02rem]">{{ t('home.renolit.feature1_title', '100% Estanqueidad Garantizada') }}</h4>
                  <p class="text-neutral-600 text-sm mt-1">{{ t('home.renolit.feature1_desc', 'Impermeabilización total con garantía escrita de 15 años.') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-midnight-800/95 rounded-boutique flex items-center justify-center flex-shrink-0 shadow-sm shadow-midnight-800/30">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 text-[1.02rem]">{{ t('home.renolit.feature2_title', 'Resistencia UV Superior') }}</h4>
                  <p class="text-neutral-600 text-sm mt-1">{{ t('home.renolit.feature2_desc', 'Protección lacada contra rayos UV y envejecimiento prematuro.') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-midnight-800/95 rounded-boutique flex items-center justify-center flex-shrink-0 shadow-sm shadow-midnight-800/30">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 text-[1.02rem]">{{ t('home.renolit.feature3_title', 'Amplia Gama de Diseños') }}</h4>
                  <p class="text-neutral-600 text-sm mt-1">{{ t('home.renolit.feature3_desc', 'Colecciones TOUCH, VOGUE, CERAMICS y más para personalizar tu piscina.') }}</p>
                </div>
              </div>
            </div>

            <a href="https://renolit-alkorplan.com" target="_blank" rel="noopener" class="inline-flex items-center text-midnight-800 font-semibold text-sm tracking-wide hover:text-charcoal-500 transition-colors">
              {{ t('home.renolit.link_text', 'Conocer más sobre RENOLIT ALKORPLAN') }}
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          
          <div class="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-none">
            <div class="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-boutique-lg overflow-hidden">
              <picture>
                <source media="(max-width: 639px)" srcset="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1200&q=75" />
                <img 
                  src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Piscina con lámina armada RENOLIT ALKORPLAN" 
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover object-[52%_center] sm:object-center"
                />
              </picture>
            </div>
            <!-- Badge RENOLIT -->
            <div class="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-boutique-lg shadow-2xl p-3 sm:p-5 border border-neutral-100">
              <img src="/Renolit/logo RENOLIT ALKORPLAN+Instalador_negro.png" alt="Instalador Oficial RENOLIT" loading="lazy" decoding="async" class="w-32 sm:w-40 lg:w-48 h-auto no-filter" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section — Editorial grid -->
    <section ref="servicesRef" class="py-14 md:py-24 lg:py-32 bg-midnight-800">
      <div class="container-custom">
        <div class="section-header max-w-2xl mb-20">
          <span class="text-silver-300/85 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.services.label', 'Nuestros Servicios') }}</span>
          <h2 class="text-white mb-6 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.services.title', 'Soluciones con RENOLIT ALKORPLAN') }}</h2>
          <p class="text-silver-300 text-lg leading-relaxed">
            {{ t('home.services.description', 'Como instaladores oficiales, ofrecemos servicios especializados de instalación de lámina armada RENOLIT ALKORPLAN para todo tipo de piscinas.') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink 
            v-for="service in services" 
            :key="service.slug"
            :to="`/servicios/${service.slug}`"
            class="animate-item group bg-charcoal-600/50 rounded-boutique-lg p-10 border border-white/[0.08] hover:border-white/[0.2] hover:bg-charcoal-600/75 hover:shadow-xl hover:shadow-black/20 transition-all duration-500"
          >
            <div class="w-14 h-14 mb-8 bg-charcoal-500/70 rounded-boutique flex items-center justify-center text-silver-200 group-hover:bg-white group-hover:text-midnight-800 transition-all duration-500">
              <component :is="service.icon" class="w-7 h-7" />
            </div>
            <h3 class="text-[1.35rem] font-semibold text-white mb-3 leading-snug">{{ service.title }}</h3>
            <p class="text-silver-300/90 mb-6 leading-relaxed">{{ service.description }}</p>
            <span class="inline-flex items-center text-silver-200 text-sm font-medium tracking-wide group-hover:text-white transition-colors">
              Ver más
              <svg class="w-4 h-4 ml-2 transform transition-transform duration-400 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Benefits Section — Experience block: image + text alternado -->
    <section ref="benefitsRef" class="py-14 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="order-2 lg:order-1 relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-none">
            <div class="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[5/6] rounded-boutique-lg overflow-hidden">
              <picture>
                <source media="(max-width: 639px)" srcset="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1100&q=75" />
                <img 
                  src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Instalación de lámina armada RENOLIT ALKORPLAN" 
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover object-[54%_center] sm:object-center"
                />
              </picture>
            </div>
            <!-- Stats Card -->
            <div class="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-midnight-800/95 border border-white/10 rounded-boutique-lg shadow-2xl p-4 sm:p-7 animate-item">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-charcoal-600 rounded-boutique flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div class="text-xl sm:text-2xl font-bold text-white">{{ t('home.benefits.stat_value', '15 años') }}</div>
                  <div class="text-xs text-silver-400 tracking-wide">{{ t('home.benefits.stat_label', 'Garantía escrita RENOLIT') }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2">
            <span class="text-midnight-800/70 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.benefits.label', '¿Por qué elegirnos?') }}</span>
            <h2 class="text-neutral-900 mb-8 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.benefits.title', 'Instaladores Oficiales Certificados') }}</h2>
            <p class="text-neutral-700 text-[1.08rem] mb-10 leading-relaxed">
              {{ t('home.benefits.description', 'Como instaladores oficiales de RENOLIT ALKORPLAN, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.') }}
            </p>

            <div class="space-y-8">
              <div v-for="benefit in benefits" :key="benefit.title" class="animate-item flex items-start space-x-5">
                <div class="w-px h-12 bg-midnight-800/35 flex-shrink-0 mt-1"></div>
                <div>
                  <h4 class="text-[1.02rem] font-semibold text-neutral-900 mb-1">{{ benefit.title }}</h4>
                  <p class="text-neutral-600 text-sm leading-relaxed">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section — Dark, minimal -->
    <section class="relative py-14 md:py-24 lg:py-32 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_TOUCH_relax.jpg" 
          alt="Proceso de trabajo"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover object-[60%_center] sm:object-center"
        />
        <div class="absolute inset-0 bg-charcoal-600/85 backdrop-blur-[2px]"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="section-header text-center max-w-2xl mx-auto mb-20">
          <span class="text-silver-300/85 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.process.label', 'Nuestro Proceso') }}</span>
          <h2 class="text-white mb-6 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.process.title', 'Cómo Trabajamos') }}</h2>
          <p class="text-silver-300 text-lg leading-relaxed">
            {{ t('home.process.description', 'Un proceso transparente y eficiente para garantizar los mejores resultados en tu proyecto.') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in processSteps" :key="step.title" class="animate-item relative text-center">
            <div class="relative inline-block mb-8">
              <div class="w-16 h-16 bg-midnight-800/95 rounded-full flex items-center justify-center border border-white/15 shadow-lg shadow-black/20">
                <span class="text-xl font-bold text-white">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">{{ step.title }}</h3>
            <p class="text-silver-300 text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects — Cinematic gallery -->
    <section class="py-14 md:py-24 lg:py-32 bg-midnight-800">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div class="max-w-xl">
            <span class="text-silver-300/85 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.projects.label', 'Nuestro Trabajo') }}</span>
            <h2 class="text-white mb-4 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.projects.title', 'Proyectos Destacados') }}</h2>
            <p class="text-silver-300 text-lg leading-relaxed">
              {{ t('home.projects.description', 'Descubre algunos de nuestros trabajos más recientes y déjate inspirar.') }}
            </p>
          </div>
          <RouterLink to="/proyectos" class="btn bg-transparent text-white border border-white/25 hover:bg-white/10 self-start md:self-auto">
            {{ t('home.projects.cta', 'Ver Todos los Proyectos') }}
          </RouterLink>
        </div>

        <div
          ref="projectsTrackRef"
          @scroll.passive="handleProjectsScroll"
          class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto sm:overflow-visible snap-x sm:snap-none snap-mandatory pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <RouterLink 
            v-for="(project, index) in featuredProjects" 
            :key="project.slug"
            :to="`/proyectos/${project.slug}`"
            :ref="(el) => setProjectCardRef(el, index)"
            class="animate-item group relative min-w-[84vw] max-w-[21rem] sm:min-w-0 sm:max-w-none aspect-[4/3] sm:aspect-[5/6] rounded-boutique-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-500 snap-start"
          >
            <img 
              :src="getProjectImage(project)" 
              :alt="project.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-midnight-900/95 via-midnight-800/25 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <span class="text-silver-300/80 text-xs font-medium tracking-widest uppercase">{{ project.location }}</span>
              <h3 class="text-[1.35rem] font-semibold text-white mt-2 leading-snug">{{ project.title }}</h3>
            </div>
          </RouterLink>
        </div>

        <div v-if="featuredProjects.length > 1" class="sm:hidden mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            class="w-8 h-8 rounded-full border border-white/20 text-white/80 disabled:opacity-35"
            :disabled="activeProjectIndex === 0"
            aria-label="Proyecto anterior"
            @click="scrollProjectBy(-1)"
          >
            ‹
          </button>
          <div class="flex items-center gap-2">
            <button
              v-for="(_, idx) in featuredProjects"
              :key="`project-dot-${idx}`"
              type="button"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300"
              :class="idx === activeProjectIndex ? 'bg-white scale-110' : 'bg-white/35'"
              :aria-label="`Ir al proyecto ${idx + 1}`"
              @click="scrollToProject(idx)"
            />
          </div>
          <button
            type="button"
            class="w-8 h-8 rounded-full border border-white/20 text-white/80 disabled:opacity-35"
            :disabled="activeProjectIndex >= featuredProjects.length - 1"
            aria-label="Proyecto siguiente"
            @click="scrollProjectBy(1)"
          >
            ›
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials — Clean, editorial -->
    <section class="py-14 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <span class="text-midnight-800/70 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.testimonials.label', 'Testimonios') }}</span>
          <h2 class="text-neutral-900 mb-6 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.testimonials.title', 'Lo Que Dicen Nuestros Clientes') }}</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="animate-item bg-white rounded-boutique-lg p-10 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300">
            <!-- Stars — subtle -->
            <div class="flex space-x-1 mb-6">
              <svg v-for="i in 5" :key="i" class="w-4 h-4 text-midnight-800/40" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-neutral-700 mb-8 leading-relaxed italic text-[1.02rem]">"{{ testimonial.content }}"</p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-midnight-800 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{ testimonial.initials }}
              </div>
              <div class="ml-4">
                <div class="font-semibold text-neutral-900 text-base">{{ testimonial.name }}</div>
                <div class="text-xs text-neutral-400 tracking-wide">{{ testimonial.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-14 md:py-24 lg:py-32 bg-midnight-800">
      <div class="container-custom">
        <!-- Header — centered -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-silver-300/85 font-semibold text-xs uppercase tracking-[0.2em] mb-6 block">{{ t('home.faq.label', 'Preguntas Frecuentes') }}</span>
          <h2 class="text-white mb-6 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.faq.title', 'Todo Sobre RENOLIT ALKORPLAN') }}</h2>
          <p class="text-silver-300 text-lg leading-relaxed">
            {{ t('home.faq.description', 'Resolvemos las dudas más comunes sobre la instalación de lámina armada en piscinas.') }}
          </p>
        </div>

        <!-- Accordion — single column, centered -->
        <div class="max-w-3xl mx-auto space-y-2">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="rounded-boutique overflow-hidden transition-all duration-300 border"
            :class="openFaq === index ? 'bg-charcoal-600/70 border-white/10' : 'bg-white/[0.05] border-white/5'"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-7 py-5 text-left flex items-center justify-between hover:bg-white/[0.08] transition-colors duration-300"
            >
              <span class="font-semibold text-white pr-4 text-sm md:text-[0.95rem]">{{ faq.question }}</span>
              <svg 
                class="w-4 h-4 text-silver-500 flex-shrink-0 transition-transform duration-400"
                :class="{ 'rotate-180': openFaq === index }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              v-show="openFaq === index"
              class="px-7 pb-6 text-silver-300 text-sm leading-relaxed"
            >
              <div class="w-12 h-px bg-white/10 mb-4"></div>
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section — Minimal, impactful -->
    <section class="relative py-24 sm:py-28 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Piscina"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover object-[55%_center] sm:object-center"
        />
        <div class="absolute inset-0 bg-midnight-800/80 backdrop-blur-sm"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-white mb-6 text-4xl md:text-[2.85rem] leading-tight">{{ t('home.cta.title', '¿Listo para Impermeabilizar tu Piscina?') }}</h2>
          <p class="text-silver-300 text-lg mb-12 leading-relaxed">
            {{ t('home.cta.description', 'Contáctanos hoy y recibe un presupuesto personalizado sin compromiso. Instalación profesional con garantía RENOLIT ALKORPLAN.') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/contacto" class="btn btn-white btn-lg">
              {{ t('home.cta.button_primary', 'Solicitar Presupuesto') }}
            </RouterLink>
            <a :href="phoneHref" class="btn btn-lg bg-transparent text-white border border-white/30 hover:bg-white/10">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ t('home.cta.button_secondary', 'Llamar Ahora') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, h, computed, nextTick, watch } from 'vue'
import { useSeo, useStructuredData } from '@/composables/useSeo'
import { useAnimations } from '@/composables/useAnimations'
import { useProjectsStore } from '@/stores/projects'
import { useServicesStore } from '@/stores/services'
import { useContent } from '@/composables/useContent'
import { useSiteConfig } from '@/composables/useSiteConfig'
import { resolveImageUrl } from '@/services/api'

// Content CMS
const { t } = useContent()
const { phone, phoneHref } = useSiteConfig()
const heroSeals = computed(() => ([
  t('home.hero.trust_1', 'Instaladores oficiales'),
  t('home.hero.trust_2', 'Garantía 15 años')
]))

// SEO
useSeo({
  title: 'ARG Piscinas | Instaladores Oficiales RENOLIT ALKORPLAN',
  description: 'Instaladores oficiales de RENOLIT ALKORPLAN. Especialistas en instalación de lámina armada para piscinas con garantía de 15 años. Presupuesto sin compromiso.',
  keywords: 'RENOLIT ALKORPLAN, instaladores oficiales, lámina armada piscinas, impermeabilización piscinas, membrana armada'
})

useStructuredData('localBusiness', {
  description: 'Instaladores oficiales de RENOLIT ALKORPLAN. Especialistas en lámina armada para piscinas.',
  phone: phone.value
})

// Projects store
const projectsStore = useProjectsStore()
const servicesStore = useServicesStore()

const featuredProjects = computed(() => {
  const featured = projectsStore.featuredProjects
  return featured.length > 0 ? featured.slice(0, 3) : projectsStore.projects.slice(0, 3)
})

const projectsTrackRef = ref(null)
const projectCardRefs = ref([])
const activeProjectIndex = ref(0)

const isProjectsMobileViewport = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 639px)').matches
}

const setProjectCardRef = (el, index) => {
  if (el) {
    projectCardRefs.value[index] = el
  }
}

const getClosestProjectIndex = () => {
  const track = projectsTrackRef.value
  if (!track || projectCardRefs.value.length === 0) return 0

  const currentScroll = track.scrollLeft
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  projectCardRefs.value.forEach((card, index) => {
    if (!card) return
    const distance = Math.abs(card.offsetLeft - currentScroll)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}

const handleProjectsScroll = () => {
  if (!isProjectsMobileViewport()) return
  activeProjectIndex.value = getClosestProjectIndex()
}

const scrollToProject = (index) => {
  const clampedIndex = Math.max(0, Math.min(index, featuredProjects.value.length - 1))
  const card = projectCardRefs.value[clampedIndex]
  if (!card) return

  card.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start'
  })
  activeProjectIndex.value = clampedIndex
}

const scrollProjectBy = (step) => {
  scrollToProject(activeProjectIndex.value + step)
}

const syncProjectsCarousel = async () => {
  await nextTick()
  projectCardRefs.value = projectCardRefs.value.slice(0, featuredProjects.value.length)

  if (!projectsTrackRef.value) return

  if (!isProjectsMobileViewport()) {
    activeProjectIndex.value = 0
    return
  }

  projectsTrackRef.value.scrollTo({ left: 0, behavior: 'auto' })
  handleProjectsScroll()
}

const handleProjectsViewportResize = () => {
  if (!isProjectsMobileViewport()) {
    activeProjectIndex.value = 0
    return
  }

  handleProjectsScroll()
}

// Animations
const { animateHero, animateOnScroll } = useAnimations()
const heroRef = ref(null)
const servicesRef = ref(null)
const benefitsRef = ref(null)

// FAQ state
const openFaq = ref(null)
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

onMounted(async () => {
  // Fetch real projects & featured services
  await Promise.all([
    projectsStore.fetchProjects(),
    servicesStore.fetchServices({ showOnHome: true })
  ])

  await syncProjectsCarousel()
  window.addEventListener('resize', handleProjectsViewportResize)

  // Hero animation
  animateHero(heroRef)
  
  // Scroll animations
  animateOnScroll('.animate-item')
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleProjectsViewportResize)
})

watch(featuredProjects, () => {
  syncProjectsCarousel()
})

// Data
const serviceIcons = {
  'instalacion-lamina-armada': {
    render() {
      return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
      ])
    }
  },
  'rehabilitacion-piscinas': {
    render() {
      return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
      ])
    }
  },
  'impermeabilizacion': {
    render() {
      return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
      ])
    }
  }
}

const GenericServiceIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z' })
    ])
  }
}

const services = computed(() => {
  return servicesStore.featuredServices.map(s => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
    icon: serviceIcons[s.slug] || GenericServiceIcon
  }))
})

const benefits = computed(() => [
  {
    title: t('home.benefits.benefit1_title', 'Certificación Oficial RENOLIT'),
    description: t('home.benefits.benefit1_desc', 'Somos instaladores certificados por RENOLIT, garantizando la calidad del trabajo.')
  },
  {
    title: t('home.benefits.benefit2_title', 'Materiales Premium Originales'),
    description: t('home.benefits.benefit2_desc', 'Utilizamos exclusivamente láminas RENOLIT ALKORPLAN originales de fábrica.')
  },
  {
    title: t('home.benefits.benefit3_title', 'Equipo Especializado'),
    description: t('home.benefits.benefit3_desc', 'Técnicos formados directamente por RENOLIT con las últimas técnicas.')
  },
  {
    title: t('home.benefits.benefit4_title', 'Garantía Escrita de 15 Años'),
    description: t('home.benefits.benefit4_desc', 'Respaldamos nuestro trabajo con la garantía oficial de RENOLIT ALKORPLAN.')
  }
])

const processSteps = computed(() => [
  {
    title: t('home.process.step1_title', 'Visita Técnica'),
    description: t('home.process.step1_desc', 'Evaluamos tu piscina y te asesoramos sobre la mejor solución.')
  },
  {
    title: t('home.process.step2_title', 'Presupuesto'),
    description: t('home.process.step2_desc', 'Elaboramos un presupuesto detallado sin compromiso.')
  },
  {
    title: t('home.process.step3_title', 'Instalación'),
    description: t('home.process.step3_desc', 'Nuestro equipo certificado realiza la instalación profesional.')
  },
  {
    title: t('home.process.step4_title', 'Garantía'),
    description: t('home.process.step4_desc', 'Te entregamos tu piscina con garantía escrita de 15 años.')
  }
])

// Helper to get project image
function getProjectImage(project) {
  if (project.featuredImage) return resolveImageUrl(project.featuredImage)
  if (project.images) {
    const imgs = typeof project.images === 'string' ? JSON.parse(project.images) : project.images
    if (Array.isArray(imgs) && imgs.length > 0) return resolveImageUrl(imgs[0])
  }
  return null
}

const testimonials = computed(() => [
  {
    name: t('home.testimonials.t1_name', 'Carlos Martínez'),
    location: t('home.testimonials.t1_location', 'Madrid'),
    content: t('home.testimonials.t1_content', 'Increíble transformación de nuestra piscina. El equipo fue profesional, puntual y el resultado superó nuestras expectativas.'),
    initials: t('home.testimonials.t1_name', 'CM').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  },
  {
    name: t('home.testimonials.t2_name', 'María García'),
    location: t('home.testimonials.t2_location', 'Valencia'),
    content: t('home.testimonials.t2_content', 'Después de años con problemas de fugas, por fin tenemos una piscina perfecta. El proceso fue rápido y limpio.'),
    initials: t('home.testimonials.t2_name', 'MG').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  },
  {
    name: t('home.testimonials.t3_name', 'Comunidad Los Olivos'),
    location: t('home.testimonials.t3_location', 'Barcelona'),
    content: t('home.testimonials.t3_content', 'Rehabilitaron nuestra piscina comunitaria en tiempo récord. La comunicación con la comunidad fue excelente.'),
    initials: t('home.testimonials.t3_name', 'LO').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
])

const faqs = computed(() => [
  {
    question: t('home.faq.q1', '¿Qué es la lámina armada RENOLIT ALKORPLAN?'),
    answer: t('home.faq.a1', 'RENOLIT ALKORPLAN es una membrana de PVC reforzada con malla de poliéster que garantiza la impermeabilización total de piscinas. Es el sistema más utilizado en Europa por su durabilidad, estética y facilidad de mantenimiento.')
  },
  {
    question: t('home.faq.q2', '¿Cuánto dura la garantía de la instalación?'),
    answer: t('home.faq.a2', 'Ofrecemos una garantía escrita de 15 años en todos nuestros trabajos de instalación con membrana RENOLIT ALKORPLAN. Esta garantía cubre tanto el material como la mano de obra de instalación.')
  },
  {
    question: t('home.faq.q3', '¿Se puede instalar sobre gresite existente?'),
    answer: t('home.faq.a3', 'Sí, una de las grandes ventajas de RENOLIT ALKORPLAN es que se puede instalar sobre cualquier superficie existente (gresite, cemento, fibra, etc.) sin necesidad de demoler, lo que reduce tiempos y costes.')
  },
  {
    question: t('home.faq.q4', '¿Cuánto tiempo tarda la instalación?'),
    answer: t('home.faq.a4', 'El tiempo de instalación depende del tamaño de la piscina. Una piscina residencial estándar suele completarse en 3-5 días. Durante el proceso, te mantenemos informado de cada avance.')
  },
  {
    question: t('home.faq.q5', '¿Qué mantenimiento requiere la lámina armada?'),
    answer: t('home.faq.a5', 'El mantenimiento es mínimo. Basta con mantener los niveles adecuados de cloro y pH del agua. La superficie lisa de ALKORPLAN evita la acumulación de algas y facilita la limpieza.')
  },
  {
    question: t('home.faq.q6', '¿Puedo elegir el color y diseño de la lámina?'),
    answer: t('home.faq.a6', 'Por supuesto. RENOLIT ALKORPLAN ofrece una amplia gama de colores y diseños: desde tonos lisos clásicos hasta imitaciones de mosaico, piedra o arena. Te asesoramos para elegir el que mejor se adapte a tu piscina.')
  },
  {
    question: t('home.faq.q7', '¿Por qué elegir un instalador oficial RENOLIT?'),
    answer: t('home.faq.a7', 'Los instaladores oficiales hemos recibido formación específica de RENOLIT y trabajamos exclusivamente con material original de fábrica. Esto garantiza que la instalación cumpla todos los estándares de calidad y puedas disfrutar de la garantía oficial.')
  }
])
</script>

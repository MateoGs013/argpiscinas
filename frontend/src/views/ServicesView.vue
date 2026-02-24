<template>
  <div>
    <!-- Hero -->
    <section class="relative py-40 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_TOUCH Elegance (22).jpg" 
          alt="Servicios de instalación de lámina armada"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-800 via-midnight-800/70 to-midnight-800/40"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Nuestros Servicios</span>
          <h1 class="text-white mb-8 leading-[1.1]">Instalación de RENOLIT ALKORPLAN</h1>
          <p class="text-lg text-silver-400 leading-relaxed max-w-xl">
            Como instaladores oficiales de RENOLIT ALKORPLAN, ofrecemos servicios especializados 
            de instalación de lámina armada para todo tipo de piscinas.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 gap-6">
          <RouterLink 
            v-for="service in services" 
            :key="service.slug"
            :to="`/servicios/${service.slug}`"
            class="group bg-white rounded-boutique-lg overflow-hidden border border-neutral-100 hover:shadow-xl transition-all duration-500"
          >
            <div class="aspect-video relative overflow-hidden">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-midnight-800/70 to-transparent"></div>
              <div class="absolute bottom-5 left-6 right-6">
                <h2 class="text-2xl font-bold text-white">{{ service.title }}</h2>
              </div>
            </div>
            <div class="p-8">
              <p class="text-neutral-600 mb-6 leading-relaxed">{{ service.description }}</p>
              <ul class="space-y-3 mb-8">
                <li v-for="feature in service.features" :key="feature" class="flex items-center text-sm text-neutral-500">
                  <svg class="w-4 h-4 text-midnight-800 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <span class="inline-flex items-center text-midnight-800 font-medium text-sm tracking-wide group-hover:text-charcoal-500 transition-colors">
                Ver más
                <svg class="w-4 h-4 ml-2 transform transition-transform duration-400 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- RENOLIT Collections -->
    <section class="section-padding bg-midnight-800">
      <div class="container-custom">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <span class="text-silver-400/60 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">Colecciones</span>
          <h2 class="text-white mb-6">Gama RENOLIT ALKORPLAN</h2>
          <p class="text-silver-400 text-lg leading-relaxed">
            Ofrecemos toda la gama de membranas RENOLIT ALKORPLAN para que elijas 
            el acabado perfecto para tu piscina.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-5">
          <div 
            v-for="collection in collections" 
            :key="collection.name" 
            class="group bg-charcoal-600/40 rounded-boutique-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
          >
            <!-- Main texture image -->
            <div class="aspect-[16/10] relative overflow-hidden">
              <img 
                :src="collection.heroImage" 
                :alt="collection.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-midnight-800/80 via-transparent to-transparent"></div>
              <!-- Collection badge -->
              <div class="absolute top-5 left-5">
                <span class="bg-white/10 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10">
                  {{ collection.type }}
                </span>
              </div>
              <!-- Collection name overlay -->
              <div class="absolute bottom-5 left-6 right-6">
                <h3 class="text-white font-bold text-lg">{{ collection.name }}</h3>
              </div>
            </div>

            <!-- Info + swatches -->
            <div class="p-6">
              <p class="text-silver-400 text-sm leading-relaxed mb-5">{{ collection.description }}</p>
              
              <!-- Texture swatches -->
              <div class="flex items-center gap-2">
                <div 
                  v-for="(swatch, i) in collection.swatches" 
                  :key="i"
                  class="w-9 h-9 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-300 cursor-pointer"
                >
                  <img :src="swatch.image" :alt="swatch.name" class="w-full h-full object-cover" />
                </div>
                <span v-if="collection.moreCount" class="text-silver-500 text-xs ml-1">+{{ collection.moreCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/RENOLIT_TOUCH_prestige_Haselhofer_02.jpg" 
          alt="Piscina RENOLIT ALKORPLAN"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-midnight-800/75"></div>
      </div>
      <div class="container-custom relative z-10 text-center">
        <img src="/Renolit/logo-RENOLIT-ALKORPLAN_blanc.png" alt="RENOLIT ALKORPLAN" class="w-44 h-auto mx-auto mb-8 no-filter" />
        <h2 class="text-white mb-6">¿Necesitas Asesoramiento?</h2>
        <p class="text-silver-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Te ayudamos a elegir la mejor solución RENOLIT ALKORPLAN para tu piscina. 
          Presupuesto sin compromiso.
        </p>
        <RouterLink to="/contacto" class="btn btn-white btn-lg">
          Contactar Ahora
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Servicios | Instalación RENOLIT ALKORPLAN',
  description: 'Servicios profesionales de instalación de lámina armada RENOLIT ALKORPLAN. Piscinas nuevas, rehabilitaciones e impermeabilización con garantía de 15 años.',
  keywords: 'instalación RENOLIT ALKORPLAN, lámina armada piscinas, rehabilitación piscinas, impermeabilización ALKORPLAN'
})

const services = [
  {
    slug: 'instalacion-lamina-armada',
    title: 'Piscinas Nuevas',
    description: 'Instalación de lámina armada RENOLIT ALKORPLAN en piscinas de nueva construcción. La mejor opción para garantizar la impermeabilización desde el primer día.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    features: [
      'Garantía oficial RENOLIT de 15 años',
      'Amplia gama de colores y diseños',
      'Instalación en cualquier forma de piscina',
      'Acabado estético premium'
    ]
  },
  {
    slug: 'rehabilitacion-piscinas',
    title: 'Rehabilitación de Piscinas',
    description: 'Renovación de piscinas existentes con membrana RENOLIT ALKORPLAN. Solución definitiva para piscinas con problemas de filtraciones o gresite deteriorado.',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    features: [
      'Se instala sobre cualquier superficie',
      'Elimina problemas de filtraciones',
      'Sin obras de demolición',
      'Instalación rápida y limpia'
    ]
  },
  {
    slug: 'impermeabilizacion',
    title: 'Impermeabilización',
    description: 'Solución 100% estanca para piscinas con problemas de fugas. RENOLIT ALKORPLAN es la única membrana que garantiza la impermeabilización total.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1475&q=80',
    features: [
      '100% estanqueidad garantizada',
      'Ideal para piscinas en azoteas',
      'Prevención de humedades',
      'Garantía escrita de 15 años'
    ]
  }
]

const collections = [
  {
    name: 'ALKORPLAN TOUCH',
    type: 'Premium 2mm',
    description: 'Texturas y relieves inspirados en la naturaleza. La colección más exclusiva de RENOLIT ALKORPLAN.',
    heroImage: '/Renolit/04. touch/RENOLIT_TOUCH-Vanity-06.jpg',
    swatches: [
      { name: 'Vanity', image: '/Renolit/04. touch/RENOLIT_TOUCH-Vanity-06.jpg' },
      { name: 'Relax', image: '/Renolit/04. touch/RENOLIT_TOUCH-Relax-06.jpg' },
      { name: 'Elegance', image: '/Renolit/04. touch/RENOLIT_TOUCH_elegance_09A7068.jpg' },
      { name: 'Sublime', image: '/Renolit/04. touch/RENOLIT_TOUCH-Sublime-06.jpg' },
    ],
    moreCount: 3
  },
  {
    name: 'ALKORPLAN VOGUE',
    type: 'Premium 2mm',
    description: 'Estampados contemporáneos inspirados en tendencias de diseño interior y moda.',
    heroImage: '/Renolit/05. vogue/RENOLIT_VOGUE_urban_09A4055.jpg',
    swatches: [
      { name: 'Urban', image: '/Renolit/05. vogue/RENOLIT_VOGUE_urban_09A4055.jpg' },
      { name: 'Vintage', image: '/Renolit/05. vogue/RENOLIT_VOGUE_vintage_09A4191.jpg' },
      { name: 'Summer', image: '/Renolit/05. vogue/RENOLIT_VOGUE_summer_09A2892.jpg' },
      { name: 'Tropical', image: '/Renolit/05. vogue/RENOLIT_VOGUE_tropical_JMLR8244B.jpg' },
    ],
    moreCount: 0
  },
  {
    name: 'ALKORPLAN CERAMICS',
    type: 'Premium 2mm',
    description: 'Efecto mosaico y piedra natural con relieve embosado. Elegancia clásica.',
    heroImage: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Selene.jpg',
    swatches: [
      { name: 'Selene', image: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Selene.jpg' },
      { name: 'Atenea', image: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Atenea.jpg' },
      { name: 'Etna', image: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Etna.jpg' },
    ],
    moreCount: 0
  },
  {
    name: 'ALKORPLAN RELIEF',
    type: 'Antideslizante',
    description: 'Superficie antideslizante certificada para zonas de baño y bordes de piscina.',
    heroImage: '/Renolit/07. relief/RENOLIT_RELIEF_azulclaro_AT2A6464.jpg',
    swatches: [
      { name: 'Azul Claro', image: '/Renolit/07. relief/RENOLIT_RELIEF_azulclaro_AT2A6464.jpg' },
      { name: 'Blanco', image: '/Renolit/07. relief/RENOLIT_RELIEF_blanco_AT2A6484.jpg' },
      { name: 'Arena', image: '/Renolit/07. relief/RENOLIT_RELIEF_arena_AT2A6420.jpg' },
      { name: 'Gris Claro', image: '/Renolit/07. relief/RENOLIT_RELIEF_grisclaro_AT2A6555.jpg' },
    ],
    moreCount: 4
  },
  {
    name: 'ALKORPLAN 2000',
    type: 'Estándar 1.5mm',
    description: 'Colores lisos lacados. La opción más popular y versátil del mercado.',
    heroImage: '/Renolit/01. 2000/RENOLIT_2000 light blue-6097-00016.jpg',
    swatches: [
      { name: 'Light Blue', image: '/Renolit/01. 2000/RENOLIT_2000 light blue-6097-00016.jpg' },
      { name: 'White', image: '/Renolit/01. 2000/RENOLIT_2000 white - 6097-00140.jpg' },
      { name: 'Sand', image: '/Renolit/01. 2000/RENOLIT_2000 sand - 6097-00058.jpg' },
      { name: 'Grey', image: '/Renolit/01. 2000/RENOLIT_2000 grey - 6097-00090.jpg' },
    ],
    moreCount: 4
  },
  {
    name: 'ALKORPLAN 3000',
    type: 'Estándar 1.5mm',
    description: 'Diseños estampados exclusivos con doble lacado. Efecto piedra y mármol.',
    heroImage: '/Renolit/02. 3000/RENOLIT_Marble-IMG_5913.jpg',
    swatches: [
      { name: 'Marble', image: '/Renolit/02. 3000/RENOLIT_Marble-IMG_5913.jpg' },
      { name: 'Carrara', image: '/Renolit/02. 3000/RENOLIT_Carrara-IMG_5941.jpg' },
      { name: 'Bysance Blue', image: '/Renolit/02. 3000/RENOLIT_Bysance Blue-IMG_5975.jpg' },
      { name: 'Persia Sand', image: '/Renolit/02. 3000/RENOLIT_Persia Sand-IMG_6001.jpg' },
    ],
    moreCount: 1
  }
]
</script>

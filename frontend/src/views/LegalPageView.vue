<template>
  <div>
    <section class="relative py-32 bg-midnight-800 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-midnight-900 via-midnight-800 to-charcoal-600"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-white mb-6 leading-[1.1]">{{ page.heading }}</h1>
          <p class="text-lg text-silver-400 leading-relaxed">{{ page.intro }}</p>
        </div>
      </div>
    </section>

    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto space-y-10">
          <article
            v-for="section in page.sections"
            :key="section.title"
            class="bg-white border border-neutral-100 rounded-boutique-lg p-8"
          >
            <h2 class="text-2xl text-neutral-900 mb-4">{{ section.title }}</h2>
            <p class="text-neutral-600 leading-relaxed">{{ section.content }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const page = computed(() => route.meta.legalPage || {
  heading: 'Información legal',
  intro: 'Contenido legal del sitio web.',
  sections: []
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-midnight-800 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-white/10 mb-4">404</h1>
      <h2 class="text-3xl font-bold text-white mb-4">Página no encontrada</h2>
      <p class="text-silver-400 mb-8 max-w-md mx-auto leading-relaxed">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <RouterLink to="/" class="btn btn-white">
        Volver al inicio
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Página no encontrada',
  description: 'La página que buscas no existe.'
})
</script>

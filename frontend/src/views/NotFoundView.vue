<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">Página no encontrada</h2>
      <p class="text-neutral-600 mb-8 max-w-md mx-auto">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <RouterLink to="/" class="btn btn-primary">
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

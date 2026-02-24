<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Skip to main content (accessibility) -->
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-midnight-800 focus:text-white focus:rounded-boutique"
    >
      Saltar al contenido principal
    </a>

    <!-- Public Layout -->
    <template v-if="!isAdminRoute">
      <AppHeader />
      <main id="main-content" class="flex-1">
        <RouterView v-slot="{ Component, route }">
          <Transition 
            :name="route.meta.transition || 'fade'" 
            mode="out-in"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </main>
      <AppFooter />
      <ScrollToTop />
    </template>

    <!-- Admin Layout -->
    <template v-else>
      <!-- Login page has its own layout -->
      <template v-if="isLoginPage">
        <RouterView />
      </template>
      <!-- Admin pages with sidebar layout -->
      <AdminLayout v-else-if="isAuthenticated">
        <RouterView />
      </AdminLayout>
      <!-- Redirect to login if not authenticated -->
      <RouterView v-else />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'
import gsap from 'gsap'

const route = useRoute()
const authStore = useAuthStore()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const isLoginPage = computed(() => route.path === '/admin/login')
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Page transition animations
const onBeforeEnter = (el) => {
  gsap.set(el, { opacity: 0, y: 20 })
}

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power2.out',
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done
  })
}
</script>

<style>
/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

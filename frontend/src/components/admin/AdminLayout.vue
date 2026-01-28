<template>
  <div class="min-h-screen bg-neutral-100">
    <!-- Admin Header -->
    <header class="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div class="flex items-center justify-between px-4 lg:px-6 h-16">
        <!-- Logo & Mobile Toggle -->
        <div class="flex items-center space-x-4">
          <button 
            @click="isSidebarOpen = !isSidebarOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg class="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <RouterLink to="/admin" class="flex items-center space-x-3">
            <div class="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span class="font-bold text-lg text-neutral-800 hidden sm:block">ARG Admin</span>
          </RouterLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-3">
          <RouterLink 
            to="/" 
            target="_blank"
            class="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Ver sitio</span>
          </RouterLink>

          <!-- User Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button 
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center space-x-3 p-2 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <div class="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl flex items-center justify-center font-semibold text-sm shadow-md">
                {{ userInitials }}
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium text-neutral-800">{{ user?.name }}</p>
                <p class="text-xs text-neutral-500">{{ user?.role }}</p>
              </div>
              <svg class="w-4 h-4 text-neutral-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div 
                v-if="isDropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50"
              >
                <div class="px-4 py-3 border-b border-neutral-100">
                  <p class="text-sm font-semibold text-neutral-900">{{ user?.name }}</p>
                  <p class="text-xs text-neutral-500">{{ user?.email }}</p>
                </div>
                <div class="py-1">
                  <button 
                    @click="handleLogout"
                    class="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside 
        class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 pt-16 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:pt-0"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <nav class="p-4 space-y-1">
          <p class="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Menú Principal</p>
          
          <RouterLink 
            v-for="item in menuItems" 
            :key="item.to"
            :to="item.to"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
            :class="isActive(item.to) 
              ? 'bg-primary-50 text-primary-700 font-medium shadow-sm' 
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'"
            @click="isSidebarOpen = false"
          >
            <div :class="[
              'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
              isActive(item.to) ? 'bg-primary-100' : 'bg-neutral-100'
            ]">
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <span>{{ item.label }}</span>
            <span 
              v-if="item.badge" 
              class="ml-auto px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </nav>

        <!-- Sidebar Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100">
          <div class="px-4 py-3 bg-neutral-50 rounded-xl">
            <p class="text-xs text-neutral-500">ARG Piscinas Admin</p>
            <p class="text-xs text-neutral-400">v1.0.0</p>
          </div>
        </div>
      </aside>

      <!-- Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isSidebarOpen"
          class="fixed inset-0 bg-black/50 z-20 lg:hidden"
          @click="isSidebarOpen = false"
        />
      </Transition>

      <!-- Main Content -->
      <main class="flex-1 p-4 lg:p-8 min-h-[calc(100vh-64px)] overflow-x-hidden">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onClickOutside } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const user = computed(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false
})

function isActive(path) {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

function handleLogout() {
  authStore.logout()
  router.push('/admin/login')
}

// Menu Icons as render functions
const DashboardIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' })
    ])
  }
}

const PostsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' })
    ])
  }
}

const CategoriesIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' })
    ])
  }
}

const TagsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' })
    ])
  }
}

const ProjectsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ])
  }
}

const ContactsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
    ])
  }
}

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: DashboardIcon },
  { to: '/admin/posts', label: 'Artículos', icon: PostsIcon },
  { to: '/admin/categorias', label: 'Categorías', icon: CategoriesIcon },
  { to: '/admin/tags', label: 'Tags', icon: TagsIcon },
  { to: '/admin/proyectos', label: 'Proyectos', icon: ProjectsIcon },
  { to: '/admin/contactos', label: 'Mensajes', icon: ContactsIcon }
]
</script>

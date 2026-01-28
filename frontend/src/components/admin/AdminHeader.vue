<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Admin Header -->
    <header class="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-4">
          <button 
            @click="isSidebarOpen = !isSidebarOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <RouterLink to="/admin" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="font-display font-bold text-lg hidden sm:block">ARG Admin</span>
          </RouterLink>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <RouterLink 
            to="/" 
            target="_blank"
            class="hidden sm:flex items-center space-x-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Ver sitio</span>
          </RouterLink>

          <div class="relative" ref="dropdownRef">
            <button 
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-medium text-sm">
                {{ userInitials }}
              </div>
              <span class="hidden sm:block text-sm font-medium text-neutral-700">{{ user?.name }}</span>
              <svg class="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1"
              >
                <div class="px-4 py-2 border-b border-neutral-100">
                  <p class="text-sm font-medium text-neutral-900">{{ user?.name }}</p>
                  <p class="text-xs text-neutral-500">{{ user?.email }}</p>
                </div>
                <button 
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside 
        class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <nav class="p-4 pt-20 lg:pt-4 space-y-1">
          <RouterLink 
            v-for="item in menuItems" 
            :key="item.to"
            :to="item.to"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive(item.to) ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-100'"
            @click="isSidebarOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <!-- Overlay -->
      <div 
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/50 z-20 lg:hidden"
        @click="isSidebarOpen = false"
      />

      <!-- Main Content -->
      <main class="flex-1 p-6 lg:p-8 min-h-[calc(100vh-73px)]">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h, onMounted, onUnmounted } from 'vue'
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

// Icons
const DashboardIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })
    ])
  }
}

const PostsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' })
    ])
  }
}

const CategoriesIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' })
    ])
  }
}

const TagsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z' })
    ])
  }
}

const ProjectsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ])
  }
}

const ContactsIcon = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
    ])
  }
}

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: DashboardIcon },
  { to: '/admin/posts', label: 'Posts', icon: PostsIcon },
  { to: '/admin/categories', label: 'Categorías', icon: CategoriesIcon },
  { to: '/admin/tags', label: 'Tags', icon: TagsIcon },
  { to: '/admin/projects', label: 'Proyectos', icon: ProjectsIcon },
  { to: '/admin/contacts', label: 'Contactos', icon: ContactsIcon }
]
</script>

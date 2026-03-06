<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center space-x-2 text-2xl font-bold text-primary-800">
          <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="currentColor"/>
            <path d="M12 28C12 22.477 16.477 18 22 18H28V22C28 27.523 23.523 32 18 32H12V28Z" fill="white"/>
            <circle cx="20" cy="14" r="6" fill="white" fill-opacity="0.5"/>
          </svg>
          <span>ARG Piscinas</span>
        </RouterLink>
      </div>

      <div class="card p-8">
        <h1 class="text-2xl font-bold text-neutral-900 text-center mb-6">Iniciar Sesión</h1>

        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
              Email
            </label>
            <input 
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input"
              placeholder="admin@argpiscinas.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
              Contraseña
            </label>
            <input 
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="btn btn-primary w-full"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-neutral-500">
          <RouterLink to="/" class="text-accent-600 hover:text-accent-700">
            ← Volver a la web
          </RouterLink>
        </p>
      </div>

      <p class="mt-6 text-center text-xs text-neutral-400">
        Panel de administración de ARG Piscinas
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const success = await authStore.login(form.email, form.password)
  
  if (success) {
    router.push('/admin')
  } else {
    error.value = authStore.error || 'Error al iniciar sesión. Verifica tus credenciales.'
  }
  
  loading.value = false
}
</script>

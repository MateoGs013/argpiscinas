<template>
  <div class="image-uploader">
    <!-- Preview de imagen existente -->
    <div 
      v-if="modelValue" 
      class="relative rounded-xl overflow-hidden group"
      :class="aspectClass"
    >
      <img 
        :src="fullImageUrl" 
        :alt="alt" 
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <label 
          class="px-4 py-2 bg-white text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Cambiar
          <input 
            type="file" 
            accept="image/*" 
            class="hidden" 
            @change="handleFileSelect"
          />
        </label>
        <button 
          @click="clearImage"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <svg class="w-5 h-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
      
      <!-- Indicador de subida -->
      <div v-if="uploading" class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-white mb-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-white text-sm">Subiendo...</span>
      </div>
    </div>

    <!-- Dropzone cuando no hay imagen -->
    <div v-else class="space-y-3">
      <label 
        class="block rounded-xl border-2 border-dashed transition-all cursor-pointer"
        :class="[
          aspectClass,
          isDragging 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50/50'
        ]"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <input 
          type="file" 
          accept="image/*" 
          class="hidden" 
          @change="handleFileSelect"
        />
        
        <div v-if="uploading" class="w-full h-full flex flex-col items-center justify-center">
          <svg class="animate-spin h-10 w-10 text-primary-500 mb-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-primary-600 font-medium">Subiendo imagen...</span>
        </div>
        
        <div v-else class="w-full h-full flex flex-col items-center justify-center p-6">
          <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-3">
            <svg class="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-neutral-700 font-medium text-center">
            <span class="text-primary-600">Haz clic para subir</span> o arrastra una imagen
          </p>
          <p class="text-neutral-400 text-sm mt-1">PNG, JPG, GIF o WebP (máx. 5MB)</p>
        </div>
      </label>

      <!-- Opción alternativa de URL -->
      <div v-if="allowUrl" class="flex items-center gap-2">
        <div class="flex-1 h-px bg-neutral-200"></div>
        <button 
          type="button"
          @click="showUrlInput = !showUrlInput"
          class="text-sm text-neutral-500 hover:text-primary-600 transition-colors"
        >
          {{ showUrlInput ? 'Ocultar' : '¿Usar URL externa?' }}
        </button>
        <div class="flex-1 h-px bg-neutral-200"></div>
      </div>

      <div v-if="showUrlInput && allowUrl" class="space-y-2">
        <input 
          v-model="urlInput"
          type="url"
          class="input"
          placeholder="https://ejemplo.com/imagen.jpg"
          @keyup.enter="useUrl"
        />
        <button 
          type="button"
          @click="useUrl"
          :disabled="!urlInput"
          class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200 w-full disabled:opacity-50"
        >
          Usar esta URL
        </button>
      </div>
    </div>

    <!-- Mensaje de error -->
    <p v-if="errorMessage" class="mt-2 text-sm text-red-500 flex items-center">
      <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorMessage }}
    </p>

    <!-- Tip -->
    <p v-if="tip && !modelValue" class="mt-2 text-xs text-neutral-500">
      💡 {{ tip }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '@/services/api'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  aspect: {
    type: String,
    default: 'video', // 'video' (16:9), 'square', 'portrait'
    validator: (v) => ['video', 'square', 'portrait'].includes(v)
  },
  allowUrl: {
    type: Boolean,
    default: true
  },
  tip: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Preview'
  }
})

const emit = defineEmits(['update:modelValue'])

const uploading = ref(false)
const isDragging = ref(false)
const errorMessage = ref('')
const showUrlInput = ref(false)
const urlInput = ref('')

const aspectClass = computed(() => {
  switch (props.aspect) {
    case 'square': return 'aspect-square'
    case 'portrait': return 'aspect-[3/4]'
    default: return 'aspect-video'
  }
})

const apiBaseUrl = computed(() => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3001'
})

const fullImageUrl = computed(() => {
  if (!props.modelValue) return ''
  // Si ya es una URL completa, devolverla tal cual
  if (props.modelValue.startsWith('http://') || props.modelValue.startsWith('https://')) {
    return props.modelValue
  }
  // Si es una ruta relativa (/uploads/...), añadir el base URL
  return `${apiBaseUrl.value}${props.modelValue}`
})

const handleFileSelect = async (event) => {
  const file = event.target.files?.[0]
  if (file) {
    await uploadFile(file)
  }
  // Limpiar input para permitir seleccionar el mismo archivo
  event.target.value = ''
}

const handleDrop = async (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files?.[0]
  if (file && file.type.startsWith('image/')) {
    await uploadFile(file)
  } else {
    errorMessage.value = 'Por favor, arrastra solo archivos de imagen'
  }
}

const uploadFile = async (file) => {
  // Validar tamaño (5MB)
  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value = 'La imagen es muy grande. Máximo 5MB.'
    return
  }

  // Validar tipo
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Tipo de archivo no permitido. Usa JPG, PNG, GIF o WebP.'
    return
  }

  uploading.value = true
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Emitir solo la ruta relativa (ej: /uploads/image-12345.jpg)
    emit('update:modelValue', response.data.url)
  } catch (error) {
    console.error('Error uploading image:', error)
    errorMessage.value = error.response?.data?.error || 'Error al subir la imagen. Inténtalo de nuevo.'
  } finally {
    uploading.value = false
  }
}

const useUrl = () => {
  if (urlInput.value.trim()) {
    emit('update:modelValue', urlInput.value.trim())
    urlInput.value = ''
    showUrlInput.value = false
  }
}

const clearImage = () => {
  emit('update:modelValue', '')
  errorMessage.value = ''
}

const handleImageError = (event) => {
  // Mostrar imagen placeholder cuando falla la carga
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagen no disponible%3C/text%3E%3C/svg%3E'
}
</script>

<style scoped>
.image-uploader label {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

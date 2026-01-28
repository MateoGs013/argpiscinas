<template>
  <div class="max-w-5xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <RouterLink to="/admin/proyectos" class="inline-flex items-center text-neutral-500 hover:text-primary-600 mb-2 transition-colors">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a proyectos
        </RouterLink>
        <h1 class="text-2xl font-bold text-neutral-900">
          {{ isEditing ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto' }}
        </h1>
      </div>
    </div>

    <!-- Progress Steps -->
    <div class="card p-4 mb-8">
      <div class="flex items-center justify-between">
        <button 
          v-for="(step, index) in steps" 
          :key="index"
          @click="currentStep = index"
          class="flex items-center space-x-3 px-4 py-2 rounded-xl transition-all"
          :class="currentStep === index 
            ? 'bg-primary-100 text-primary-700' 
            : stepCompleted(index) 
              ? 'text-green-600 hover:bg-green-50' 
              : 'text-neutral-400 hover:bg-neutral-50'"
        >
          <span 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
            :class="currentStep === index 
              ? 'bg-primary-600 text-white' 
              : stepCompleted(index) 
                ? 'bg-green-500 text-white' 
                : 'bg-neutral-200 text-neutral-500'"
          >
            <svg v-if="stepCompleted(index) && currentStep !== index" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span v-else>{{ index + 1 }}</span>
          </span>
          <span class="font-medium hidden sm:block">{{ step.name }}</span>
        </button>
      </div>
    </div>

    <!-- Step 1: Información Básica -->
    <div v-show="currentStep === 0" class="space-y-6">
      <div class="card p-6">
        <div class="flex items-center space-x-2 mb-6">
          <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-neutral-900">Información del Proyecto</h2>
            <p class="text-sm text-neutral-500">Datos básicos del trabajo realizado</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Título -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Nombre del proyecto *
            </label>
            <input 
              v-model="form.title"
              type="text"
              class="w-full px-4 py-4 text-xl font-medium border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Ej: Piscina Familiar en Chalet de Lujo"
              @input="autoGenerateSlug"
            />
            <p class="mt-2 text-sm text-neutral-500 flex items-center">
              <svg class="w-4 h-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Usa un nombre descriptivo que identifique el proyecto
            </p>
          </div>

          <!-- Tipo de trabajo -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-3">
              ¿Qué tipo de trabajo se realizó? *
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="cat in categories"
                :key="cat.value"
                type="button"
                @click="form.category = cat.value"
                class="p-4 rounded-xl border-2 text-center transition-all group"
                :class="form.category === cat.value 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-neutral-200 hover:border-neutral-300'"
              >
                <div 
                  class="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-colors"
                  :class="form.category === cat.value ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-400 group-hover:text-neutral-600'"
                >
                  <component :is="cat.icon" class="w-6 h-6" />
                </div>
                <span class="font-medium" :class="form.category === cat.value ? 'text-primary-700' : 'text-neutral-700'">
                  {{ cat.label }}
                </span>
              </button>
            </div>
          </div>

          <!-- Ubicación -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Ubicación del proyecto
            </label>
            <div class="relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                v-model="form.location"
                type="text"
                class="input pl-12"
                placeholder="Ej: Madrid, España"
              />
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Descripción del trabajo realizado
            </label>
            <textarea 
              v-model="form.description"
              rows="6"
              class="input resize-none"
              placeholder="Describe brevemente el proyecto:

- ¿Qué se hizo?
- ¿Qué materiales se usaron?
- ¿Cuáles fueron los retos?
- ¿Cuánto tiempo llevó?"
            ></textarea>
            <p class="mt-2 text-sm text-neutral-500">
              Una buena descripción ayuda a los clientes a entender tu trabajo
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="currentStep = 1" class="btn btn-primary">
          Continuar
          <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Step 2: Imágenes -->
    <div v-show="currentStep === 1" class="space-y-6">
      <div class="card p-6">
        <div class="flex items-center space-x-2 mb-6">
          <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-neutral-900">Galería de Fotos</h2>
            <p class="text-sm text-neutral-500">Las imágenes son lo más importante para mostrar tu trabajo</p>
          </div>
        </div>

        <!-- Imagen principal -->
        <div class="mb-8">
          <h3 class="font-semibold text-neutral-800 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Foto principal (portada)
          </h3>
          
          <div class="max-w-2xl">
            <ImageUploader 
              v-model="form.featuredImage"
              aspect="video"
              tip="Esta imagen aparecerá en la lista de proyectos"
            />
          </div>
        </div>

        <!-- Galería adicional -->
        <div>
          <h3 class="font-semibold text-neutral-800 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Más fotos del proyecto (opcional)
          </h3>
          
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div 
              v-for="(image, index) in form.images" 
              :key="index"
              class="relative aspect-square rounded-xl overflow-hidden group bg-neutral-100"
            >
              <img v-if="image" :src="getFullImageUrl(image)" alt="Gallery" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  @click="removeImage(index)"
                  class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Add button with file upload -->
            <label 
              class="aspect-square rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-all group cursor-pointer"
              :class="{ 'opacity-50 pointer-events-none': uploadingGallery }"
            >
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                @change="handleGalleryUpload"
                :disabled="uploadingGallery"
              />
              <svg v-if="!uploadingGallery" class="w-8 h-8 text-neutral-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <svg v-else class="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-sm text-neutral-500 group-hover:text-primary-600 mt-1">
                {{ uploadingGallery ? 'Subiendo...' : 'Añadir foto' }}
              </span>
            </label>
          </div>
          
          <p class="text-sm text-neutral-500">
            💡 Tip: Añade fotos del antes, durante y después del proyecto
          </p>
        </div>
      </div>

      <div class="flex justify-between">
        <button @click="currentStep = 0" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Anterior
        </button>
        <button @click="currentStep = 2" class="btn btn-primary">
          Continuar
          <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Step 3: Publicar -->
    <div v-show="currentStep === 2" class="space-y-6">
      <!-- Preview Card -->
      <div class="card p-6">
        <div class="flex items-center space-x-2 mb-6">
          <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-neutral-900">Vista Previa del Proyecto</h2>
            <p class="text-sm text-neutral-500">Así verán los clientes tu proyecto</p>
          </div>
        </div>

        <!-- Preview -->
        <div class="bg-neutral-50 rounded-xl p-6">
          <div class="max-w-lg mx-auto">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="aspect-video bg-neutral-200">
                <img 
                  v-if="form.featuredImage" 
                  :src="getFullImageUrl(form.featuredImage)" 
                  alt="Preview" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span v-if="form.category" class="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {{ form.category }}
                  </span>
                  <span v-if="form.featured" class="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    ⭐ Destacado
                  </span>
                </div>
                <h3 class="font-bold text-neutral-900">{{ form.title || 'Título del proyecto' }}</h3>
                <p v-if="form.location" class="text-sm text-neutral-500 flex items-center mt-1">
                  <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ form.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Options -->
      <div class="card p-6">
        <h3 class="font-bold text-neutral-900 mb-4">Opciones de publicación</h3>
        
        <label class="flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all"
          :class="form.featured ? 'border-amber-400 bg-amber-50' : 'border-neutral-200 hover:border-neutral-300'">
          <input 
            v-model="form.featured"
            type="checkbox"
            class="w-5 h-5 mt-0.5 text-amber-500 rounded border-neutral-300 focus:ring-amber-500"
          />
          <div class="ml-4">
            <span class="font-semibold text-neutral-900 flex items-center">
              <svg class="w-5 h-5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Marcar como proyecto destacado
            </span>
            <p class="text-sm text-neutral-500 mt-1">
              Los proyectos destacados aparecen primero en la web y en la página principal
            </p>
          </div>
        </label>
      </div>

      <!-- Checklist -->
      <div class="card p-6">
        <h3 class="font-bold text-neutral-900 mb-4">✅ Checklist antes de publicar</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3" :class="form.title ? 'text-green-600' : 'text-neutral-400'">
            <svg v-if="form.title" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Nombre del proyecto</span>
          </div>
          <div class="flex items-center space-x-3" :class="form.category ? 'text-green-600' : 'text-neutral-400'">
            <svg v-if="form.category" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tipo de trabajo</span>
          </div>
          <div class="flex items-center space-x-3" :class="form.featuredImage ? 'text-green-600' : 'text-amber-500'">
            <svg v-if="form.featuredImage" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Foto principal {{ form.featuredImage ? '' : '(muy recomendado)' }}</span>
          </div>
          <div class="flex items-center space-x-3" :class="form.description ? 'text-green-600' : 'text-amber-500'">
            <svg v-if="form.description" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Descripción {{ form.description ? '' : '(recomendado)' }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        <button @click="currentStep = 1" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200 order-2 sm:order-1">
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Anterior
        </button>
        
        <button 
          @click="saveProject" 
          :disabled="saving || !canPublish"
          class="btn btn-primary order-1 sm:order-2"
          :class="{ 'opacity-50 cursor-not-allowed': !canPublish }"
        >
          <span v-if="saving" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Guardando...
          </span>
          <span v-else class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isEditing ? 'Actualizar Proyecto' : 'Publicar Proyecto' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
    >
      <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-neutral-900 mb-2">¡Proyecto guardado!</h3>
          <p class="text-neutral-600 mb-6">Tu proyecto se ha guardado correctamente.</p>
          <RouterLink to="/admin/proyectos" class="btn btn-primary">
            Ver todos los proyectos
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import ImageUploader from '@/components/admin/ImageUploader.vue'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()

const currentStep = ref(0)
const saving = ref(false)
const showSuccess = ref(false)
const uploadingGallery = ref(false)

const steps = [
  { name: 'Información', key: 'info' },
  { name: 'Fotos', key: 'photos' },
  { name: 'Publicar', key: 'publish' }
]

// Icon components
const IconInstall = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
    ])
  }
}

const IconRehab = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
    ])
  }
}

const IconBuild = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
    ])
  }
}

const IconWater = {
  render() {
    return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ])
  }
}

const categories = [
  { value: 'Instalación', label: 'Instalación', icon: IconInstall },
  { value: 'Rehabilitación', label: 'Rehabilitación', icon: IconRehab },
  { value: 'Construcción', label: 'Construcción', icon: IconBuild },
  { value: 'Impermeabilización', label: 'Impermeab.', icon: IconWater }
]

const isEditing = computed(() => route.params.id && route.params.id !== 'nuevo')

const form = ref({
  title: '',
  slug: '',
  category: '',
  location: '',
  description: '',
  featuredImage: '',
  featured: false,
  images: []
})

const canPublish = computed(() => form.value.title && form.value.category)

const stepCompleted = (index) => {
  switch(index) {
    case 0: return form.value.title && form.value.category
    case 1: return form.value.featuredImage
    case 2: return false
    default: return false
  }
}

const autoGenerateSlug = () => {
  if (!isEditing.value && form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

const apiBaseUrl = computed(() => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3001'
})

const getFullImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${apiBaseUrl.value}${url}`
}

const handleGalleryUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Validar tamaño (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('La imagen es muy grande. Máximo 5MB.')
    return
  }

  // Validar tipo
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    alert('Tipo de archivo no permitido. Usa JPG, PNG, GIF o WebP.')
    return
  }

  uploadingGallery.value = true

  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    form.value.images.push(response.data.url)
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Error al subir la imagen. Inténtalo de nuevo.')
  } finally {
    uploadingGallery.value = false
    // Limpiar input
    event.target.value = ''
  }
}

const removeImage = (index) => {
  form.value.images.splice(index, 1)
}

const saveProject = async () => {
  saving.value = true
  
  try {
    const data = {
      ...form.value,
      images: form.value.images.filter(img => img && img.trim() !== '')
    }

    if (isEditing.value) {
      await projectsStore.updateProject(route.params.id, data)
    } else {
      await projectsStore.createProject(data)
    }

    showSuccess.value = true
    setTimeout(() => router.push('/admin/proyectos'), 1500)
  } catch (error) {
    console.error('Error saving project:', error)
    alert('Error al guardar. Por favor, inténtalo de nuevo.')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  if (isEditing.value) {
    await projectsStore.fetchProjectById(route.params.id)
    const project = projectsStore.currentProject
    if (project) {
      form.value = {
        title: project.title,
        slug: project.slug,
        category: project.category || '',
        location: project.location || '',
        description: project.description || '',
        featuredImage: project.featuredImage || '',
        featured: project.featured || false,
        images: project.images || []
      }
    }
  }
})
</script>

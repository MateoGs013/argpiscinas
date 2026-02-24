<template>
  <div class="max-w-5xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <RouterLink to="/admin/posts" class="inline-flex items-center text-neutral-500 hover:text-primary-900 mb-2 transition-colors">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a artículos
        </RouterLink>
        <h1 class="text-2xl font-bold text-neutral-900">
          {{ isEditing ? 'Editar Artículo' : 'Escribir Nuevo Artículo' }}
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
            ? 'bg-primary-200 text-primary-800' 
            : stepCompleted(index) 
              ? 'text-green-600 hover:bg-green-50' 
              : 'text-neutral-400 hover:bg-neutral-50'"
        >
          <span 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
            :class="currentStep === index 
              ? 'bg-primary-800 text-white' 
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

    <!-- Step 1: Contenido Principal -->
    <div v-show="currentStep === 0" class="space-y-6">
      <div class="card p-6">
        <div class="flex items-center space-x-2 mb-6">
          <div class="w-10 h-10 bg-primary-200 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-neutral-900">Contenido del Artículo</h2>
            <p class="text-sm text-neutral-500">Escribe el título y el contenido principal</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Título -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Título del artículo *
            </label>
            <input 
              v-model="form.title"
              type="text"
              class="w-full px-4 py-4 text-xl font-medium border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all"
              placeholder="Ej: 5 consejos para mantener tu piscina en verano"
              @input="autoGenerateSEO"
            />
            <p class="mt-2 text-sm text-neutral-500 flex items-center">
              <svg class="w-4 h-4 mr-1 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Un buen título describe claramente de qué trata el artículo
            </p>
          </div>

          <!-- Contenido con editor visual básico -->
          <div>
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Contenido *
            </label>
            
            <!-- Toolbar del editor -->
            <div class="flex flex-wrap items-center gap-1 p-2 bg-neutral-50 border border-b-0 border-neutral-200 rounded-t-xl">
              <button 
                type="button"
                @click="insertFormat('h2')"
                class="p-2 rounded-lg hover:bg-neutral-50 hover:shadow-sm transition-all"
                title="Título de sección"
              >
                <span class="font-bold text-sm">H2</span>
              </button>
              <button 
                type="button"
                @click="insertFormat('h3')"
                class="p-2 rounded-lg hover:bg-neutral-50 hover:shadow-sm transition-all"
                title="Subtítulo"
              >
                <span class="font-bold text-sm">H3</span>
              </button>
              <div class="w-px h-6 bg-neutral-200 mx-1"></div>
              <button 
                type="button"
                @click="insertFormat('bold')"
                class="p-2 rounded-lg hover:bg-neutral-50 hover:shadow-sm transition-all"
                title="Negrita"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                  <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                </svg>
              </button>
              <button 
                type="button"
                @click="insertFormat('italic')"
                class="p-2 rounded-lg hover:bg-neutral-50 hover:shadow-sm transition-all"
                title="Cursiva"
              >
                <span class="italic font-serif text-lg">I</span>
              </button>
              <div class="w-px h-6 bg-neutral-200 mx-1"></div>
              <button 
                type="button"
                @click="insertFormat('ul')"
                class="p-2 rounded-lg hover:bg-neutral-50 hover:shadow-sm transition-all"
                title="Lista con viñetas"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button 
                type="button"
                @click="insertFormat('link')"
                class="p-2 rounded-lg hover:bg-neutral-50 hover:shadow-sm transition-all"
                title="Insertar enlace"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
            
            <textarea 
              ref="contentTextarea"
              v-model="form.content"
              rows="15"
              class="w-full px-4 py-4 border border-neutral-200 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all resize-none"
              placeholder="Escribe aquí el contenido de tu artículo...

Puedes usar los botones de arriba para dar formato al texto.

Ejemplo de estructura:
- Introduce el tema
- Explica los puntos principales
- Da consejos prácticos
- Concluye con una llamada a la acción"
            ></textarea>
            
            <div class="mt-2 flex items-start space-x-4 text-sm text-neutral-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ wordCount }} palabras
              </div>
              <div class="flex items-center" :class="wordCount >= 300 ? 'text-green-600' : 'text-amber-500'">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ wordCount >= 300 ? '¡Buen contenido!' : 'Recomendado: mín. 300 palabras' }}
              </div>
            </div>
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

    <!-- Step 2: Imagen y Categoría -->
    <div v-show="currentStep === 1" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Imagen destacada -->
        <div class="card p-6">
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-neutral-900">Imagen Principal</h2>
              <p class="text-sm text-neutral-500">Aparece en la portada del artículo</p>
            </div>
          </div>

          <ImageUploader 
            v-model="form.featuredImage"
            aspect="video"
            tip="Puedes subir una imagen desde tu ordenador o usar una URL externa"
          />
        </div>

        <!-- Categoría y etiquetas -->
        <div class="card p-6">
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-neutral-900">Organización</h2>
              <p class="text-sm text-neutral-500">Categoría y etiquetas</p>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                ¿De qué trata el artículo?
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  type="button"
                  @click="form.categoryId = cat.id"
                  class="p-3 rounded-xl border-2 text-left transition-all"
                  :class="form.categoryId === cat.id 
                    ? 'border-primary-700 bg-neutral-50 text-primary-700' 
                    : 'border-neutral-200 hover:border-neutral-300'"
                >
                  <span class="font-medium">{{ cat.name }}</span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Etiquetas (opcional)
              </label>
              <div class="flex flex-wrap gap-2 mb-3">
                <button
                  v-for="tag in tags"
                  :key="tag.id"
                  type="button"
                  @click="toggleTag(tag.id)"
                  class="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  :class="form.tagIds.includes(tag.id)
                    ? 'bg-primary-800 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'"
                >
                  {{ tag.name }}
                </button>
              </div>
              <p class="text-xs text-neutral-500">
                Las etiquetas ayudan a los lectores a encontrar artículos relacionados
              </p>
            </div>
          </div>
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

    <!-- Step 3: Revisión y Publicación -->
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
            <h2 class="text-lg font-bold text-neutral-900">Vista Previa</h2>
            <p class="text-sm text-neutral-500">Así se verá tu artículo en Google</p>
          </div>
        </div>

        <!-- Google Preview -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6">
          <p class="text-xs text-neutral-500 mb-2">Vista previa en buscadores:</p>
          <div class="space-y-1">
            <p class="text-blue-700 text-lg hover:underline cursor-pointer">
              {{ seoTitle || 'Título del artículo' }}
            </p>
            <p class="text-green-700 text-sm">
              argpiscinas.com › blog › {{ form.slug || 'url-del-articulo' }}
            </p>
            <p class="text-neutral-600 text-sm line-clamp-2">
              {{ seoDescription || 'La descripción del artículo aparecerá aquí...' }}
            </p>
          </div>
        </div>

        <!-- SEO Auto-generado con toggle para editar -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-neutral-700 flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              SEO optimizado automáticamente
            </span>
            <button 
              type="button"
              @click="showSeoOptions = !showSeoOptions"
              class="text-sm text-accent-600 hover:text-accent-700"
            >
              {{ showSeoOptions ? 'Ocultar opciones' : 'Personalizar' }}
            </button>
          </div>

          <div v-if="showSeoOptions" class="space-y-4 p-4 bg-neutral-50 rounded-xl">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Título para Google
              </label>
              <input 
                v-model="form.metaTitle"
                type="text"
                class="input"
                :placeholder="autoMetaTitle"
              />
              <div class="mt-1 flex justify-between text-xs">
                <span class="text-neutral-500">Déjalo vacío para usar el automático</span>
                <span :class="(form.metaTitle || autoMetaTitle).length > 60 ? 'text-red-500' : 'text-green-500'">
                  {{ (form.metaTitle || autoMetaTitle).length }}/60
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Descripción para Google
              </label>
              <textarea 
                v-model="form.metaDescription"
                rows="2"
                class="input resize-none"
                :placeholder="autoMetaDescription"
              ></textarea>
              <div class="mt-1 flex justify-between text-xs">
                <span class="text-neutral-500">Déjalo vacío para usar el automático</span>
                <span :class="(form.metaDescription || autoMetaDescription).length > 160 ? 'text-red-500' : 'text-green-500'">
                  {{ (form.metaDescription || autoMetaDescription).length }}/160
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                URL del artículo
              </label>
              <div class="flex">
                <span class="inline-flex items-center px-4 bg-neutral-200 border border-r-0 border-neutral-300 rounded-l-xl text-neutral-500 text-sm">
                  /blog/
                </span>
                <input 
                  v-model="form.slug"
                  type="text"
                  class="input rounded-l-none"
                  placeholder="url-del-articulo"
                />
              </div>
            </div>
          </div>
        </div>
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
            <span>Título del artículo</span>
          </div>
          <div class="flex items-center space-x-3" :class="wordCount >= 100 ? 'text-green-600' : 'text-neutral-400'">
            <svg v-if="wordCount >= 100" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Contenido suficiente ({{ wordCount }} palabras)</span>
          </div>
          <div class="flex items-center space-x-3" :class="form.featuredImage ? 'text-green-600' : 'text-amber-500'">
            <svg v-if="form.featuredImage" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Imagen principal {{ form.featuredImage ? '' : '(recomendado)' }}</span>
          </div>
          <div class="flex items-center space-x-3" :class="form.categoryId ? 'text-green-600' : 'text-amber-500'">
            <svg v-if="form.categoryId" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Categoría {{ form.categoryId ? '' : '(recomendado)' }}</span>
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
        
        <div class="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
          <button 
            @click="saveDraft" 
            :disabled="saving"
            class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Guardar borrador
          </button>
          <button 
            @click="publish" 
            :disabled="saving || !canPublish"
            class="btn btn-primary"
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
              {{ isEditing ? 'Actualizar' : 'Publicar' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
    >
      <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-neutral-50 rounded-2xl p-8 max-w-md mx-4 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-neutral-900 mb-2">¡Artículo guardado!</h3>
          <p class="text-neutral-600 mb-6">Tu artículo se ha guardado correctamente.</p>
          <RouterLink to="/admin/posts" class="btn btn-primary">
            Ver todos los artículos
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useCategoriesStore } from '@/stores/categories'
import { useTagsStore } from '@/stores/tags'
import ImageUploader from '@/components/admin/ImageUploader.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const categoriesStore = useCategoriesStore()
const tagsStore = useTagsStore()

const contentTextarea = ref(null)
const currentStep = ref(0)
const showSeoOptions = ref(false)
const saving = ref(false)
const showSuccess = ref(false)

const steps = [
  { name: 'Contenido', key: 'content' },
  { name: 'Imagen', key: 'image' },
  { name: 'Publicar', key: 'publish' }
]

const isEditing = computed(() => route.params.id && route.params.id !== 'nuevo')

const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  categoryId: '',
  tagIds: [],
  metaTitle: '',
  metaDescription: '',
  published: false
})

const categories = computed(() => categoriesStore.categories)
const tags = computed(() => tagsStore.tags)

const wordCount = computed(() => {
  const text = form.value.content.replace(/<[^>]*>/g, ' ').trim()
  if (!text) return 0
  return text.split(/\s+/).filter(w => w.length > 0).length
})

const autoMetaTitle = computed(() => {
  if (!form.value.title) return ''
  const title = form.value.title
  return title.length > 50 ? title.substring(0, 50) + '...' : title + ' | ARG Piscinas'
})

const autoMetaDescription = computed(() => {
  if (!form.value.content) return ''
  const text = form.value.content.replace(/<[^>]*>/g, ' ').trim()
  return text.length > 155 ? text.substring(0, 155) + '...' : text
})

const seoTitle = computed(() => form.value.metaTitle || autoMetaTitle.value)
const seoDescription = computed(() => form.value.metaDescription || autoMetaDescription.value)

const canPublish = computed(() => form.value.title && form.value.content && wordCount.value >= 50)

const stepCompleted = (index) => {
  switch(index) {
    case 0: return form.value.title && form.value.content
    case 1: return true
    case 2: return false
    default: return false
  }
}

const autoGenerateSEO = () => {
  if (!isEditing.value && form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

const toggleTag = (tagId) => {
  const index = form.value.tagIds.indexOf(tagId)
  if (index === -1) {
    form.value.tagIds.push(tagId)
  } else {
    form.value.tagIds.splice(index, 1)
  }
}

const insertFormat = (format) => {
  const textarea = contentTextarea.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = form.value.content.substring(start, end)
  
  let insertText = ''
  
  switch(format) {
    case 'h2':
      insertText = `<h2>${selectedText || 'Título de sección'}</h2>\n`
      break
    case 'h3':
      insertText = `<h3>${selectedText || 'Subtítulo'}</h3>\n`
      break
    case 'bold':
      insertText = `<strong>${selectedText || 'texto en negrita'}</strong>`
      break
    case 'italic':
      insertText = `<em>${selectedText || 'texto en cursiva'}</em>`
      break
    case 'ul':
      insertText = `\n<ul>\n  <li>${selectedText || 'Elemento 1'}</li>\n  <li>Elemento 2</li>\n</ul>\n`
      break
    case 'link':
      const url = prompt('URL del enlace:', 'https://')
      if (url) insertText = `<a href="${url}">${selectedText || 'texto del enlace'}</a>`
      break
  }
  
  if (insertText) {
    form.value.content = form.value.content.substring(0, start) + insertText + form.value.content.substring(end)
  }
}

const saveDraft = async () => {
  form.value.published = false
  await savePost()
}

const publish = async () => {
  form.value.published = true
  await savePost()
}

const savePost = async () => {
  saving.value = true
  
  try {
    const data = {
      title: form.value.title,
      slug: form.value.slug,
      excerpt: form.value.excerpt,
      content: form.value.content,
      featuredImage: form.value.featuredImage,
      seoTitle: form.value.metaTitle || autoMetaTitle.value,
      seoDescription: form.value.metaDescription || autoMetaDescription.value,
      status: form.value.published ? 'PUBLISHED' : 'DRAFT',
      categoryIds: form.value.categoryId ? [parseInt(form.value.categoryId)] : [],
      tagIds: form.value.tagIds.map(id => parseInt(id))
    }

    if (isEditing.value) {
      await postsStore.updatePost(route.params.id, data)
    } else {
      await postsStore.createPost(data)
    }

    showSuccess.value = true
    setTimeout(() => router.push('/admin/posts'), 1500)
  } catch (error) {
    console.error('Error saving post:', error)
    alert('Error al guardar. Por favor, inténtalo de nuevo.')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    categoriesStore.fetchCategories(),
    tagsStore.fetchTags()
  ])

  if (isEditing.value) {
    await postsStore.fetchPostById(route.params.id)
    const post = postsStore.currentPost
    if (post) {
      form.value = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content || '',
        featuredImage: post.featuredImage || '',
        categoryId: post.categories?.[0]?.id || '',
        tagIds: post.tags?.map(t => t.id) || [],
        metaTitle: post.seoTitle || '',
        metaDescription: post.seoDescription || '',
        published: post.status === 'PUBLISHED'
      }
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Contenido del Sitio</h1>
        <p class="text-neutral-500 text-sm mt-1">Edita los textos de las páginas públicas</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          v-if="hasChanges"
          @click="discardChanges"
          class="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
        >
          Descartar cambios
        </button>
        <button
          @click="saveAll"
          :disabled="!hasChanges || saving"
          class="px-6 py-2.5 text-sm font-medium text-white bg-primary-800 rounded-xl hover:bg-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="successMessage" class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
        <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-green-700">{{ successMessage }}</p>
      </div>
    </Transition>

    <!-- Error Message -->
    <div v-if="errorMsg" class="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
      <svg class="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p class="text-sm text-amber-700">{{ errorMsg }}</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="flex items-center gap-3 text-neutral-500">
        <svg class="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75" />
        </svg>
        <span>Cargando contenido...</span>
      </div>
    </div>

    <!-- Search -->
    <div v-if="!loading" class="relative">
      <svg class="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar contenido por nombre o clave..."
        class="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
      />
    </div>

    <!-- Sections -->
    <div v-if="!loading" class="space-y-4">
      <div
        v-for="(items, sectionKey) in filteredSections"
        :key="sectionKey"
        class="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
      >
        <!-- Section Header -->
        <button
          @click="toggleSection(sectionKey)"
          class="w-full flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="getSectionColor(sectionKey)">
              <component :is="getSectionIcon(sectionKey)" class="w-4 h-4" />
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-neutral-900">{{ sectionLabels[sectionKey] || sectionKey }}</h3>
              <p class="text-xs text-neutral-400">{{ items.length }} campo{{ items.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="sectionHasChanges(sectionKey, items)" class="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              Modificado
            </span>
            <svg
              class="w-5 h-5 text-neutral-400 transition-transform duration-300"
              :class="{ 'rotate-180': openSections.includes(sectionKey) }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <!-- Section Content -->
        <div v-show="openSections.includes(sectionKey)" class="border-t border-neutral-100">
          <div class="divide-y divide-neutral-100">
            <div
              v-for="item in items"
              :key="item.key"
              class="px-6 py-5"
            >
              <div class="flex items-start justify-between gap-4 mb-2">
                <label :for="item.key" class="block text-sm font-medium text-neutral-700">
                  {{ item.label }}
                </label>
                <span class="text-[10px] text-neutral-400 font-mono bg-neutral-100 px-2 py-0.5 rounded flex-shrink-0">
                  {{ item.key }}
                </span>
              </div>
              
              <!-- Text Input -->
              <input
                v-if="item.type === 'text'"
                :id="item.key"
                v-model="editedValues[item.key]"
                type="text"
                :maxlength="getMaxLength(item)"
                class="w-full px-4 py-2.5 border rounded-xl text-sm transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :class="isChanged(item.key) ? 'border-amber-300 bg-amber-50/50' : 'border-neutral-200 bg-white'"
              />

              <!-- Textarea -->
              <textarea
                v-else-if="item.type === 'textarea' || item.type === 'html'"
                :id="item.key"
                v-model="editedValues[item.key]"
                :rows="item.type === 'html' ? 8 : 4"
                :maxlength="getMaxLength(item)"
                class="w-full px-4 py-2.5 border rounded-xl text-sm transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                :class="isChanged(item.key) ? 'border-amber-300 bg-amber-50/50' : 'border-neutral-200 bg-white'"
              />

              <!-- Char count + Changed indicator -->
              <div class="flex items-center justify-between mt-1.5">
                <div v-if="isChanged(item.key)" class="flex items-center gap-2">
                  <span class="text-xs text-amber-600">Modificado</span>
                  <button
                    @click="resetField(item.key)"
                    class="text-xs text-neutral-500 hover:text-neutral-700 underline"
                  >
                    Restaurar
                  </button>
                </div>
                <div v-else></div>
                <span class="text-[11px] tabular-nums" :class="charCountClass(item)">
                  {{ (editedValues[item.key] || '').length }} / {{ getMaxLength(item) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="Object.keys(filteredSections).length === 0 && searchQuery" class="text-center py-16">
        <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-neutral-500">No se encontraron resultados para "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import api from '@/services/api'

const loading = ref(true)
const saving = ref(false)
const errorMsg = ref(null)
const successMessage = ref('')
const searchQuery = ref('')
const openSections = ref([])
const editedValues = ref({})
const originalValues = ref({})
const localSections = ref({})

const sectionLabels = {
  'home.hero': 'Inicio — Hero',
  'home.renolit': 'Inicio — RENOLIT ALKORPLAN',
  'home.services': 'Inicio — Servicios',
  'home.benefits': 'Inicio — Beneficios',
  'home.process': 'Inicio — Proceso',
  'home.projects': 'Inicio — Proyectos Destacados',
  'home.testimonials': 'Inicio — Testimonios',
  'home.faq': 'Inicio — Preguntas Frecuentes',
  'home.cta': 'Inicio — CTA Final',
  'about': 'Nosotros',
  'services': 'Servicios (General)',
  'services.installation': 'Servicio — Instalación',
  'services.rehabilitation': 'Servicio — Rehabilitación',
  'services.waterproofing': 'Servicio — Impermeabilización',
  'contact': 'Contacto',
  'projects': 'Proyectos',
  'blog': 'Blog'
}

// ===== DEFAULT CONTENT (used when API is not available) =====
const defaultContent = [
  // HOME — HERO
  { key: 'home.hero.title', value: 'La mejor lámina, bien instalada.', section: 'home.hero', label: 'Título principal', type: 'text' },
  { key: 'home.hero.subtitle', value: 'RENOLIT ALKORPLAN resuelve filtraciones e impermeabilización de una vez. Sin intermediarios.', section: 'home.hero', label: 'Subtítulo', type: 'textarea' },
  { key: 'home.hero.cta_primary', value: 'Pedir Presupuesto', section: 'home.hero', label: 'Botón principal', type: 'text' },
  { key: 'home.hero.cta_secondary', value: 'Ver Proyectos', section: 'home.hero', label: 'Botón secundario', type: 'text' },
  { key: 'home.hero.trust_1', value: 'Instaladores oficiales', section: 'home.hero', label: 'Confianza — Texto 1', type: 'text' },
  { key: 'home.hero.trust_2', value: 'Garantía 15 años', section: 'home.hero', label: 'Confianza — Texto 2', type: 'text' },
  // HOME — RENOLIT
  { key: 'home.renolit.label', value: '¿Por qué RENOLIT ALKORPLAN?', section: 'home.renolit', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.renolit.title', value: 'La Mejor Lámina Armada del Mercado', section: 'home.renolit', label: 'Título', type: 'text' },
  { key: 'home.renolit.description', value: 'RENOLIT ALKORPLAN es la membrana armada más utilizada en el mundo para el revestimiento de piscinas. Como instaladores oficiales certificados, garantizamos una instalación profesional con materiales de primera calidad.', section: 'home.renolit', label: 'Descripción', type: 'textarea' },
  { key: 'home.renolit.feature1_title', value: '100% Estanqueidad Garantizada', section: 'home.renolit', label: 'Característica 1 — Título', type: 'text' },
  { key: 'home.renolit.feature1_desc', value: 'Impermeabilización total con garantía escrita de 15 años.', section: 'home.renolit', label: 'Característica 1 — Descripción', type: 'text' },
  { key: 'home.renolit.feature2_title', value: 'Resistencia UV Superior', section: 'home.renolit', label: 'Característica 2 — Título', type: 'text' },
  { key: 'home.renolit.feature2_desc', value: 'Protección lacada contra rayos UV y envejecimiento prematuro.', section: 'home.renolit', label: 'Característica 2 — Descripción', type: 'text' },
  { key: 'home.renolit.feature3_title', value: 'Amplia Gama de Diseños', section: 'home.renolit', label: 'Característica 3 — Título', type: 'text' },
  { key: 'home.renolit.feature3_desc', value: 'Colecciones TOUCH, VOGUE, CERAMICS y más para personalizar tu piscina.', section: 'home.renolit', label: 'Característica 3 — Descripción', type: 'text' },
  { key: 'home.renolit.link_text', value: 'Conocer más sobre RENOLIT ALKORPLAN', section: 'home.renolit', label: 'Texto del enlace externo', type: 'text' },
  // HOME — SERVICES
  { key: 'home.services.label', value: 'Nuestros Servicios', section: 'home.services', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.services.title', value: 'Soluciones con RENOLIT ALKORPLAN', section: 'home.services', label: 'Título', type: 'text' },
  { key: 'home.services.description', value: 'Como instaladores oficiales, ofrecemos servicios especializados de instalación de lámina armada RENOLIT ALKORPLAN para todo tipo de piscinas.', section: 'home.services', label: 'Descripción', type: 'textarea' },
  { key: 'home.services.service1_title', value: 'Instalación en Piscinas Nuevas', section: 'home.services', label: 'Servicio 1 — Título', type: 'text' },
  { key: 'home.services.service1_desc', value: 'Instalación de lámina armada RENOLIT ALKORPLAN en piscinas de nueva construcción.', section: 'home.services', label: 'Servicio 1 — Descripción', type: 'text' },
  { key: 'home.services.service2_title', value: 'Rehabilitación de Piscinas', section: 'home.services', label: 'Servicio 2 — Título', type: 'text' },
  { key: 'home.services.service2_desc', value: 'Renovación de piscinas existentes con membrana RENOLIT ALKORPLAN.', section: 'home.services', label: 'Servicio 2 — Descripción', type: 'text' },
  { key: 'home.services.service3_title', value: 'Impermeabilización Total', section: 'home.services', label: 'Servicio 3 — Título', type: 'text' },
  { key: 'home.services.service3_desc', value: 'Solución definitiva contra filtraciones con garantía escrita de 15 años.', section: 'home.services', label: 'Servicio 3 — Descripción', type: 'text' },
  // HOME — BENEFITS
  { key: 'home.benefits.label', value: '¿Por qué elegirnos?', section: 'home.benefits', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.benefits.title', value: 'Instaladores Oficiales Certificados', section: 'home.benefits', label: 'Título', type: 'text' },
  { key: 'home.benefits.description', value: 'Como instaladores oficiales de RENOLIT ALKORPLAN, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.', section: 'home.benefits', label: 'Descripción', type: 'textarea' },
  { key: 'home.benefits.stat_value', value: '15 años', section: 'home.benefits', label: 'Estadística — Valor', type: 'text' },
  { key: 'home.benefits.stat_label', value: 'Garantía escrita RENOLIT', section: 'home.benefits', label: 'Estadística — Etiqueta', type: 'text' },
  { key: 'home.benefits.benefit1_title', value: 'Certificación Oficial RENOLIT', section: 'home.benefits', label: 'Beneficio 1 — Título', type: 'text' },
  { key: 'home.benefits.benefit1_desc', value: 'Somos instaladores certificados por RENOLIT, garantizando la calidad del trabajo.', section: 'home.benefits', label: 'Beneficio 1 — Descripción', type: 'text' },
  { key: 'home.benefits.benefit2_title', value: 'Materiales Premium Originales', section: 'home.benefits', label: 'Beneficio 2 — Título', type: 'text' },
  { key: 'home.benefits.benefit2_desc', value: 'Utilizamos exclusivamente láminas RENOLIT ALKORPLAN originales de fábrica.', section: 'home.benefits', label: 'Beneficio 2 — Descripción', type: 'text' },
  { key: 'home.benefits.benefit3_title', value: 'Equipo Especializado', section: 'home.benefits', label: 'Beneficio 3 — Título', type: 'text' },
  { key: 'home.benefits.benefit3_desc', value: 'Técnicos formados directamente por RENOLIT con las últimas técnicas.', section: 'home.benefits', label: 'Beneficio 3 — Descripción', type: 'text' },
  { key: 'home.benefits.benefit4_title', value: 'Garantía Escrita de 15 Años', section: 'home.benefits', label: 'Beneficio 4 — Título', type: 'text' },
  { key: 'home.benefits.benefit4_desc', value: 'Respaldamos nuestro trabajo con la garantía oficial de RENOLIT ALKORPLAN.', section: 'home.benefits', label: 'Beneficio 4 — Descripción', type: 'text' },
  // HOME — PROCESS
  { key: 'home.process.label', value: 'Nuestro Proceso', section: 'home.process', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.process.title', value: 'Cómo Trabajamos', section: 'home.process', label: 'Título', type: 'text' },
  { key: 'home.process.description', value: 'Un proceso transparente y eficiente para garantizar los mejores resultados en tu proyecto.', section: 'home.process', label: 'Descripción', type: 'textarea' },
  { key: 'home.process.step1_title', value: 'Visita Técnica', section: 'home.process', label: 'Paso 1 — Título', type: 'text' },
  { key: 'home.process.step1_desc', value: 'Evaluamos tu piscina y te asesoramos sobre la mejor solución.', section: 'home.process', label: 'Paso 1 — Descripción', type: 'text' },
  { key: 'home.process.step2_title', value: 'Presupuesto', section: 'home.process', label: 'Paso 2 — Título', type: 'text' },
  { key: 'home.process.step2_desc', value: 'Elaboramos un presupuesto detallado sin compromiso.', section: 'home.process', label: 'Paso 2 — Descripción', type: 'text' },
  { key: 'home.process.step3_title', value: 'Instalación', section: 'home.process', label: 'Paso 3 — Título', type: 'text' },
  { key: 'home.process.step3_desc', value: 'Nuestro equipo certificado realiza la instalación profesional.', section: 'home.process', label: 'Paso 3 — Descripción', type: 'text' },
  { key: 'home.process.step4_title', value: 'Garantía', section: 'home.process', label: 'Paso 4 — Título', type: 'text' },
  { key: 'home.process.step4_desc', value: 'Te entregamos tu piscina con garantía escrita de 15 años.', section: 'home.process', label: 'Paso 4 — Descripción', type: 'text' },
  // HOME — PROJECTS
  { key: 'home.projects.label', value: 'Nuestro Trabajo', section: 'home.projects', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.projects.title', value: 'Proyectos Destacados', section: 'home.projects', label: 'Título', type: 'text' },
  { key: 'home.projects.description', value: 'Descubre algunos de nuestros trabajos más recientes y déjate inspirar.', section: 'home.projects', label: 'Descripción', type: 'textarea' },
  { key: 'home.projects.cta', value: 'Ver Todos los Proyectos', section: 'home.projects', label: 'Texto del botón', type: 'text' },
  // HOME — TESTIMONIALS
  { key: 'home.testimonials.label', value: 'Testimonios', section: 'home.testimonials', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.testimonials.title', value: 'Lo Que Dicen Nuestros Clientes', section: 'home.testimonials', label: 'Título', type: 'text' },
  { key: 'home.testimonials.t1_name', value: 'Carlos Martínez', section: 'home.testimonials', label: 'Testimonio 1 — Nombre', type: 'text' },
  { key: 'home.testimonials.t1_location', value: 'Madrid', section: 'home.testimonials', label: 'Testimonio 1 — Ubicación', type: 'text' },
  { key: 'home.testimonials.t1_content', value: 'Increíble transformación de nuestra piscina. El equipo fue profesional, puntual y el resultado superó nuestras expectativas.', section: 'home.testimonials', label: 'Testimonio 1 — Contenido', type: 'textarea' },
  { key: 'home.testimonials.t2_name', value: 'María García', section: 'home.testimonials', label: 'Testimonio 2 — Nombre', type: 'text' },
  { key: 'home.testimonials.t2_location', value: 'Valencia', section: 'home.testimonials', label: 'Testimonio 2 — Ubicación', type: 'text' },
  { key: 'home.testimonials.t2_content', value: 'Después de años con problemas de fugas, por fin tenemos una piscina perfecta. El proceso fue rápido y limpio.', section: 'home.testimonials', label: 'Testimonio 2 — Contenido', type: 'textarea' },
  { key: 'home.testimonials.t3_name', value: 'Comunidad Los Olivos', section: 'home.testimonials', label: 'Testimonio 3 — Nombre', type: 'text' },
  { key: 'home.testimonials.t3_location', value: 'Barcelona', section: 'home.testimonials', label: 'Testimonio 3 — Ubicación', type: 'text' },
  { key: 'home.testimonials.t3_content', value: 'Rehabilitaron nuestra piscina comunitaria en tiempo récord. La comunicación con la comunidad fue excelente.', section: 'home.testimonials', label: 'Testimonio 3 — Contenido', type: 'textarea' },
  // HOME — FAQ
  { key: 'home.faq.label', value: 'Preguntas Frecuentes', section: 'home.faq', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.faq.title', value: 'Todo Sobre RENOLIT ALKORPLAN', section: 'home.faq', label: 'Título', type: 'text' },
  { key: 'home.faq.description', value: 'Resolvemos las dudas más comunes sobre la instalación de lámina armada en piscinas.', section: 'home.faq', label: 'Descripción', type: 'textarea' },
  { key: 'home.faq.q1', value: '¿Qué es la lámina armada RENOLIT ALKORPLAN?', section: 'home.faq', label: 'Pregunta 1', type: 'text' },
  { key: 'home.faq.a1', value: 'RENOLIT ALKORPLAN es una membrana de PVC reforzada con malla de poliéster que garantiza la impermeabilización total de piscinas. Es el sistema más utilizado en Europa por su durabilidad, estética y facilidad de mantenimiento.', section: 'home.faq', label: 'Respuesta 1', type: 'textarea' },
  { key: 'home.faq.q2', value: '¿Cuánto dura la garantía de la instalación?', section: 'home.faq', label: 'Pregunta 2', type: 'text' },
  { key: 'home.faq.a2', value: 'Ofrecemos una garantía escrita de 15 años en todos nuestros trabajos de instalación con membrana RENOLIT ALKORPLAN. Esta garantía cubre tanto el material como la mano de obra de instalación.', section: 'home.faq', label: 'Respuesta 2', type: 'textarea' },
  { key: 'home.faq.q3', value: '¿Se puede instalar sobre gresite existente?', section: 'home.faq', label: 'Pregunta 3', type: 'text' },
  { key: 'home.faq.a3', value: 'Sí, una de las grandes ventajas de RENOLIT ALKORPLAN es que se puede instalar sobre cualquier superficie existente (gresite, cemento, fibra, etc.) sin necesidad de demoler, lo que reduce tiempos y costes.', section: 'home.faq', label: 'Respuesta 3', type: 'textarea' },
  { key: 'home.faq.q4', value: '¿Cuánto tiempo tarda la instalación?', section: 'home.faq', label: 'Pregunta 4', type: 'text' },
  { key: 'home.faq.a4', value: 'El tiempo de instalación depende del tamaño de la piscina. Una piscina residencial estándar suele completarse en 3-5 días. Durante el proceso, te mantenemos informado de cada avance.', section: 'home.faq', label: 'Respuesta 4', type: 'textarea' },
  { key: 'home.faq.q5', value: '¿Qué mantenimiento requiere la lámina armada?', section: 'home.faq', label: 'Pregunta 5', type: 'text' },
  { key: 'home.faq.a5', value: 'El mantenimiento es mínimo. Basta con mantener los niveles adecuados de cloro y pH del agua. La superficie lisa de ALKORPLAN evita la acumulación de algas y facilita la limpieza.', section: 'home.faq', label: 'Respuesta 5', type: 'textarea' },
  { key: 'home.faq.q6', value: '¿Puedo elegir el color y diseño de la lámina?', section: 'home.faq', label: 'Pregunta 6', type: 'text' },
  { key: 'home.faq.a6', value: 'Por supuesto. RENOLIT ALKORPLAN ofrece una amplia gama de colores y diseños: desde tonos lisos clásicos hasta imitaciones de mosaico, piedra o arena. Te asesoramos para elegir el que mejor se adapte a tu piscina.', section: 'home.faq', label: 'Respuesta 6', type: 'textarea' },
  { key: 'home.faq.q7', value: '¿Por qué elegir un instalador oficial RENOLIT?', section: 'home.faq', label: 'Pregunta 7', type: 'text' },
  { key: 'home.faq.a7', value: 'Los instaladores oficiales hemos recibido formación específica de RENOLIT y trabajamos exclusivamente con material original de fábrica. Esto garantiza que la instalación cumpla todos los estándares de calidad y puedas disfrutar de la garantía oficial.', section: 'home.faq', label: 'Respuesta 7', type: 'textarea' },
  // HOME — CTA
  { key: 'home.cta.title', value: '¿Listo para Impermeabilizar tu Piscina?', section: 'home.cta', label: 'Título', type: 'text' },
  { key: 'home.cta.description', value: 'Contáctanos hoy y recibe un presupuesto personalizado sin compromiso. Instalación profesional con garantía RENOLIT ALKORPLAN.', section: 'home.cta', label: 'Descripción', type: 'textarea' },
  { key: 'home.cta.button_primary', value: 'Solicitar Presupuesto', section: 'home.cta', label: 'Botón principal', type: 'text' },
  { key: 'home.cta.button_secondary', value: 'Llamar Ahora', section: 'home.cta', label: 'Botón secundario', type: 'text' },
  // ABOUT
  { key: 'about.hero.label', value: 'Conócenos', section: 'about', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'about.hero.title', value: 'Instaladores Oficiales RENOLIT ALKORPLAN', section: 'about', label: 'Hero — Título', type: 'text' },
  { key: 'about.hero.description', value: 'Somos especialistas certificados en instalación de lámina armada RENOLIT ALKORPLAN, la membrana más utilizada en el mundo para el revestimiento de piscinas.', section: 'about', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'about.content.title', value: 'Quiénes Somos', section: 'about', label: 'Contenido — Título', type: 'text' },
  { key: 'about.content.paragraph1', value: 'ARG Piscinas es una empresa especializada exclusivamente en la instalación de lámina armada RENOLIT ALKORPLAN para piscinas. Como instaladores oficiales certificados, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.', section: 'about', label: 'Contenido — Párrafo 1', type: 'textarea' },
  { key: 'about.content.paragraph2', value: 'Nuestra especialización nos permite ofrecer un servicio de máxima calidad, centrado en lo que mejor sabemos hacer: impermeabilizar piscinas con la tecnología más avanzada del mercado.', section: 'about', label: 'Contenido — Párrafo 2', type: 'textarea' },
  { key: 'about.content.paragraph3', value: 'Trabajamos tanto en piscinas de nueva construcción como en rehabilitaciones, ofreciendo soluciones personalizadas para cada proyecto con la garantía oficial de RENOLIT.', section: 'about', label: 'Contenido — Párrafo 3', type: 'textarea' },
  { key: 'about.cta.title', value: '¿Listo para tu Proyecto?', section: 'about', label: 'CTA — Título', type: 'text' },
  { key: 'about.cta.description', value: 'Contacta con nosotros y recibe un presupuesto personalizado para la instalación de RENOLIT ALKORPLAN en tu piscina.', section: 'about', label: 'CTA — Descripción', type: 'textarea' },
  { key: 'about.cta.button', value: 'Solicitar Presupuesto', section: 'about', label: 'CTA — Botón', type: 'text' },
  // CONTACT
  { key: 'contact.hero.label', value: 'Contacto', section: 'contact', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'contact.hero.title', value: '¿Cómo Podemos Ayudarte?', section: 'contact', label: 'Hero — Título', type: 'text' },
  { key: 'contact.hero.description', value: 'Estamos aquí para responder tus preguntas y ayudarte con tu proyecto de piscina. Contáctanos y te responderemos lo antes posible.', section: 'contact', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'contact.info.title', value: 'Información de Contacto', section: 'contact', label: 'Info — Título', type: 'text' },
  { key: 'contact.info.description', value: 'Puedes contactarnos por cualquiera de estos medios o rellenar el formulario y te responderemos en menos de 24 horas.', section: 'contact', label: 'Info — Descripción', type: 'textarea' },
  { key: 'contact.info.phone', value: '+34 900 000 000', section: 'contact', label: 'Teléfono', type: 'text' },
  { key: 'contact.info.email', value: 'info@argpiscinas.com', section: 'contact', label: 'Email', type: 'text' },
  { key: 'contact.info.address_line1', value: 'Calle Ejemplo 123', section: 'contact', label: 'Dirección — Línea 1', type: 'text' },
  { key: 'contact.info.address_line2', value: '28001 Madrid', section: 'contact', label: 'Dirección — Línea 2', type: 'text' },
  { key: 'contact.info.whatsapp', value: '+34 900 000 000', section: 'contact', label: 'WhatsApp', type: 'text' },
  { key: 'contact.info.schedule', value: 'Lun - Vie: 9:00 - 19:00', section: 'contact', label: 'Horario', type: 'text' },
  { key: 'contact.form.title', value: 'Envíanos un Mensaje', section: 'contact', label: 'Formulario — Título', type: 'text' },
  { key: 'contact.form.success', value: '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.', section: 'contact', label: 'Formulario — Mensaje de éxito', type: 'text' },
  // PROJECTS
  { key: 'projects.hero.label', value: 'Portfolio', section: 'projects', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'projects.hero.title', value: 'Nuestros Proyectos', section: 'projects', label: 'Hero — Título', type: 'text' },
  { key: 'projects.hero.description', value: 'Descubre nuestros trabajos de instalación de lámina armada RENOLIT ALKORPLAN en piscinas de toda España.', section: 'projects', label: 'Hero — Descripción', type: 'textarea' },
  // BLOG
  { key: 'blog.hero.label', value: 'Blog', section: 'blog', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'blog.hero.title', value: 'Artículos y Novedades', section: 'blog', label: 'Hero — Título', type: 'text' },
  { key: 'blog.hero.description', value: 'Consejos, novedades y todo lo que necesitas saber sobre piscinas y lámina armada RENOLIT ALKORPLAN.', section: 'blog', label: 'Hero — Descripción', type: 'textarea' },
  // SERVICES (General)
  { key: 'services.hero.label', value: 'Servicios', section: 'services', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.hero.title', value: 'Nuestros Servicios', section: 'services', label: 'Hero — Título', type: 'text' },
  { key: 'services.hero.description', value: 'Servicios especializados de instalación de lámina armada RENOLIT ALKORPLAN para piscinas.', section: 'services', label: 'Hero — Descripción', type: 'textarea' },
  // SERVICIO — INSTALACIÓN
  { key: 'services.installation.hero_label', value: 'Servicio Especializado', section: 'services.installation', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.installation.hero_title', value: 'Instalación de Lámina Armada', section: 'services.installation', label: 'Hero — Título', type: 'text' },
  { key: 'services.installation.hero_desc', value: 'La solución más duradera y estética para impermeabilizar tu piscina. Instalación profesional con garantía de 15 años.', section: 'services.installation', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.installation.content', value: '<h2>¿Qué es la Lámina Armada?</h2><p>La lámina armada es un revestimiento de PVC reforzado con poliéster que se utiliza para impermeabilizar piscinas. Es el sistema más avanzado y duradero del mercado, ofreciendo una vida útil de más de 20 años con el mantenimiento adecuado.</p><h2>Ventajas de la Lámina Armada</h2><ul><li><strong>Durabilidad excepcional:</strong> Más de 20 años de vida útil con garantía de fabricante.</li><li><strong>Impermeabilización total:</strong> Sistema 100% estanco sin juntas ni fisuras.</li><li><strong>Versatilidad estética:</strong> Amplia gama de colores y acabados disponibles.</li><li><strong>Instalación rápida:</strong> Una piscina estándar puede estar lista en 5-7 días.</li><li><strong>Bajo mantenimiento:</strong> Superficie lisa que evita la acumulación de algas.</li><li><strong>Resistencia UV:</strong> No se decolora con la exposición solar.</li></ul><h2>Nuestro Proceso de Instalación</h2><h3>1. Evaluación inicial</h3><p>Realizamos una inspección completa de tu piscina para determinar el estado del vaso y planificar la instalación óptima.</p><h3>2. Preparación del vaso</h3><p>Limpiamos y preparamos la superficie, reparando cualquier imperfección para garantizar una instalación perfecta.</p><h3>3. Instalación de la lámina</h3><p>Colocamos la lámina armada utilizando técnicas de termosoldadura que garantizan una unión perfecta y estanca.</p><h3>4. Acabados y entrega</h3><p>Instalamos los accesorios (skimmers, impulsores, iluminación) y realizamos las pruebas finales antes de la entrega.</p><h2>Materiales que Utilizamos</h2><p>Trabajamos exclusivamente con las mejores marcas del mercado europeo:</p><ul><li><strong>RENOLIT ALKORPLAN:</strong> Líder mundial en láminas para piscinas.</li><li><strong>CEFIL:</strong> Fabricante español de alta calidad.</li><li><strong>FLAGPOOL:</strong> Marca premium con acabados exclusivos.</li></ul>', section: 'services.installation', label: 'Contenido principal (HTML)', type: 'html' },
  { key: 'services.installation.sidebar_cta_title', value: '¿Interesado en este servicio?', section: 'services.installation', label: 'Sidebar CTA — Título', type: 'text' },
  { key: 'services.installation.sidebar_cta_desc', value: 'Solicita un presupuesto personalizado sin compromiso.', section: 'services.installation', label: 'Sidebar CTA — Descripción', type: 'textarea' },
  { key: 'services.installation.sidebar_cta_button', value: 'Solicitar Presupuesto', section: 'services.installation', label: 'Sidebar CTA — Botón', type: 'text' },
  { key: 'services.installation.sidebar_features_title', value: 'Incluye:', section: 'services.installation', label: 'Sidebar — Título características', type: 'text' },
  { key: 'services.installation.sidebar_feat1', value: 'Garantía de 15 años', section: 'services.installation', label: 'Sidebar — Característica 1', type: 'text' },
  { key: 'services.installation.sidebar_feat2', value: 'Materiales certificados', section: 'services.installation', label: 'Sidebar — Característica 2', type: 'text' },
  { key: 'services.installation.sidebar_feat3', value: 'Técnicos especializados', section: 'services.installation', label: 'Sidebar — Característica 3', type: 'text' },
  { key: 'services.installation.sidebar_feat4', value: 'Presupuesto detallado', section: 'services.installation', label: 'Sidebar — Característica 4', type: 'text' },
  { key: 'services.installation.sidebar_contact_title', value: '¿Preguntas?', section: 'services.installation', label: 'Sidebar Contacto — Título', type: 'text' },
  { key: 'services.installation.sidebar_contact_desc', value: 'Llámanos para resolver cualquier duda.', section: 'services.installation', label: 'Sidebar Contacto — Descripción', type: 'text' },
  { key: 'services.installation.sidebar_contact_phone', value: '+34 900 000 000', section: 'services.installation', label: 'Sidebar Contacto — Teléfono', type: 'text' },
  // SERVICIO — REHABILITACIÓN
  { key: 'services.rehabilitation.hero_label', value: 'Servicio Especializado', section: 'services.rehabilitation', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.rehabilitation.hero_title', value: 'Rehabilitación de Piscinas', section: 'services.rehabilitation', label: 'Hero — Título', type: 'text' },
  { key: 'services.rehabilitation.hero_desc', value: 'Devolvemos la vida a tu piscina. Solucionamos filtraciones, deterioro del gresite y cualquier problema estructural con resultados garantizados.', section: 'services.rehabilitation', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.rehabilitation.content', value: '<h2>¿Cuándo Rehabilitar tu Piscina?</h2><p>Las piscinas, como cualquier estructura, sufren desgaste con el tiempo. Si observas alguna de estas señales, es momento de considerar una rehabilitación:</p><ul><li>Pérdida de agua anormal (más de 5cm por semana)</li><li>Gresite desprendido o deteriorado</li><li>Manchas persistentes o decoloración</li><li>Grietas visibles en el vaso</li><li>Problemas de humedad en zonas circundantes</li></ul><h2>Nuestra Solución: Lámina Armada</h2><p>La rehabilitación con lámina armada es la solución más eficiente y duradera. A diferencia de volver a engrestar, la lámina armada:</p><ul><li><strong>Sella completamente</strong> cualquier fuga existente</li><li><strong>Cubre imperfecciones</strong> sin necesidad de picar</li><li><strong>Renueva la estética</strong> por completo</li><li><strong>Añade años de vida</strong> a la estructura</li><li><strong>Reduce el mantenimiento</strong> futuro</li></ul><h2>Proceso de Rehabilitación</h2><h3>1. Diagnóstico</h3><p>Realizamos una evaluación completa del estado del vaso, identificando fugas, daños estructurales y otros problemas.</p><h3>2. Vaciado y Limpieza</h3><p>Vaciamos la piscina y realizamos una limpieza profunda de toda la superficie.</p><h3>3. Reparaciones Estructurales</h3><p>Reparamos grietas, sellamos filtraciones y nivelamos la superficie para la instalación óptima de la lámina.</p><h3>4. Instalación de Lámina</h3><p>Colocamos la lámina armada con técnicas de termosoldadura profesional.</p><h3>5. Puesta en Marcha</h3><p>Llenamos la piscina, equilibramos el agua y te entregamos tu piscina completamente renovada.</p>', section: 'services.rehabilitation', label: 'Contenido principal (HTML)', type: 'html' },
  { key: 'services.rehabilitation.sidebar_cta_title', value: '¿Tu piscina necesita rehabilitación?', section: 'services.rehabilitation', label: 'Sidebar CTA — Título', type: 'text' },
  { key: 'services.rehabilitation.sidebar_cta_desc', value: 'Solicita una inspección gratuita y te daremos un diagnóstico completo.', section: 'services.rehabilitation', label: 'Sidebar CTA — Descripción', type: 'textarea' },
  { key: 'services.rehabilitation.sidebar_cta_button', value: 'Solicitar Inspección', section: 'services.rehabilitation', label: 'Sidebar CTA — Botón', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alerts_title', value: 'Señales de alerta:', section: 'services.rehabilitation', label: 'Sidebar — Título alertas', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert1', value: 'Nivel de agua baja constantemente', section: 'services.rehabilitation', label: 'Sidebar — Alerta 1', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert2', value: 'Gresite que se despega', section: 'services.rehabilitation', label: 'Sidebar — Alerta 2', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert3', value: 'Manchas que no desaparecen', section: 'services.rehabilitation', label: 'Sidebar — Alerta 3', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert4', value: 'Grietas visibles', section: 'services.rehabilitation', label: 'Sidebar — Alerta 4', type: 'text' },
  // SERVICIO — IMPERMEABILIZACIÓN
  { key: 'services.waterproofing.hero_label', value: 'Servicio Especializado', section: 'services.waterproofing', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.waterproofing.hero_title', value: 'Impermeabilización de Piscinas', section: 'services.waterproofing', label: 'Hero — Título', type: 'text' },
  { key: 'services.waterproofing.hero_desc', value: 'Sistemas profesionales de impermeabilización para garantizar la estanqueidad total de tu piscina y eliminar filtraciones definitivamente.', section: 'services.waterproofing', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.waterproofing.content', value: '<h2>Importancia de la Impermeabilización</h2><p>Una piscina mal impermeabilizada puede causar problemas graves: pérdida de agua, daños estructurales, humedades en zonas cercanas y un gasto continuo en productos químicos y agua.</p><h2>Sistemas de Impermeabilización</h2><h3>Lámina Armada PVC</h3><p>El sistema más avanzado del mercado. Crea una barrera 100% estanca que se adapta a cualquier forma de vaso.</p><h3>Poliurea</h3><p>Ideal para piscinas con formas complejas o zonas de difícil acceso. Se aplica por proyección y forma una membrana continua.</p><h3>Morteros Impermeabilizantes</h3><p>Solución económica para casos específicos, como reparaciones puntuales o preparación de superficies.</p><h2>¿Cuándo Necesitas Impermeabilizar?</h2><ul><li>Construcción de nueva piscina</li><li>Fugas o filtraciones detectadas</li><li>Renovación del revestimiento</li><li>Cambio de gresite a lámina</li><li>Daños por movimientos estructurales</li></ul><h2>Nuestro Proceso</h2><ol><li><strong>Inspección:</strong> Identificamos el origen de las filtraciones.</li><li><strong>Diagnóstico:</strong> Evaluamos el mejor sistema para tu caso.</li><li><strong>Preparación:</strong> Acondicionamos la superficie.</li><li><strong>Aplicación:</strong> Instalamos el sistema de impermeabilización.</li><li><strong>Verificación:</strong> Comprobamos la estanqueidad total.</li></ol>', section: 'services.waterproofing', label: 'Contenido principal (HTML)', type: 'html' },
  { key: 'services.waterproofing.sidebar_cta_title', value: '¿Problemas de filtraciones?', section: 'services.waterproofing', label: 'Sidebar CTA — Título', type: 'text' },
  { key: 'services.waterproofing.sidebar_cta_desc', value: 'Te ayudamos a identificar el origen y te proponemos la mejor solución.', section: 'services.waterproofing', label: 'Sidebar CTA — Descripción', type: 'textarea' },
  { key: 'services.waterproofing.sidebar_cta_button', value: 'Consultar', section: 'services.waterproofing', label: 'Sidebar CTA — Botón', type: 'text' },
  { key: 'services.waterproofing.sidebar_features_title', value: 'Garantizamos:', section: 'services.waterproofing', label: 'Sidebar — Título garantías', type: 'text' },
  { key: 'services.waterproofing.sidebar_feat1', value: 'Estanqueidad 100%', section: 'services.waterproofing', label: 'Sidebar — Garantía 1', type: 'text' },
  { key: 'services.waterproofing.sidebar_feat2', value: 'Garantía por escrito', section: 'services.waterproofing', label: 'Sidebar — Garantía 2', type: 'text' },
  { key: 'services.waterproofing.sidebar_feat3', value: 'Materiales certificados', section: 'services.waterproofing', label: 'Sidebar — Garantía 3', type: 'text' },
]

function buildSectionsFromDefaults() {
  const sections = {}
  for (const item of defaultContent) {
    if (!sections[item.section]) {
      sections[item.section] = []
    }
    sections[item.section].push({ ...item })
  }
  return sections
}

// Section colors
function getSectionColor(section) {
  const colors = {
    'home.hero': 'bg-blue-100 text-blue-600',
    'home.renolit': 'bg-indigo-100 text-indigo-600',
    'home.services': 'bg-purple-100 text-purple-600',
    'home.benefits': 'bg-emerald-100 text-emerald-600',
    'home.process': 'bg-amber-100 text-amber-600',
    'home.projects': 'bg-cyan-100 text-cyan-600',
    'home.testimonials': 'bg-pink-100 text-pink-600',
    'home.faq': 'bg-orange-100 text-orange-600',
    'home.cta': 'bg-red-100 text-red-600',
    'about': 'bg-teal-100 text-teal-600',
    'services.installation': 'bg-violet-100 text-violet-600',
    'services.rehabilitation': 'bg-fuchsia-100 text-fuchsia-600',
    'services.waterproofing': 'bg-purple-100 text-purple-600',
    'services': 'bg-violet-100 text-violet-600',
    'contact': 'bg-sky-100 text-sky-600',
    'projects': 'bg-lime-100 text-lime-600',
    'blog': 'bg-rose-100 text-rose-600'
  }
  for (const [key, value] of Object.entries(colors)) {
    if (section.startsWith(key)) return value
  }
  return 'bg-neutral-100 text-neutral-600'
}

// Section icons
function getSectionIcon(section) {
  const HomeIcon = { render() { return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })]) } }
  const InfoIcon = { render() { return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })]) } }
  const ServiceIcon = { render() { return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })]) } }
  const ContactIcon = { render() { return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })]) } }
  const EditIcon = { render() { return h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })]) } }

  if (section.startsWith('home')) return HomeIcon
  if (section.startsWith('about')) return InfoIcon
  if (section.startsWith('service')) return ServiceIcon
  if (section.startsWith('contact')) return ContactIcon
  return EditIcon
}

// Computed
const filteredSections = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const source = localSections.value

  if (!query) return source

  const filtered = {}
  for (const [section, items] of Object.entries(source)) {
    const matchingItems = items.filter(item =>
      item.label.toLowerCase().includes(query) ||
      item.key.toLowerCase().includes(query) ||
      (editedValues.value[item.key] || item.value).toLowerCase().includes(query) ||
      (sectionLabels[section] || section).toLowerCase().includes(query)
    )
    if (matchingItems.length > 0) {
      filtered[section] = matchingItems
    }
  }
  return filtered
})

const hasChanges = computed(() => {
  for (const key of Object.keys(editedValues.value)) {
    if (editedValues.value[key] !== originalValues.value[key]) {
      return true
    }
  }
  return false
})

function isChanged(key) {
  return editedValues.value[key] !== originalValues.value[key]
}

function sectionHasChanges(sectionKey, items) {
  return items.some(item => isChanged(item.key))
}

function getMaxLength(item) {
  // Botones y enlaces
  if (item.key.includes('button') || item.key.includes('cta_primary') || item.key.includes('cta_secondary') || item.key.includes('cta_button') || item.key.includes('link_text')) return 40
  // Etiquetas cortas
  if ((item.key.includes('.label') || item.key.includes('hero_label')) && item.type === 'text') return 50
  // Títulos
  if (item.key.endsWith('.title') || item.key.includes('_title')) return 100
  // Datos de contacto
  if (item.key.includes('phone') || item.key.includes('email') || item.key.includes('whatsapp')) return 50
  // Nombres y ubicaciones
  if (item.key.includes('name') || item.key.includes('location')) return 60
  // Features / sidebar items
  if (item.key.includes('sidebar_feat') || item.key.includes('sidebar_alert') || item.key.includes('sidebar_feature')) return 60
  // Por tipo
  if (item.type === 'html') return 10000
  if (item.type === 'textarea') return 500
  return 150
}

function charCountClass(item) {
  const len = (editedValues.value[item.key] || '').length
  const max = getMaxLength(item)
  if (len > max) return 'text-red-500 font-medium'
  if (len > max * 0.85) return 'text-amber-500'
  return 'text-neutral-400'
}

function toggleSection(section) {
  const idx = openSections.value.indexOf(section)
  if (idx === -1) {
    openSections.value.push(section)
  } else {
    openSections.value.splice(idx, 1)
  }
}

function resetField(key) {
  editedValues.value[key] = originalValues.value[key]
}

function discardChanges() {
  editedValues.value = { ...originalValues.value }
}

async function saveAll() {
  saving.value = true
  errorMsg.value = null
  successMessage.value = ''

  const changedItems = []
  for (const key of Object.keys(editedValues.value)) {
    if (editedValues.value[key] !== originalValues.value[key]) {
      changedItems.push({ key, value: editedValues.value[key] })
    }
  }

  if (changedItems.length === 0) return

  try {
    await api.put('/content/bulk', { items: changedItems })
    changedItems.forEach(item => {
      originalValues.value[item.key] = item.value
    })
    successMessage.value = `${changedItems.length} campo${changedItems.length !== 1 ? 's' : ''} actualizado${changedItems.length !== 1 ? 's' : ''} correctamente`
    setTimeout(() => { successMessage.value = '' }, 4000)
  } catch (err) {
    errorMsg.value = 'No se pudieron guardar los cambios. Asegurate de que el backend tenga la tabla site_contents creada (ejecutá la migración de Prisma).'
  } finally {
    saving.value = false
  }
}

function initializeValues(sections) {
  const edited = {}
  const original = {}
  for (const items of Object.values(sections)) {
    for (const item of items) {
      edited[item.key] = item.value
      original[item.key] = item.value
    }
  }
  editedValues.value = edited
  originalValues.value = original
}

onMounted(async () => {
  loading.value = true

  // Intentar cargar desde la API
  try {
    const { data } = await api.get('/content/sections')
    if (data.data && Object.keys(data.data).length > 0) {
      localSections.value = data.data
    } else {
      localSections.value = buildSectionsFromDefaults()
    }
  } catch (err) {
    // API no disponible, usar datos por defecto
    localSections.value = buildSectionsFromDefaults()
    errorMsg.value = 'La API de contenido no está disponible. Mostrando valores por defecto. Para guardar cambios, ejecutá la migración en el backend.'
  }

  initializeValues(localSections.value)
  
  // Abrir la primera sección
  const sectionKeys = Object.keys(localSections.value)
  if (sectionKeys.length > 0) {
    openSections.value = [sectionKeys[0]]
  }
  loading.value = false
})
</script>

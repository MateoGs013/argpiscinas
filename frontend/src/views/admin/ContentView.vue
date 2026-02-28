<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Contenido del Sitio</h1>
        <p class="text-neutral-500 text-sm mt-1">Editá todo por bloques desde cards y modal</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-if="hasChanges"
          @click="discardChanges"
          class="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
        >
          Descartar cambios
        </button>
        <button
          @click="saveAll"
          :disabled="!hasChanges || saving || !!savingSectionKey || !!savingGroupKey"
          class="px-6 py-2.5 text-sm font-medium text-white bg-primary-800 rounded-xl hover:bg-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ saving ? 'Guardando...' : 'Guardar Todo' }}
        </button>
      </div>
    </div>

    <div v-if="!loading" class="bg-white border border-neutral-200 rounded-2xl p-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2 text-sm">
          <span class="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 font-medium">
            {{ pendingChangesCount }} cambio{{ pendingChangesCount !== 1 ? 's' : '' }} pendiente{{ pendingChangesCount !== 1 ? 's' : '' }}
          </span>
          <span class="text-neutral-500">en {{ changedSectionsCount }} sección{{ changedSectionsCount !== 1 ? 'es' : '' }}</span>
          <span v-if="lastSavedLabel" class="text-neutral-400">Último guardado: {{ lastSavedLabel }}</span>
        </div>
        <p class="text-xs text-neutral-400">Tip: usá <kbd class="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded">Ctrl/Cmd + S</kbd> para guardar rápido.</p>
      </div>
    </div>

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

    <div v-if="errorMsg" class="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
      <svg class="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p class="text-sm text-amber-700">{{ errorMsg }}</p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="flex items-center gap-3 text-neutral-500">
        <svg class="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75" />
        </svg>
        <span>Cargando contenido...</span>
      </div>
    </div>

    <div v-if="!loading" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="relative flex-1">
          <svg class="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por grupo, sección, campo o clave..."
            class="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          @click="showOnlyChanged = !showOnlyChanged"
          class="w-fit px-3 py-2 text-xs font-medium rounded-lg border transition-colors"
          :class="showOnlyChanged ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'"
        >
          {{ showOnlyChanged ? 'Solo modificados' : 'Mostrar solo modificados' }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <button
          v-for="group in filteredGroups"
          :key="group.key"
          @click="openGroupModal(group.key)"
          class="text-left bg-white border border-neutral-200 rounded-2xl p-5 hover:shadow-md hover:border-neutral-300 transition-all"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="group.colorClass">
                <component :is="group.icon" class="w-5 h-5" />
              </div>
              <div class="min-w-0">
                <h3 class="font-semibold text-neutral-900 truncate">{{ group.label }}</h3>
                <p class="text-xs text-neutral-400">{{ group.sectionCount }} sección{{ group.sectionCount !== 1 ? 'es' : '' }} · {{ group.totalFields }} campo{{ group.totalFields !== 1 ? 's' : '' }}</p>
              </div>
            </div>
            <span
              class="px-2 py-1 text-[11px] rounded-full font-medium"
              :class="group.changedCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-500'"
            >
              {{ group.changedCount }} cambios
            </span>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="section in group.sections.slice(0, 3)"
              :key="`${group.key}-${section.key}`"
              class="px-2 py-1 text-[11px] rounded-md bg-neutral-50 text-neutral-500 border border-neutral-100"
            >
              {{ section.shortLabel }}
            </span>
            <span v-if="group.sections.length > 3" class="px-2 py-1 text-[11px] rounded-md bg-neutral-50 text-neutral-500 border border-neutral-100">
              +{{ group.sections.length - 3 }} más
            </span>
          </div>
        </button>
      </div>

      <div v-if="filteredGroups.length === 0" class="text-center py-16">
        <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-neutral-500">No se encontraron grupos que coincidan con tu búsqueda.</p>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isModalOpen && activeGroup" class="fixed inset-0 z-[60] p-4 sm:p-6">
          <div class="absolute inset-0 bg-neutral-950/60" @click="closeGroupModal" />
          <div class="relative z-10 h-full w-full flex items-center justify-center">
            <div class="w-full max-w-6xl max-h-[92vh] bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div class="px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div>
                    <p class="text-xs uppercase tracking-wide text-neutral-500 font-medium">Edición por grupo</p>
                    <h2 class="text-xl font-semibold text-neutral-900">{{ activeGroup.label }}</h2>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <div class="relative w-full sm:w-72">
                      <svg class="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        v-model="modalQuery"
                        type="text"
                        placeholder="Buscar dentro del grupo..."
                        class="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      @click="saveActiveGroup"
                      :disabled="!activeGroupHasChanges || saving || !!savingSectionKey || !!savingGroupKey"
                      class="px-3 py-2 text-sm font-medium text-white bg-primary-800 rounded-lg hover:bg-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ savingGroupKey === activeGroup.key ? 'Guardando...' : 'Guardar grupo' }}
                    </button>
                    <button @click="closeGroupModal" class="px-3 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50">
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[260px,1fr]">
                <aside
                  class="border-b md:border-b-0 md:border-r border-neutral-100 bg-neutral-50/50 overflow-x-auto md:overflow-y-auto"
                >
                  <div class="p-3 flex md:flex-col gap-2 min-w-max md:min-w-0">
                    <button
                      v-for="section in modalSections"
                      :key="`modal-section-${section.key}`"
                      @click="setModalSection(section.key)"
                      class="px-3 py-2 text-left rounded-lg border text-sm transition-colors md:w-full"
                      :class="section.key === activeModalSectionKey ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <span class="truncate">{{ section.shortLabel }}</span>
                        <span
                          class="text-[11px] px-1.5 py-0.5 rounded-full"
                          :class="section.changedCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-500'"
                        >
                          {{ section.changedCount }}
                        </span>
                      </div>
                    </button>
                  </div>
                </aside>

                <section class="min-h-0 overflow-y-auto">
                  <div v-if="currentModalSection" class="p-6 space-y-5">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 class="text-lg font-semibold text-neutral-900">{{ currentModalSection.label }}</h3>
                        <p class="text-xs text-neutral-400">{{ currentModalSection.items.length }} campo{{ currentModalSection.items.length !== 1 ? 's' : '' }} visibles</p>
                      </div>
                      <div class="flex flex-wrap items-center gap-2">
                        <button
                          @click="discardCurrentModalSection"
                          :disabled="!sectionHasChanges(currentModalSection.key)"
                          class="px-3 py-1.5 text-xs font-medium text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Descartar sección
                        </button>
                        <button
                          @click="saveCurrentModalSection"
                          :disabled="!sectionHasChanges(currentModalSection.key) || saving || !!savingSectionKey"
                          class="px-3 py-1.5 text-xs font-medium text-white bg-primary-800 rounded-lg hover:bg-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {{ savingSectionKey === currentModalSection.key ? 'Guardando...' : 'Guardar sección' }}
                        </button>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div
                        v-for="item in currentModalSection.items"
                        :key="item.key"
                        class="border rounded-xl p-4"
                        :class="isChanged(item.key) ? 'border-amber-200 bg-amber-50/30' : 'border-neutral-200 bg-white'"
                      >
                        <div class="flex items-start justify-between gap-4 mb-2">
                          <label :for="item.key" class="block text-sm font-medium text-neutral-700">{{ item.label }}</label>
                          <span class="text-[10px] text-neutral-400 font-mono bg-neutral-100 px-2 py-0.5 rounded flex-shrink-0">{{ item.key }}</span>
                        </div>

                        <input
                          v-if="item.type === 'text'"
                          :id="item.key"
                          v-model="editedValues[item.key]"
                          type="text"
                          :maxlength="getMaxLength(item)"
                          class="w-full px-4 py-2.5 border rounded-xl text-sm transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          :class="isChanged(item.key) ? 'border-amber-300 bg-amber-50/50' : 'border-neutral-200 bg-white'"
                        />

                        <textarea
                          v-else-if="item.type === 'textarea' || item.type === 'html'"
                          :id="item.key"
                          v-model="editedValues[item.key]"
                          :rows="item.type === 'html' ? 8 : 4"
                          :maxlength="getMaxLength(item)"
                          class="w-full px-4 py-2.5 border rounded-xl text-sm transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                          :class="isChanged(item.key) ? 'border-amber-300 bg-amber-50/50' : 'border-neutral-200 bg-white'"
                        />

                        <textarea
                          v-else-if="item.type === 'json'"
                          :id="item.key"
                          v-model="editedValues[item.key]"
                          rows="10"
                          :maxlength="getMaxLength(item)"
                          class="w-full px-4 py-2.5 border rounded-xl text-sm font-mono transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                          :class="isChanged(item.key) ? 'border-amber-300 bg-amber-50/50' : 'border-neutral-200 bg-white'"
                        />

                        <div class="flex items-center justify-between mt-1.5">
                          <div v-if="isChanged(item.key)" class="flex items-center gap-2">
                            <span class="text-xs text-amber-600">Modificado</span>
                            <button @click="resetField(item.key)" class="text-xs text-neutral-500 hover:text-neutral-700 underline">Restaurar</button>
                          </div>
                          <span class="text-[11px] tabular-nums" :class="charCountClass(item)">{{ (editedValues[item.key] || '').length }} / {{ getMaxLength(item) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else class="h-full flex items-center justify-center px-6 py-16 text-center">
                    <div>
                      <p class="text-neutral-500">No hay campos visibles con los filtros actuales.</p>
                      <p class="text-neutral-400 text-sm mt-1">Probá limpiar la búsqueda del modal o desactivar "solo modificados".</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, h } from 'vue'
import api from '@/services/api'
import {
  sectionLabels,
  groupLabels,
  sectionOrderByPage,
  isDeprecatedContentSection,
  isHiddenContentKey,
  buildSectionsFromDefaults,
  inferItemType,
  mergeSectionsWithDefaults
} from '@/data/adminContentConfig'

const loading = ref(true)
const saving = ref(false)
const errorMsg = ref(null)
const successMessage = ref('')
const searchQuery = ref('')
const editedValues = ref({})
const originalValues = ref({})
const localSections = ref({})
const showOnlyChanged = ref(false)
const savingSectionKey = ref('')
const savingGroupKey = ref('')
const lastSavedAt = ref('')
const initialized = ref(false)
const activeGroupKey = ref('')
const activeModalSectionKey = ref('')
const modalQuery = ref('')
let previousBodyOverflow = ''

const DRAFT_STORAGE_KEY = 'admin-content-draft-v1'
const LAST_SAVED_STORAGE_KEY = 'admin-content-last-saved-v1'

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

function getGroupKeyForSection(sectionKey) {
  if (sectionKey.startsWith('home.')) return 'home'
  if (sectionKey.startsWith('services.') || sectionKey === 'services') return 'services'
  if (sectionKey.startsWith('about')) return 'about'
  if (sectionKey.startsWith('contact')) return 'contact'
  if (sectionKey.startsWith('projects')) return 'projects'
  if (sectionKey.startsWith('blog')) return 'blog'
  const [prefix] = sectionKey.split('.')
  return prefix || sectionKey
}

function getGroupColorClass(groupKey) {
  const colorMap = {
    home: 'bg-blue-100 text-blue-700',
    services: 'bg-violet-100 text-violet-700',
    about: 'bg-teal-100 text-teal-700',
    contact: 'bg-sky-100 text-sky-700',
    projects: 'bg-lime-100 text-lime-700',
    blog: 'bg-rose-100 text-rose-700'
  }
  return colorMap[groupKey] || 'bg-neutral-100 text-neutral-600'
}

function getGroupIcon(groupKey) {
  if (groupKey === 'home') return getSectionIcon('home.hero')
  if (groupKey === 'services') return getSectionIcon('services')
  return getSectionIcon(groupKey)
}

function getShortSectionLabel(sectionKey) {
  const label = sectionLabels[sectionKey] || sectionKey
  return label.includes('—') ? label.split('—').slice(1).join('—').trim() || label : label
}

function getSectionOrderValue(sectionKey) {
  if (Object.prototype.hasOwnProperty.call(sectionOrderByPage, sectionKey)) {
    return sectionOrderByPage[sectionKey]
  }

  const [prefix, suffix] = sectionKey.split('.')
  if (suffix) {
    const genericKey = `${prefix}.${suffix}`
    if (Object.prototype.hasOwnProperty.call(sectionOrderByPage, genericKey)) {
      return sectionOrderByPage[genericKey]
    }
  }

  return 999
}

// Computed
function isChanged(key) {
  return editedValues.value[key] !== originalValues.value[key]
}

function getChangedItems(sectionKey = null) {
  const changedItems = []

  if (sectionKey) {
    const sectionItems = localSections.value[sectionKey] || []
    for (const item of sectionItems) {
      const currentValue = editedValues.value[item.key]
      const baseValue = originalValues.value[item.key]
      if (currentValue !== baseValue) {
        changedItems.push({
          key: item.key,
          value: currentValue,
          section: sectionKey,
          label: item.label || item.key,
          type: item.type || inferItemType(item)
        })
      }
    }
    return changedItems
  }

  for (const [currentSectionKey, items] of Object.entries(localSections.value)) {
    for (const item of items) {
      const currentValue = editedValues.value[item.key]
      const baseValue = originalValues.value[item.key]
      if (currentValue !== baseValue) {
        changedItems.push({
          key: item.key,
          value: currentValue,
          section: currentSectionKey,
          label: item.label || item.key,
          type: item.type || inferItemType(item)
        })
      }
    }
  }

  return changedItems
}

function sectionChangedCount(sectionKey) {
  return getChangedItems(sectionKey).length
}

function sectionHasChanges(sectionKey) {
  return sectionChangedCount(sectionKey) > 0
}

function groupChangedCount(groupKey) {
  const group = sectionGroups.value.find(item => item.key === groupKey)
  if (!group) return 0
  return group.sections.reduce((sum, section) => sum + sectionChangedCount(section.key), 0)
}

function getChangedItemsByGroup(groupKey) {
  const group = sectionGroups.value.find(item => item.key === groupKey)
  if (!group) return []
  const changedItems = []
  for (const section of group.sections) {
    changedItems.push(...getChangedItems(section.key))
  }
  return changedItems
}

function itemMatchesQuery(item, query, sectionKey, groupLabel) {
  if (!query) return true
  const source = [
    item.label || '',
    item.key || '',
    editedValues.value[item.key] ?? item.value ?? '',
    sectionLabels[sectionKey] || sectionKey,
    groupLabel
  ]
  return source.some(value => String(value).toLowerCase().includes(query))
}

function filterItems(items, sectionKey, groupLabel, query, onlyChanged) {
  return items.filter(item => {
    if (onlyChanged && !isChanged(item.key)) return false
    return itemMatchesQuery(item, query, sectionKey, groupLabel)
  })
}

const sectionGroups = computed(() => {
  const grouped = {}
  for (const [sectionKey, items] of Object.entries(localSections.value)) {
    const groupKey = getGroupKeyForSection(sectionKey)
    if (!grouped[groupKey]) {
      grouped[groupKey] = {
        key: groupKey,
        label: groupLabels[groupKey] || sectionKey,
        colorClass: getGroupColorClass(groupKey),
        icon: getGroupIcon(groupKey),
        sections: []
      }
    }
    grouped[groupKey].sections.push({
      key: sectionKey,
      label: sectionLabels[sectionKey] || sectionKey,
      shortLabel: getShortSectionLabel(sectionKey),
      items
    })
  }

  const groupOrder = ['home', 'services', 'about', 'contact', 'projects', 'blog']
  const groups = Object.values(grouped).sort((a, b) => {
    const aIndex = groupOrder.includes(a.key) ? groupOrder.indexOf(a.key) : 999
    const bIndex = groupOrder.includes(b.key) ? groupOrder.indexOf(b.key) : 999
    if (aIndex !== bIndex) return aIndex - bIndex
    return a.label.localeCompare(b.label, 'es')
  })

  return groups.map(group => {
    const sections = [...group.sections].sort((a, b) => {
      const aOrder = getSectionOrderValue(a.key)
      const bOrder = getSectionOrderValue(b.key)
      if (aOrder !== bOrder) return aOrder - bOrder
      return a.label.localeCompare(b.label, 'es')
    })
    const totalFields = sections.reduce((sum, section) => sum + section.items.length, 0)
    const changedCount = sections.reduce((sum, section) => sum + sectionChangedCount(section.key), 0)
    return {
      ...group,
      sections,
      totalFields,
      changedCount,
      sectionCount: sections.length
    }
  })
})

const filteredGroups = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return sectionGroups.value
    .map(group => {
      const sections = group.sections
        .map(section => {
          const filteredItems = filterItems(section.items, section.key, group.label, query, showOnlyChanged.value)
          return {
            ...section,
            items: filteredItems,
            changedCount: sectionChangedCount(section.key)
          }
        })
        .filter(section => section.items.length > 0)

      if (sections.length === 0) return null

      return {
        ...group,
        sections,
        totalFields: sections.reduce((sum, section) => sum + section.items.length, 0),
        sectionCount: sections.length
      }
    })
    .filter(Boolean)
})

const hasChanges = computed(() => getChangedItems().length > 0)
const pendingChangesCount = computed(() => getChangedItems().length)

const changedSectionsCount = computed(() => {
  let count = 0
  for (const sectionKey of Object.keys(localSections.value)) {
    if (sectionHasChanges(sectionKey)) {
      count += 1
    }
  }
  return count
})

const lastSavedLabel = computed(() => {
  if (!lastSavedAt.value) return ''
  const parsed = new Date(lastSavedAt.value)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleString('es-AR')
})

const isModalOpen = computed(() => Boolean(activeGroupKey.value))

const activeGroup = computed(() => {
  return sectionGroups.value.find(group => group.key === activeGroupKey.value) || null
})

const modalSections = computed(() => {
  if (!activeGroup.value) return []
  const query = modalQuery.value.trim().toLowerCase()
  return activeGroup.value.sections
    .map(section => {
      const filteredItems = filterItems(section.items, section.key, activeGroup.value.label, query, showOnlyChanged.value)
      return {
        ...section,
        items: filteredItems,
        changedCount: sectionChangedCount(section.key)
      }
    })
    .filter(section => section.items.length > 0)
})

const currentModalSection = computed(() => {
  if (modalSections.value.length === 0) return null
  return modalSections.value.find(section => section.key === activeModalSectionKey.value) || modalSections.value[0]
})

const activeGroupHasChanges = computed(() => {
  if (!activeGroup.value) return false
  return groupChangedCount(activeGroup.value.key) > 0
})

let successMessageTimeout = null

function setSuccessMessage(message) {
  successMessage.value = message
  if (typeof window === 'undefined') return
  if (successMessageTimeout) {
    window.clearTimeout(successMessageTimeout)
  }
  successMessageTimeout = window.setTimeout(() => {
    successMessage.value = ''
    successMessageTimeout = null
  }, 4000)
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
  if (item.type === 'json') return 50000
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

function resetField(key) {
  editedValues.value[key] = originalValues.value[key]
}

function discardSectionChanges(sectionKey) {
  const sectionItems = localSections.value[sectionKey] || []
  for (const item of sectionItems) {
    editedValues.value[item.key] = originalValues.value[item.key]
  }
}

function discardChanges() {
  editedValues.value = { ...originalValues.value }
}

function setModalSection(sectionKey) {
  activeModalSectionKey.value = sectionKey
}

function lockBodyScroll() {
  if (typeof document === 'undefined') return
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return
  document.body.style.overflow = previousBodyOverflow
}

function openGroupModal(groupKey) {
  const group = sectionGroups.value.find(item => item.key === groupKey)
  if (!group) return

  activeGroupKey.value = groupKey
  modalQuery.value = ''
  activeModalSectionKey.value = group.sections[0]?.key || ''
  lockBodyScroll()
}

function closeGroupModal() {
  activeGroupKey.value = ''
  activeModalSectionKey.value = ''
  modalQuery.value = ''
  unlockBodyScroll()
}

function discardCurrentModalSection() {
  if (!currentModalSection.value) return
  discardSectionChanges(currentModalSection.value.key)
}

function saveCurrentModalSection() {
  if (!currentModalSection.value) return
  saveSection(currentModalSection.value.key)
}

async function saveGroup(groupKey) {
  const changedItems = getChangedItemsByGroup(groupKey)
  if (changedItems.length === 0) return

  savingGroupKey.value = groupKey
  try {
    await persistChangedItems(
      changedItems,
      `Se guardaron ${changedItems.length} cambio${changedItems.length !== 1 ? 's' : ''} en ${groupLabels[groupKey] || groupKey}.`
    )
  } finally {
    savingGroupKey.value = ''
  }
}

function saveActiveGroup() {
  if (!activeGroup.value) return
  saveGroup(activeGroup.value.key)
}

function updateLastSaved() {
  const savedAt = new Date().toISOString()
  lastSavedAt.value = savedAt
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LAST_SAVED_STORAGE_KEY, savedAt)
  }
}

function persistDraftToStorage() {
  if (!initialized.value || typeof window === 'undefined') return
  try {
    if (hasChanges.value) {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(editedValues.value))
    } else {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY)
    }
  } catch (_err) {
    // No-op: localStorage might be blocked in some contexts
  }
}

function restoreDraftIfAvailable() {
  if (typeof window === 'undefined') return
  const rawDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY)
  if (!rawDraft) return

  try {
    const parsedDraft = JSON.parse(rawDraft)
    if (!parsedDraft || typeof parsedDraft !== 'object') return

    const restored = { ...editedValues.value }
    let restoredCount = 0

    for (const key of Object.keys(originalValues.value)) {
      if (Object.prototype.hasOwnProperty.call(parsedDraft, key) && parsedDraft[key] !== restored[key]) {
        restored[key] = parsedDraft[key]
        restoredCount += 1
      }
    }

    if (restoredCount > 0) {
      editedValues.value = restored
      setSuccessMessage(`Se restauró un borrador local con ${restoredCount} cambio${restoredCount !== 1 ? 's' : ''}.`)
    }
  } catch (_err) {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY)
  }
}

async function persistChangedItems(changedItems, successText = '') {
  if (changedItems.length === 0) return false

  errorMsg.value = null
  successMessage.value = ''

  try {
    await api.put('/content/bulk', { items: changedItems })
    changedItems.forEach(item => {
      originalValues.value[item.key] = item.value
    })
    updateLastSaved()
    setSuccessMessage(
      successText ||
      `${changedItems.length} campo${changedItems.length !== 1 ? 's' : ''} actualizado${changedItems.length !== 1 ? 's' : ''} correctamente`
    )
    persistDraftToStorage()
    return true
  } catch (_err) {
    errorMsg.value = 'No se pudieron guardar los cambios. Asegurate de que el backend tenga la tabla site_contents creada (ejecutá la migración de Prisma).'
    return false
  }
}

async function saveSection(sectionKey) {
  const changedItems = getChangedItems(sectionKey)
  if (changedItems.length === 0) return

  savingSectionKey.value = sectionKey
  try {
    await persistChangedItems(
      changedItems,
      `Se guardó ${changedItems.length} cambio${changedItems.length !== 1 ? 's' : ''} en ${sectionLabels[sectionKey] || sectionKey}.`
    )
  } finally {
    savingSectionKey.value = ''
  }
}

async function saveAll() {
  const changedItems = getChangedItems()
  if (changedItems.length === 0) return

  saving.value = true
  try {
    await persistChangedItems(changedItems)
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

function handleBeforeUnload(event) {
  if (!hasChanges.value) return
  event.preventDefault()
  event.returnValue = ''
}

function handleGlobalKeydown(event) {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeGroupModal()
    return
  }

  const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's'
  if (!isSaveShortcut) return
  event.preventDefault()
  if (hasChanges.value && !saving.value && !savingSectionKey.value && !savingGroupKey.value) {
    saveAll()
  }
}

watch(
  editedValues,
  () => {
    persistDraftToStorage()
  },
  { deep: true }
)

watch(
  modalSections,
  sections => {
    if (!sections.length) {
      activeModalSectionKey.value = ''
      return
    }
    const stillExists = sections.some(section => section.key === activeModalSectionKey.value)
    if (!stillExists) {
      activeModalSectionKey.value = sections[0].key
    }
  }
)

onMounted(async () => {
  loading.value = true

  if (typeof window !== 'undefined') {
    const storedLastSaved = window.localStorage.getItem(LAST_SAVED_STORAGE_KEY)
    if (storedLastSaved) {
      lastSavedAt.value = storedLastSaved
    }
  }

  // Intentar cargar desde la API
  try {
    const { data } = await api.get('/content/sections')
    if (data.data && Object.keys(data.data).length > 0) {
      localSections.value = mergeSectionsWithDefaults(data.data)
    } else {
      localSections.value = buildSectionsFromDefaults()
    }
  } catch (_err) {
    // API no disponible, usar datos por defecto
    localSections.value = buildSectionsFromDefaults()
    errorMsg.value = 'La API de contenido no está disponible. Mostrando valores por defecto. Para guardar cambios, ejecutá la migración en el backend.'
  }

  initializeValues(localSections.value)
  restoreDraftIfAvailable()

  initialized.value = true

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('keydown', handleGlobalKeydown)
  }

  loading.value = false
})

onBeforeUnmount(() => {
  closeGroupModal()
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('keydown', handleGlobalKeydown)
    if (successMessageTimeout) {
      window.clearTimeout(successMessageTimeout)
      successMessageTimeout = null
    }
  }
})
</script>


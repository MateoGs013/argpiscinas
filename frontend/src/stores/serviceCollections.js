import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import {
  SERVICES_COLLECTIONS_CONTENT_KEY,
  SERVICES_COLLECTIONS_DEFAULTS,
  parseServicesCollectionsContent,
  serializeServicesCollectionsContent
} from '@/data/servicesCollectionsDefaults'

const SERVICES_COLLECTIONS_LABEL = 'Colecciones — Items'
const SERVICES_COLLECTIONS_SECTION = 'services'
const SERVICES_COLLECTIONS_TYPE = 'json'

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function ensureUniqueCollectionIds(collections) {
  const usedIds = new Set()
  return collections.map((collection, index) => {
    const baseId = slugify(collection.id || collection.name || `collection-${index + 1}`) || `collection-${index + 1}`
    let uniqueId = baseId
    let suffix = 2
    while (usedIds.has(uniqueId)) {
      uniqueId = `${baseId}-${suffix}`
      suffix += 1
    }
    usedIds.add(uniqueId)
    return {
      ...collection,
      id: uniqueId
    }
  })
}

export const useServiceCollectionsStore = defineStore('serviceCollections', () => {
  const collections = ref([])
  const loading = ref(false)
  const error = ref(null)
  const loaded = ref(false)

  function buildPayloadFromCollections(nextCollections) {
    return {
      key: SERVICES_COLLECTIONS_CONTENT_KEY,
      value: serializeServicesCollectionsContent(nextCollections),
      section: SERVICES_COLLECTIONS_SECTION,
      label: SERVICES_COLLECTIONS_LABEL,
      type: SERVICES_COLLECTIONS_TYPE
    }
  }

  async function fetchCollections(options = {}) {
    const force = Boolean(options.force)
    if (loaded.value && !force) {
      return collections.value
    }

    loading.value = true
    error.value = null

    try {
      const { data } = await api.get('/content/sections')
      const serviceSection = data?.data?.[SERVICES_COLLECTIONS_SECTION] || []
      const contentItem = serviceSection.find((item) => item.key === SERVICES_COLLECTIONS_CONTENT_KEY)
      const parsed = parseServicesCollectionsContent(contentItem?.value, SERVICES_COLLECTIONS_DEFAULTS)
      collections.value = ensureUniqueCollectionIds(parsed)
      loaded.value = true
      return collections.value
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar las colecciones de servicios'
      const fallback = parseServicesCollectionsContent('', SERVICES_COLLECTIONS_DEFAULTS)
      collections.value = ensureUniqueCollectionIds(fallback)
      loaded.value = true
      return collections.value
    } finally {
      loading.value = false
    }
  }

  async function persistCollections(nextCollections) {
    loading.value = true
    error.value = null

    try {
      const normalized = ensureUniqueCollectionIds(nextCollections)
      const payload = buildPayloadFromCollections(normalized)
      await api.put('/content/bulk', { items: [payload] })
      collections.value = normalized
      loaded.value = true
      return normalized
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al guardar las colecciones de servicios'
      return null
    } finally {
      loading.value = false
    }
  }

  async function createCollection(data) {
    const currentCollections = collections.value.length
      ? [...collections.value]
      : ensureUniqueCollectionIds(parseServicesCollectionsContent('', SERVICES_COLLECTIONS_DEFAULTS))

    const nextCollection = {
      id: slugify(data.id || data.name || `collection-${Date.now()}`),
      name: data.name || 'Nueva colección',
      type: data.type || '',
      description: data.description || '',
      heroImage: data.heroImage || '',
      swatches: Array.isArray(data.swatches) && data.swatches.length > 0 ? data.swatches : [{ name: 'Muestra 1', image: '' }],
      moreCount: Number.isInteger(Number(data.moreCount)) ? Number(data.moreCount) : 0
    }

    return persistCollections([...currentCollections, nextCollection])
  }

  async function updateCollection(id, data) {
    const nextCollections = [...collections.value]
    const index = nextCollections.findIndex((collection) => collection.id === id)
    if (index === -1) {
      error.value = 'Colección no encontrada'
      return null
    }

    const previous = nextCollections[index]
    nextCollections[index] = {
      ...previous,
      name: data.name ?? previous.name,
      type: data.type ?? previous.type,
      description: data.description ?? previous.description,
      heroImage: data.heroImage ?? previous.heroImage,
      swatches: Array.isArray(data.swatches) && data.swatches.length > 0 ? data.swatches : previous.swatches,
      moreCount: Number.isInteger(Number(data.moreCount)) ? Number(data.moreCount) : (previous.moreCount || 0)
    }

    return persistCollections(nextCollections)
  }

  async function deleteCollection(id) {
    if (collections.value.length <= 1) {
      error.value = 'Debe existir al menos una colección'
      return null
    }

    const nextCollections = collections.value.filter((collection) => collection.id !== id)
    if (nextCollections.length === collections.value.length) {
      error.value = 'Colección no encontrada'
      return null
    }

    return persistCollections(nextCollections)
  }

  function findById(id) {
    return collections.value.find((collection) => collection.id === id) || null
  }

  return {
    collections,
    loading,
    error,
    loaded,
    fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    findById
  }
})

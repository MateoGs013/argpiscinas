export const SERVICES_COLLECTIONS_CONTENT_KEY = 'services.collections.items'

export const SERVICES_COLLECTIONS_DEFAULTS = [
  {
    id: 'touch',
    name: 'ALKORPLAN TOUCH',
    type: 'Premium 2mm',
    description: 'Texturas y relieves inspirados en la naturaleza. La colección más exclusiva de RENOLIT ALKORPLAN.',
    heroImage: '/Renolit/04. touch/RENOLIT_TOUCH-Vanity-06.jpg',
    swatches: [
      { name: 'Vanity', image: '/Renolit/04. touch/RENOLIT_TOUCH-Vanity-06.jpg' },
      { name: 'Relax', image: '/Renolit/04. touch/RENOLIT_TOUCH-Relax-06.jpg' },
      { name: 'Elegance', image: '/Renolit/04. touch/RENOLIT_TOUCH_elegance_09A7068.jpg' },
      { name: 'Sublime', image: '/Renolit/04. touch/RENOLIT_TOUCH-Sublime-06.jpg' }
    ],
    moreCount: 3
  },
  {
    id: 'vogue',
    name: 'ALKORPLAN VOGUE',
    type: 'Premium 2mm',
    description: 'Estampados contemporáneos inspirados en tendencias de diseño interior y moda.',
    heroImage: '/Renolit/05. vogue/RENOLIT_VOGUE_urban_09A4055.jpg',
    swatches: [
      { name: 'Urban', image: '/Renolit/05. vogue/RENOLIT_VOGUE_urban_09A4055.jpg' },
      { name: 'Vintage', image: '/Renolit/05. vogue/RENOLIT_VOGUE_vintage_09A4191.jpg' },
      { name: 'Summer', image: '/Renolit/05. vogue/RENOLIT_VOGUE_summer_09A2892.jpg' },
      { name: 'Tropical', image: '/Renolit/05. vogue/RENOLIT_VOGUE_tropical_JMLR8244B.jpg' }
    ],
    moreCount: 0
  },
  {
    id: 'ceramics',
    name: 'ALKORPLAN CERAMICS',
    type: 'Premium 2mm',
    description: 'Efecto mosaico y piedra natural con relieve embosado. Elegancia clásica.',
    heroImage: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Selene.jpg',
    swatches: [
      { name: 'Selene', image: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Selene.jpg' },
      { name: 'Atenea', image: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Atenea.jpg' },
      { name: 'Etna', image: '/Renolit/03. ceramics/RENOLIT_texture CERAMICS_Etna.jpg' }
    ],
    moreCount: 0
  },
  {
    id: 'relief',
    name: 'ALKORPLAN RELIEF',
    type: 'Antideslizante',
    description: 'Superficie antideslizante certificada para zonas de baño y bordes de piscina.',
    heroImage: '/Renolit/07. relief/RENOLIT_RELIEF_azulclaro_AT2A6464.jpg',
    swatches: [
      { name: 'Azul Claro', image: '/Renolit/07. relief/RENOLIT_RELIEF_azulclaro_AT2A6464.jpg' },
      { name: 'Blanco', image: '/Renolit/07. relief/RENOLIT_RELIEF_blanco_AT2A6484.jpg' },
      { name: 'Arena', image: '/Renolit/07. relief/RENOLIT_RELIEF_arena_AT2A6420.jpg' },
      { name: 'Gris Claro', image: '/Renolit/07. relief/RENOLIT_RELIEF_grisclaro_AT2A6555.jpg' }
    ],
    moreCount: 4
  },
  {
    id: '2000',
    name: 'ALKORPLAN 2000',
    type: 'Estándar 1.5mm',
    description: 'Colores lisos lacados. La opción más popular y versátil del mercado.',
    heroImage: '/Renolit/01. 2000/RENOLIT_2000 light blue-6097-00016.jpg',
    swatches: [
      { name: 'Light Blue', image: '/Renolit/01. 2000/RENOLIT_2000 light blue-6097-00016.jpg' },
      { name: 'White', image: '/Renolit/01. 2000/RENOLIT_2000 white - 6097-00140.jpg' },
      { name: 'Sand', image: '/Renolit/01. 2000/RENOLIT_2000 sand - 6097-00058.jpg' },
      { name: 'Grey', image: '/Renolit/01. 2000/RENOLIT_2000 grey - 6097-00090.jpg' }
    ],
    moreCount: 4
  },
  {
    id: '3000',
    name: 'ALKORPLAN 3000',
    type: 'Estándar 1.5mm',
    description: 'Diseños estampados exclusivos con doble lacado. Efecto piedra y mármol.',
    heroImage: '/Renolit/02. 3000/RENOLIT_Marble-IMG_5913.jpg',
    swatches: [
      { name: 'Marble', image: '/Renolit/02. 3000/RENOLIT_Marble-IMG_5913.jpg' },
      { name: 'Carrara', image: '/Renolit/02. 3000/RENOLIT_Carrara-IMG_5941.jpg' },
      { name: 'Bysance Blue', image: '/Renolit/02. 3000/RENOLIT_Bysance Blue-IMG_5975.jpg' },
      { name: 'Persia Sand', image: '/Renolit/02. 3000/RENOLIT_Persia Sand-IMG_6001.jpg' }
    ],
    moreCount: 1
  }
]

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function toSlug(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeSwatch(swatch, index) {
  const baseName = String(swatch?.name || '').trim()
  const image = String(swatch?.image || '').trim()
  return {
    name: baseName || `Muestra ${index + 1}`,
    image
  }
}

function normalizeCollection(collection, index) {
  const name = String(collection?.name || '').trim() || `Colección ${index + 1}`
  const type = String(collection?.type || '').trim()
  const description = String(collection?.description || '').trim()
  const swatches = Array.isArray(collection?.swatches)
    ? collection.swatches.map((swatch, swatchIndex) => normalizeSwatch(swatch, swatchIndex))
    : []
  const fallbackImage = swatches[0]?.image || ''
  const heroImage = String(collection?.heroImage || '').trim() || fallbackImage
  const parsedMoreCount = Number.parseInt(collection?.moreCount, 10)

  if (swatches.length === 0) {
    swatches.push({
      name: 'Muestra 1',
      image: heroImage
    })
  }

  return {
    id: String(collection?.id || '').trim() || toSlug(name) || `collection-${index + 1}`,
    name,
    type,
    description,
    heroImage,
    swatches,
    moreCount: Number.isInteger(parsedMoreCount) && parsedMoreCount > 0 ? parsedMoreCount : 0
  }
}

export function buildServicesCollectionsContentValue() {
  return JSON.stringify(SERVICES_COLLECTIONS_DEFAULTS, null, 2)
}

export function parseServicesCollectionsContent(rawValue, fallbackCollections = SERVICES_COLLECTIONS_DEFAULTS) {
  const fallback = deepClone(fallbackCollections)

  if (Array.isArray(rawValue)) {
    const normalized = rawValue.map((collection, index) => normalizeCollection(collection, index))
    return normalized.length > 0 ? normalized : fallback
  }

  if (typeof rawValue !== 'string' || !rawValue.trim()) {
    return fallback
  }

  try {
    const parsed = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) {
      return fallback
    }
    const normalized = parsed.map((collection, index) => normalizeCollection(collection, index))
    return normalized.length > 0 ? normalized : fallback
  } catch (_error) {
    return fallback
  }
}

export function serializeServicesCollectionsContent(collections) {
  const normalized = parseServicesCollectionsContent(collections, SERVICES_COLLECTIONS_DEFAULTS)
  return JSON.stringify(normalized, null, 2)
}

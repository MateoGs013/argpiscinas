<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ isEdit ? 'Editar Colección' : 'Nueva Colección' }}</h1>
        <p class="text-neutral-600">Configura la colección y sus muestras para la página de servicios</p>
      </div>
      <RouterLink to="/admin/colecciones" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
        Volver
      </RouterLink>
    </div>

    <div class="card p-8 max-w-5xl">
      <div v-if="loading" class="py-16 text-center">
        <div class="inline-block w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <form v-else @submit.prevent="submitForm" class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="label" for="name">Nombre *</label>
            <input id="name" v-model="form.name" type="text" class="input" required />
          </div>
          <div>
            <label class="label" for="type">Tipo</label>
            <input id="type" v-model="form.type" type="text" class="input" placeholder="Premium 2mm" />
          </div>
        </div>

        <div>
          <label class="label" for="description">Descripción</label>
          <textarea id="description" v-model="form.description" rows="4" class="input resize-y"></textarea>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="label" for="moreCount">+ Extra</label>
            <input id="moreCount" v-model.number="form.moreCount" type="number" min="0" class="input" />
          </div>
        </div>

        <div>
          <label class="label">Imagen principal</label>
          <ImageUploader
            v-model="form.heroImage"
            aspect="video"
            tip="Imagen principal de la tarjeta de colección"
          />
          <div class="mt-3">
            <label class="label" for="heroImage">Ruta/URL (opcional)</label>
            <input id="heroImage" v-model="form.heroImage" type="text" class="input" placeholder="/uploads/imagen.jpg o https://..." />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-neutral-900">Muestras</h2>
            <button
              type="button"
              class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              @click="addSwatch"
            >
              Agregar muestra
            </button>
          </div>

          <div
            v-for="(swatch, index) in form.swatches"
            :key="`swatch-${index}`"
            class="border border-neutral-200 rounded-boutique p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-neutral-800">Muestra {{ index + 1 }}</h3>
              <button
                type="button"
                class="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="form.swatches.length <= 1"
                @click="removeSwatch(index)"
              >
                Eliminar
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="label">Nombre</label>
                <input v-model="swatch.name" type="text" class="input" required />
              </div>
              <div>
                <label class="label">Ruta/URL</label>
                <input v-model="swatch.image" type="text" class="input" placeholder="/uploads/swatch.jpg o https://..." />
              </div>
            </div>

            <ImageUploader
              v-model="swatch.image"
              aspect="square"
              tip="Imagen pequeña de muestra"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-100 rounded-boutique text-sm text-red-700">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end">
          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Colección') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ImageUploader from '@/components/admin/ImageUploader.vue'
import { useServiceCollectionsStore } from '@/stores/serviceCollections'

const route = useRoute()
const router = useRouter()
const collectionsStore = useServiceCollectionsStore()

const loading = ref(true)
const saving = ref(false)
const errorMessage = ref('')
const isEdit = computed(() => Boolean(route.params.id))

const form = reactive({
  name: '',
  type: '',
  description: '',
  heroImage: '',
  moreCount: 0,
  swatches: [{ name: 'Muestra 1', image: '' }]
})

function cloneSwatches(swatches = []) {
  if (!Array.isArray(swatches) || swatches.length === 0) {
    return [{ name: 'Muestra 1', image: '' }]
  }
  return swatches.map((swatch, index) => ({
    name: swatch?.name || `Muestra ${index + 1}`,
    image: swatch?.image || ''
  }))
}

function fillForm(collection) {
  form.name = collection.name || ''
  form.type = collection.type || ''
  form.description = collection.description || ''
  form.heroImage = collection.heroImage || ''
  form.moreCount = Number(collection.moreCount) || 0
  form.swatches = cloneSwatches(collection.swatches)
}

function addSwatch() {
  form.swatches.push({
    name: `Muestra ${form.swatches.length + 1}`,
    image: ''
  })
}

function removeSwatch(index) {
  if (form.swatches.length <= 1) return
  form.swatches.splice(index, 1)
}

function buildPayload() {
  return {
    name: form.name.trim(),
    type: form.type.trim(),
    description: form.description.trim(),
    heroImage: form.heroImage.trim(),
    moreCount: Number(form.moreCount) || 0,
    swatches: form.swatches
      .map((swatch, index) => ({
        name: String(swatch.name || '').trim() || `Muestra ${index + 1}`,
        image: String(swatch.image || '').trim()
      }))
      .filter((swatch) => swatch.name || swatch.image)
  }
}

async function submitForm() {
  errorMessage.value = ''
  const payload = buildPayload()

  if (!payload.name) {
    errorMessage.value = 'El nombre es obligatorio.'
    return
  }

  saving.value = true
  let result = null

  if (isEdit.value) {
    result = await collectionsStore.updateCollection(route.params.id, payload)
  } else {
    result = await collectionsStore.createCollection(payload)
  }

  saving.value = false

  if (!result) {
    errorMessage.value = collectionsStore.error || 'No se pudo guardar la colección.'
    return
  }

  router.push('/admin/colecciones')
}

onMounted(async () => {
  await collectionsStore.fetchCollections()

  if (isEdit.value) {
    const collection = collectionsStore.findById(route.params.id)
    if (!collection) {
      errorMessage.value = 'Colección no encontrada.'
      loading.value = false
      return
    }
    fillForm(collection)
  }

  loading.value = false
})
</script>

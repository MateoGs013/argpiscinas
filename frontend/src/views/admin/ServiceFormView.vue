<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ isEdit ? 'Editar Servicio' : 'Nuevo Servicio' }}</h1>
        <p class="text-neutral-600">Configura cómo se muestra el servicio en la web pública.</p>
      </div>
      <RouterLink to="/admin/servicios" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
        Volver
      </RouterLink>
    </div>

    <div class="card p-8 max-w-4xl">
      <div v-if="loading" class="py-16 text-center">
        <div class="inline-block w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <form v-else @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label class="label" for="title">Título *</label>
          <input id="title" v-model="form.title" type="text" class="input" required />
        </div>

        <div>
          <label class="label" for="description">Descripción</label>
          <textarea id="description" v-model="form.description" rows="4" class="input resize-y"></textarea>
        </div>

        <div>
          <label class="label" for="content">Contenido detallado (HTML opcional)</label>
          <textarea
            id="content"
            v-model="form.content"
            rows="10"
            class="input resize-y font-mono text-sm"
            placeholder="<h2>Título</h2><p>Texto del detalle del servicio...</p>"
          ></textarea>
          <p class="text-xs text-neutral-500 mt-2">
            Este contenido se muestra en la página de detalle del servicio.
          </p>
        </div>

        <div>
          <label class="label">Imagen del servicio</label>
          <ImageUploader
            v-model="form.image"
            aspect="video"
            tip="Subí una imagen o usá una URL externa. Esta imagen se muestra en la página de servicios."
          />
          <div class="mt-3">
            <label class="label" for="image">Ruta/URL de imagen (opcional)</label>
            <input id="image" v-model="form.image" type="text" class="input" placeholder="/uploads/imagen.jpg o https://..." />
          </div>
        </div>

        <div>
          <label class="label" for="features">Características (una por línea)</label>
          <textarea
            id="features"
            v-model="form.featuresText"
            rows="6"
            class="input resize-y"
            placeholder="Garantía de 15 años&#10;Materiales certificados"
          ></textarea>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="label" for="order">Orden</label>
            <input id="order" v-model.number="form.order" type="number" min="0" class="input" />
          </div>
          <div class="flex items-center pt-7">
            <label class="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input v-model="form.showOnHome" type="checkbox" class="w-4 h-4" />
              Mostrar en la home
            </label>
          </div>
        </div>

        <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-100 rounded-boutique text-sm text-red-700">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end">
          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Servicio') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServicesStore } from '@/stores/services'
import ImageUploader from '@/components/admin/ImageUploader.vue'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()

const loading = ref(true)
const saving = ref(false)
const errorMessage = ref('')
const isEdit = computed(() => Boolean(route.params.id))

const form = reactive({
  title: '',
  description: '',
  content: '',
  image: '',
  featuresText: '',
  order: 0,
  showOnHome: false
})

function fillForm(service) {
  form.title = service.title || ''
  form.description = service.description || ''
  form.content = service.content || ''
  form.image = service.image || ''
  form.featuresText = Array.isArray(service.features) ? service.features.join('\n') : ''
  form.order = service.order || 0
  form.showOnHome = Boolean(service.showOnHome)
}

function buildPayload() {
  const features = form.featuresText
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  return {
    title: form.title,
    description: form.description || null,
    content: form.content || null,
    image: form.image || null,
    features,
    order: Number(form.order) || 0,
    showOnHome: form.showOnHome
  }
}

async function submitForm() {
  saving.value = true
  errorMessage.value = ''

  const payload = buildPayload()
  let ok = false

  if (isEdit.value) {
    ok = Boolean(await servicesStore.updateService(route.params.id, payload))
  } else {
    ok = Boolean(await servicesStore.createService(payload))
  }

  saving.value = false

  if (!ok) {
    errorMessage.value = servicesStore.error || 'No se pudo guardar el servicio.'
    return
  }

  router.push('/admin/servicios')
}

onMounted(async () => {
  await servicesStore.fetchServices()

  if (isEdit.value) {
    const serviceId = Number(route.params.id)
    const service = servicesStore.services.find((item) => item.id === serviceId)

    if (!service) {
      errorMessage.value = 'Servicio no encontrado.'
      loading.value = false
      return
    }

    fillForm(service)
  }

  loading.value = false
})
</script>

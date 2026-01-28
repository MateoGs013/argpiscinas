<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="text-primary-300 font-semibold text-sm uppercase tracking-wider mb-4 block">Nuestro Blog</span>
          <h1 class="text-white mb-6">Consejos y Novedades sobre Piscinas</h1>
          <p class="text-xl text-white/80">
            Mantente informado con los últimos artículos sobre mantenimiento, tendencias 
            y consejos para tu piscina.
          </p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-6 bg-white border-b sticky top-16 z-30">
      <div class="container-custom">
        <div class="flex items-center space-x-4 overflow-x-auto pb-2">
          <RouterLink 
            to="/blog"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              !route.query.categoria 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
          >
            Todos
          </RouterLink>
          <RouterLink 
            v-for="category in categories" 
            :key="category.id"
            :to="{ path: '/blog', query: { categoria: category.slug } }"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              route.query.categoria === category.slug 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
          >
            {{ category.name }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Posts -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-neutral-600">Cargando artículos...</p>
        </div>

        <div v-else-if="posts.length === 0" class="text-center py-20">
          <svg class="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p class="text-neutral-600">No hay artículos en esta categoría</p>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in posts" 
            :key="post.id"
            class="card overflow-hidden group"
          >
            <RouterLink :to="`/blog/${post.slug}`" class="block">
              <div class="relative aspect-video overflow-hidden">
                <img 
                  :src="post.featuredImage || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'" 
                  :alt="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div v-if="post.categories && post.categories.length > 0" class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                    {{ post.categories[0].name }}
                  </span>
                </div>
              </div>
            </RouterLink>
            <div class="p-6">
              <div class="flex items-center text-sm text-neutral-500 mb-3">
                <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
                <span class="mx-2">·</span>
                <span>{{ post.readTime || '5' }} min de lectura</span>
              </div>
              <RouterLink :to="`/blog/${post.slug}`">
                <h2 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {{ post.title }}
                </h2>
              </RouterLink>
              <p class="text-neutral-600 line-clamp-3 mb-4">{{ post.excerpt }}</p>
              <RouterLink 
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Leer más
                <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RouterLink>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <nav class="flex space-x-2">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-10 h-10 rounded-full font-medium transition-all',
                currentPage === page 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              ]"
            >
              {{ page }}
            </button>
          </nav>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="py-20 bg-primary-600">
      <div class="container-custom text-center">
        <h2 class="text-white mb-6">Suscríbete a Nuestro Newsletter</h2>
        <p class="text-primary-100 text-xl mb-10 max-w-2xl mx-auto">
          Recibe consejos exclusivos y las últimas novedades directamente en tu correo.
        </p>
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex gap-4">
          <input 
            v-model="newsletterEmail"
            type="email" 
            placeholder="Tu email"
            required
            class="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white"
          />
          <button type="submit" class="btn bg-white text-primary-600 hover:bg-primary-50">
            Suscribir
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useCategoriesStore } from '@/stores/categories'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Blog de Piscinas | Consejos y Novedades',
  description: 'Artículos, consejos y novedades sobre instalación, rehabilitación y mantenimiento de piscinas con lámina armada.',
  keywords: 'blog piscinas, consejos piscinas, mantenimiento piscinas, lámina armada blog'
})

const route = useRoute()
const postsStore = usePostsStore()
const categoriesStore = useCategoriesStore()

const loading = ref(true)
const currentPage = ref(1)
const newsletterEmail = ref('')

const posts = computed(() => postsStore.posts)
const categories = computed(() => categoriesStore.categories)
const totalPages = computed(() => Math.ceil(postsStore.total / 9))

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const subscribeNewsletter = () => {
  // TODO: Implement newsletter subscription
  alert('¡Gracias por suscribirte!')
  newsletterEmail.value = ''
}

const fetchPosts = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      limit: 9,
      published: true
    }
    
    if (route.query.categoria) {
      params.category = route.query.categoria
    }
    
    await postsStore.fetchPosts(params)
    await categoriesStore.fetchCategories()
  } catch (error) {
    console.error('Error loading posts:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)
watch(() => route.query.categoria, fetchPosts)
watch(currentPage, fetchPosts)
</script>

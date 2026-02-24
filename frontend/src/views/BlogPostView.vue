<template>
  <div>
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-midnight-800">
      <div class="inline-block w-6 h-6 border-2 border-silver-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="!post" class="min-h-screen flex items-center justify-center bg-midnight-800">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-white mb-6">Artículo no encontrado</h1>
        <RouterLink to="/blog" class="btn btn-white">Ver todos los artículos</RouterLink>
      </div>
    </div>

    <article v-else>
      <!-- Hero -->
      <section class="relative py-40 bg-midnight-800 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-charcoal-600/30 to-midnight-800"></div>
        <div class="container-custom relative z-10">
          <RouterLink to="/blog" class="inline-flex items-center text-silver-400/60 hover:text-silver-300 mb-8 transition-colors duration-300 text-sm tracking-wide">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </RouterLink>
          <div class="max-w-3xl">
            <div v-if="post.categories && post.categories.length > 0" class="mb-6">
              <span class="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-silver-300 text-xs font-medium tracking-widest uppercase rounded-full">
                {{ post.categories[0].name }}
              </span>
            </div>
            <h1 class="text-white mb-8 leading-[1.1]">{{ post.title }}</h1>
            <div class="flex items-center text-silver-400/70 space-x-4 text-sm">
              <div class="flex items-center">
                <div class="w-9 h-9 bg-charcoal-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                  {{ post.author?.name?.[0] || 'A' }}
                </div>
                <span>{{ post.author?.name || 'Admin' }}</span>
              </div>
              <span class="text-silver-400/30">·</span>
              <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
              <span class="text-silver-400/30">·</span>
              <span>{{ post.readTime || '5' }} min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Image -->
      <section v-if="post.featuredImage" class="bg-neutral-50 py-10">
        <div class="container-custom">
          <div class="aspect-cinematic max-w-4xl mx-auto rounded-boutique-lg overflow-hidden shadow-xl">
            <img 
              :src="resolveImageUrl(post.featuredImage)" 
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="section-padding bg-neutral-50">
        <div class="container-custom">
          <div class="grid lg:grid-cols-4 gap-14">
            <!-- Main Content -->
            <div class="lg:col-span-3">
              <div class="prose prose-lg max-w-none" v-html="post.content"></div>

              <!-- Tags -->
              <div v-if="post.tags && post.tags.length > 0" class="mt-14 pt-8 border-t border-neutral-200">
                <div class="flex flex-wrap gap-2">
                  <span class="text-neutral-400 font-medium text-sm mr-2">Etiquetas:</span>
                  <RouterLink 
                    v-for="tag in post.tags" 
                    :key="tag.id"
                    :to="{ path: '/blog', query: { tag: tag.slug } }"
                    class="px-4 py-1.5 bg-neutral-100 text-neutral-500 text-xs tracking-wide rounded-full hover:bg-neutral-200 transition-colors duration-300"
                  >
                    {{ tag.name }}
                  </RouterLink>
                </div>
              </div>

              <!-- Share -->
              <div class="mt-8 pt-8 border-t border-neutral-200">
                <div class="flex items-center space-x-3">
                  <span class="text-neutral-400 font-medium text-sm">Compartir:</span>
                  <a 
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
                    target="_blank"
                    rel="noopener"
                    class="w-10 h-10 bg-neutral-100 rounded-boutique flex items-center justify-center text-neutral-500 hover:bg-midnight-800 hover:text-white transition-all duration-400"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                    target="_blank"
                    rel="noopener"
                    class="w-10 h-10 bg-neutral-100 rounded-boutique flex items-center justify-center text-neutral-500 hover:bg-midnight-800 hover:text-white transition-all duration-400"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`"
                    target="_blank"
                    rel="noopener"
                    class="w-10 h-10 bg-neutral-100 rounded-boutique flex items-center justify-center text-neutral-500 hover:bg-midnight-800 hover:text-white transition-all duration-400"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 space-y-6">
                <!-- Table of Contents -->
                <div v-if="tableOfContents.length > 0" class="bg-white rounded-boutique-lg p-7 border border-neutral-100">
                  <h3 class="font-bold text-neutral-900 text-sm mb-5 uppercase tracking-wide">Índice</h3>
                  <nav>
                    <ul class="space-y-3 text-xs">
                      <li v-for="item in tableOfContents" :key="item.id">
                        <a 
                          :href="`#${item.id}`"
                          class="text-neutral-500 hover:text-midnight-800 transition-colors duration-300"
                        >
                          {{ item.text }}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <!-- CTA -->
                <div class="bg-midnight-800 rounded-boutique-lg p-7">
                  <h3 class="text-lg font-bold text-white mb-4">¿Tienes preguntas?</h3>
                  <p class="text-silver-400 text-sm mb-6 leading-relaxed">
                    Nuestro equipo está listo para resolver cualquier duda.
                  </p>
                  <RouterLink to="/contacto" class="btn btn-white w-full text-sm">
                    Contactar
                  </RouterLink>
                </div>

                <!-- Related Posts -->
                <div v-if="relatedPosts.length > 0" class="bg-white rounded-boutique-lg p-7 border border-neutral-100">
                  <h3 class="font-bold text-neutral-900 text-sm mb-5 uppercase tracking-wide">Artículos Relacionados</h3>
                  <div class="space-y-5">
                    <RouterLink 
                      v-for="related in relatedPosts" 
                      :key="related.id"
                      :to="`/blog/${related.slug}`"
                      class="block group"
                    >
                      <h4 class="font-medium text-neutral-900 text-sm group-hover:text-charcoal-500 transition-colors line-clamp-2">
                        {{ related.title }}
                      </h4>
                      <time class="text-xs text-neutral-400 tracking-wide">{{ formatDate(related.publishedAt) }}</time>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useSeo, useStructuredData } from '@/composables/useSeo'
import { resolveImageUrl } from '@/services/api'

const route = useRoute()
const postsStore = usePostsStore()
const loading = ref(true)
const tableOfContents = ref([])

const post = computed(() => postsStore.currentPost)
const relatedPosts = computed(() => postsStore.posts.filter(p => p.id !== post.value?.id).slice(0, 3))
const currentUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const extractTableOfContents = (content) => {
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[23]>/gi
  const matches = []
  let match
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3]
    })
  }
  return matches
}

const fetchPost = async () => {
  loading.value = true
  try {
    await postsStore.fetchPostBySlug(route.params.slug)
    
    if (post.value) {
      useSeo({
        title: post.value.title,
        description: post.value.excerpt || post.value.content?.substring(0, 160),
        image: resolveImageUrl(post.value.featuredImage),
        type: 'article'
      })
      
      useStructuredData('article', {
        headline: post.value.title,
        description: post.value.excerpt,
        image: resolveImageUrl(post.value.featuredImage),
        datePublished: post.value.publishedAt,
        dateModified: post.value.updatedAt,
        author: post.value.author?.name || 'ARG Piscinas'
      })
      
      if (post.value.content) {
        tableOfContents.value = extractTableOfContents(post.value.content)
      }
    }
  } catch (error) {
    console.error('Error loading post:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPost)
watch(() => route.params.slug, fetchPost)
</script>

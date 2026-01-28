import { useHead } from '@vueuse/head'
import { computed, unref } from 'vue'

/**
 * Composable for managing SEO meta tags
 */
export function useSeo(options = {}) {
  const defaultOptions = {
    title: 'ARG Piscinas',
    description: 'Especialistas en instalación y rehabilitación de piscinas con lámina armada. Más de 15 años de experiencia.',
    keywords: 'piscinas, lámina armada, rehabilitación piscinas, impermeabilización, construcción piscinas',
    image: '/images/og-image.jpg',
    url: typeof window !== 'undefined' ? window.location.href : '',
    type: 'website',
    siteName: 'ARG Piscinas'
  }

  const seoOptions = computed(() => ({
    ...defaultOptions,
    ...unref(options)
  }))

  useHead({
    title: computed(() => {
      const title = seoOptions.value.title
      if (title === 'ARG Piscinas') return title
      return `${title} | ARG Piscinas`
    }),
    meta: [
      // Basic meta
      {
        name: 'description',
        content: computed(() => seoOptions.value.description)
      },
      {
        name: 'keywords',
        content: computed(() => seoOptions.value.keywords)
      },
      
      // Open Graph
      {
        property: 'og:title',
        content: computed(() => seoOptions.value.title)
      },
      {
        property: 'og:description',
        content: computed(() => seoOptions.value.description)
      },
      {
        property: 'og:image',
        content: computed(() => seoOptions.value.image)
      },
      {
        property: 'og:url',
        content: computed(() => seoOptions.value.url)
      },
      {
        property: 'og:type',
        content: computed(() => seoOptions.value.type)
      },
      {
        property: 'og:site_name',
        content: computed(() => seoOptions.value.siteName)
      },
      
      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: computed(() => seoOptions.value.title)
      },
      {
        name: 'twitter:description',
        content: computed(() => seoOptions.value.description)
      },
      {
        name: 'twitter:image',
        content: computed(() => seoOptions.value.image)
      },
      
      // Additional
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'author',
        content: 'ARG Piscinas'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: computed(() => seoOptions.value.url)
      }
    ]
  })

  return { seoOptions }
}

/**
 * Generate JSON-LD structured data
 */
export function useStructuredData(type, data) {
  const structuredData = computed(() => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ARG Piscinas',
          description: data.description || 'Especialistas en instalación y rehabilitación de piscinas con lámina armada.',
          url: data.url || 'https://argpiscinas.com',
          logo: data.logo || 'https://argpiscinas.com/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.phone || '+34 XXX XXX XXX',
            contactType: 'customer service',
            areaServed: 'ES',
            availableLanguage: 'Spanish'
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'ES'
          },
          sameAs: data.social || []
        }

      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ARG Piscinas',
          description: data.description || 'Especialistas en instalación y rehabilitación de piscinas con lámina armada.',
          image: data.image || 'https://argpiscinas.com/images/og-image.jpg',
          url: data.url || 'https://argpiscinas.com',
          telephone: data.phone || '+34 XXX XXX XXX',
          priceRange: '€€€',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'ES'
          },
          geo: data.geo || {},
          openingHours: data.hours || 'Mo-Fr 09:00-18:00'
        }

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          image: data.image,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt || data.publishedAt,
          author: {
            '@type': 'Person',
            name: data.author || 'ARG Piscinas'
          },
          publisher: {
            '@type': 'Organization',
            name: 'ARG Piscinas',
            logo: {
              '@type': 'ImageObject',
              url: 'https://argpiscinas.com/logo.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          }
        }

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'ARG Piscinas'
          },
          areaServed: {
            '@type': 'Country',
            name: 'España'
          },
          serviceType: data.type || 'Instalación de piscinas'
        }

      default:
        return data
    }
  })

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: computed(() => JSON.stringify(structuredData.value))
      }
    ]
  })

  return { structuredData }
}

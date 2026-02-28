import { useHead } from '@vueuse/head'
import { computed, unref } from 'vue'

function normalizeBaseUrl(url) {
  return String(url || '').replace(/\/+$/, '')
}

function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL
  if (fromEnv) return normalizeBaseUrl(fromEnv)
  if (typeof window !== 'undefined' && window.location?.origin) return normalizeBaseUrl(window.location.origin)
  return 'https://argpiscinas.com'
}

function toAbsoluteUrl(url, siteUrl = getSiteUrl()) {
  if (!url) return siteUrl
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`
}

/**
 * Composable for managing SEO meta tags
 */
export function useSeo(options = {}) {
  const siteUrl = getSiteUrl()

  const defaultOptions = {
    title: 'ARG Piscinas',
    description: 'Especialistas en instalación y rehabilitación de piscinas con lámina armada. Más de 15 años de experiencia.',
    keywords: 'piscinas, lámina armada, rehabilitación piscinas, impermeabilización, construcción piscinas',
    image: '/ArgPiscinas/ARG PISCINAS LOGO OK sin fondo.png',
    url: typeof window !== 'undefined' ? window.location.href : siteUrl,
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
        content: computed(() => toAbsoluteUrl(seoOptions.value.image, siteUrl))
      },
      {
        property: 'og:url',
        content: computed(() => toAbsoluteUrl(seoOptions.value.url, siteUrl))
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
        content: computed(() => toAbsoluteUrl(seoOptions.value.image, siteUrl))
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
        href: computed(() => toAbsoluteUrl(seoOptions.value.url, siteUrl))
      }
    ]
  })

  return { seoOptions }
}

/**
 * Generate JSON-LD structured data
 */
export function useStructuredData(type, data) {
  const siteUrl = getSiteUrl()

  const structuredData = computed(() => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ARG Piscinas',
          description: data.description || 'Especialistas en instalación y rehabilitación de piscinas con lámina armada.',
          url: data.url || siteUrl,
          logo: data.logo || `${siteUrl}/ArgPiscinas/LOGO NAV.png`,
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
          image: data.image || `${siteUrl}/ArgPiscinas/ARG PISCINAS LOGO OK sin fondo.png`,
          url: data.url || siteUrl,
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
              url: `${siteUrl}/ArgPiscinas/LOGO NAV.png`
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

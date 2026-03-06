import { computed } from 'vue'
import { useContent } from '@/composables/useContent'

function normalizePhoneForHref(phone) {
  if (!phone) return ''
  return String(phone).replace(/[^\d+]/g, '')
}

function withHttp(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

export function useSiteConfig() {
  const { t } = useContent()

  const siteName = computed(() => t('site.brand.name', 'ARG Piscinas'))
  const siteUrl = computed(() => {
    const fallback = typeof window !== 'undefined' ? window.location.origin : 'https://argpiscinas.com'
    const configured = import.meta.env.VITE_SITE_URL || fallback
    return configured.replace(/\/+$/, '')
  })

  const phone = computed(() => t('site.contact.phone', t('contact.info.phone', import.meta.env.VITE_COMPANY_PHONE || '+34 900 000 000')))
  const email = computed(() => t('site.contact.email', t('contact.info.email', 'info@argpiscinas.com')))
  const whatsappPhone = computed(() => t('site.contact.whatsapp', t('contact.info.whatsapp', phone.value)))
  const addressLine1 = computed(() => t('site.contact.address_line1', t('contact.info.address_line1', 'Calle Ejemplo 123')))
  const addressLine2 = computed(() => t('site.contact.address_line2', t('contact.info.address_line2', '28001 Madrid')))
  const schedule = computed(() => t('site.contact.schedule', t('contact.info.schedule', 'Lun - Vie: 9:00 - 19:00')))
  const mapEmbedUrl = computed(() => t('site.contact.map_embed_url', t('contact.info.map_embed_url', '')))

  const phoneHref = computed(() => `tel:${normalizePhoneForHref(phone.value)}`)
  const whatsappHref = computed(() => {
    const normalized = normalizePhoneForHref(whatsappPhone.value).replace('+', '')
    return normalized ? `https://wa.me/${normalized}` : ''
  })
  const emailHref = computed(() => `mailto:${email.value}`)

  const socialLinks = computed(() => {
    const facebook = withHttp(t('site.social.facebook', 'https://facebook.com/argpiscinas'))
    const instagram = withHttp(t('site.social.instagram', 'https://instagram.com/argpiscinas'))
    const linkedin = withHttp(t('site.social.linkedin', 'https://linkedin.com/company/argpiscinas'))

    return [
      { name: 'Facebook', url: facebook },
      { name: 'Instagram', url: instagram },
      { name: 'LinkedIn', url: linkedin }
    ].filter((item) => item.url)
  })

  return {
    siteName,
    siteUrl,
    phone,
    phoneHref,
    email,
    emailHref,
    whatsappPhone,
    whatsappHref,
    addressLine1,
    addressLine2,
    schedule,
    mapEmbedUrl,
    socialLinks
  }
}

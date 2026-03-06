import { computed } from 'vue'
import { useContentStore } from '@/stores/content'

/**
 * Composable para usar contenido dinámico del CMS en vistas públicas.
 * Proporciona valores con fallback a los textos por defecto.
 * 
 * Uso:
 *   const { t } = useContent()
 *   t('home.hero.title', 'Texto por defecto')
 */
export function useContent() {
  const contentStore = useContentStore()

  // Cargar contenido si no se ha cargado aún
  if (!contentStore.loaded) {
    contentStore.fetchContent()
  }

  /**
   * Obtener un valor de contenido con fallback
   * @param {string} key - Clave del contenido (ej: 'home.hero.title')
   * @param {string} fallback - Valor por defecto si no existe
   * @returns {string}
   */
  function t(key, fallback = '') {
    return contentStore.get(key, fallback)
  }

  /**
   * Obtener un valor como computed (reactivo)
   * @param {string} key
   * @param {string} fallback
   * @returns {ComputedRef<string>}
   */
  function tc(key, fallback = '') {
    return computed(() => contentStore.get(key, fallback))
  }

  return {
    t,
    tc,
    loading: computed(() => contentStore.loading),
    loaded: computed(() => contentStore.loaded)
  }
}

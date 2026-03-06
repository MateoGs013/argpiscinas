import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Public views
import HomeView from '@/views/HomeView.vue'

const routes = [
  // =====================
  // PUBLIC ROUTES
  // =====================
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Inicio' }
  },
  {
    path: '/servicios',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Servicios' }
  },
  // dynamic service detail route (loads generic view)
  {
    path: '/servicios/:slug',
    name: 'service-detail',
    component: () => import('@/views/services/ServiceDetailView.vue'),
    meta: { title: 'Servicio' }
  },
  {
    path: '/proyectos',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Proyectos' }
  },
  {
    path: '/proyectos/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: { title: 'Proyecto' }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: 'Blog' }
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('@/views/BlogPostView.vue'),
    meta: { title: 'Artículo' }
  },
  {
    path: '/blog/categoria/:slug',
    name: 'blog-category',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: 'Categoría' }
  },
  {
    path: '/nosotros',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Sobre Nosotros' }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contacto' }
  },
  {
    path: '/privacidad',
    name: 'privacy',
    component: () => import('@/views/LegalPageView.vue'),
    meta: {
      title: 'Política de Privacidad',
      legalPage: {
        heading: 'Política de Privacidad',
        intro: 'Información sobre cómo tratamos y protegemos tus datos personales en ARG Piscinas.',
        sections: [
          {
            title: 'Responsable',
            content: 'ARG Piscinas es responsable del tratamiento de los datos enviados desde el formulario de contacto y canales habilitados en este sitio web.'
          },
          {
            title: 'Finalidad',
            content: 'Utilizamos tus datos para responder consultas, preparar presupuestos y mantener la comunicación sobre servicios solicitados.'
          },
          {
            title: 'Derechos',
            content: 'Podés solicitar acceso, rectificación o eliminación de tus datos escribiendo a info@argpiscinas.com.'
          }
        ]
      }
    }
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('@/views/LegalPageView.vue'),
    meta: {
      title: 'Política de Cookies',
      legalPage: {
        heading: 'Política de Cookies',
        intro: 'Este sitio utiliza cookies técnicas para su funcionamiento y cookies de análisis para mejorar la experiencia.',
        sections: [
          {
            title: 'Qué son las cookies',
            content: 'Las cookies son pequeños archivos de texto que se almacenan en tu navegador para recordar preferencias y mejorar la navegación.'
          },
          {
            title: 'Tipos de cookies',
            content: 'Usamos cookies esenciales para el funcionamiento del sitio y, cuando corresponde, cookies analíticas para métricas de uso.'
          },
          {
            title: 'Cómo desactivarlas',
            content: 'Podés gestionar o eliminar cookies desde la configuración de tu navegador en cualquier momento.'
          }
        ]
      }
    }
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('@/views/LegalPageView.vue'),
    meta: {
      title: 'Aviso Legal',
      legalPage: {
        heading: 'Aviso Legal',
        intro: 'Condiciones de uso de este sitio web y responsabilidades de la información publicada.',
        sections: [
          {
            title: 'Titularidad',
            content: 'El presente sitio pertenece a ARG Piscinas y su contenido tiene fines informativos y comerciales sobre servicios de instalación y rehabilitación de piscinas.'
          },
          {
            title: 'Propiedad intelectual',
            content: 'Los textos, imágenes y marcas mostradas están protegidos por normativa aplicable y no pueden reproducirse sin autorización.'
          },
          {
            title: 'Responsabilidad',
            content: 'ARG Piscinas no se responsabiliza por interrupciones del servicio o enlaces externos de terceros fuera de su control.'
          }
        ]
      }
    }
  },

  // =====================
  // AUTH ROUTES
  // =====================
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/LoginView.vue'),
    meta: { title: 'Iniciar Sesión', guest: true }
  },

  // =====================
  // ADMIN ROUTES
  // =====================
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { title: 'Dashboard', requiresAuth: true }
  },
  {
    path: '/admin/posts',
    name: 'admin-posts',
    component: () => import('@/views/admin/PostsListView.vue'),
    meta: { title: 'Posts', requiresAuth: true }
  },
  {
    path: '/admin/posts/nuevo',
    name: 'admin-post-new',
    component: () => import('@/views/admin/PostFormView.vue'),
    meta: { title: 'Nuevo Post', requiresAuth: true }
  },
  {
    path: '/admin/posts/:id',
    name: 'admin-post-edit',
    component: () => import('@/views/admin/PostFormView.vue'),
    meta: { title: 'Editar Post', requiresAuth: true }
  },
  {
    path: '/admin/categorias',
    name: 'admin-categories',
    component: () => import('@/views/admin/CategoriesView.vue'),
    meta: { title: 'Categorías', requiresAuth: true }
  },
  {
    path: '/admin/tags',
    name: 'admin-tags',
    component: () => import('@/views/admin/TagsView.vue'),
    meta: { title: 'Tags', requiresAuth: true }
  },
  {
    path: '/admin/proyectos',
    name: 'admin-projects',
    component: () => import('@/views/admin/ProjectsListView.vue'),
    meta: { title: 'Proyectos', requiresAuth: true }
  },
  {
    path: '/admin/proyectos/nuevo',
    name: 'admin-project-new',
    component: () => import('@/views/admin/ProjectFormView.vue'),
    meta: { title: 'Nuevo Proyecto', requiresAuth: true }
  },
  {
    path: '/admin/proyectos/:id',
    name: 'admin-project-edit',
    component: () => import('@/views/admin/ProjectFormView.vue'),
    meta: { title: 'Editar Proyecto', requiresAuth: true }
  },
  {
    path: '/admin/contenido',
    name: 'admin-content',
    component: () => import('@/views/admin/ContentView.vue'),
    meta: { title: 'Contenido', requiresAuth: true }
  },
  {
    path: '/admin/contactos',
    name: 'admin-contacts',
    component: () => import('@/views/admin/ContactsView.vue'),
    meta: { title: 'Contactos', requiresAuth: true }
  },
  {
    path: '/admin/servicios',
    name: 'admin-services',
    component: () => import('@/views/admin/ServicesListView.vue'),
    meta: { title: 'Servicios', requiresAuth: true }
  },
  {
    path: '/admin/servicios/nuevo',
    name: 'admin-service-new',
    component: () => import('@/views/admin/ServiceFormView.vue'),
    meta: { title: 'Nuevo Servicio', requiresAuth: true }
  },
  {
    path: '/admin/servicios/:id',
    name: 'admin-service-edit',
    component: () => import('@/views/admin/ServiceFormView.vue'),
    meta: { title: 'Editar Servicio', requiresAuth: true }
  },
  {
    path: '/admin/colecciones',
    name: 'admin-service-collections',
    component: () => import('@/views/admin/ServiceCollectionsListView.vue'),
    meta: { title: 'Colecciones', requiresAuth: true }
  },
  {
    path: '/admin/colecciones/nueva',
    name: 'admin-service-collection-new',
    component: () => import('@/views/admin/ServiceCollectionFormView.vue'),
    meta: { title: 'Nueva Colección', requiresAuth: true }
  },
  {
    path: '/admin/colecciones/:id',
    name: 'admin-service-collection-edit',
    component: () => import('@/views/admin/ServiceCollectionFormView.vue'),
    meta: { title: 'Editar Colección', requiresAuth: true }
  },

  // =====================
  // 404
  // =====================
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Update document title
  const baseTitle = 'ARG Piscinas'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle

  // Check authentication for protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'admin-login', query: { redirect: to.fullPath } })
    return
  }

  // Redirect authenticated users away from guest-only pages
  if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'admin' })
    return
  }

  next()
})

export default router

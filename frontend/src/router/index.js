import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // =====================
  // PUBLIC ROUTES
  // =====================
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Inicio' }
  },
  {
    path: '/servicios',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Servicios' }
  },
  {
    path: '/servicios/instalacion-lamina-armada',
    name: 'service-installation',
    component: () => import('@/views/services/InstallationView.vue'),
    meta: { title: 'Instalación de Lámina Armada' }
  },
  {
    path: '/servicios/rehabilitacion-piscinas',
    name: 'service-rehabilitation',
    component: () => import('@/views/services/RehabilitationView.vue'),
    meta: { title: 'Rehabilitación de Piscinas' }
  },
  {
    path: '/servicios/impermeabilizacion',
    name: 'service-waterproofing',
    component: () => import('@/views/services/WaterproofingView.vue'),
    meta: { title: 'Impermeabilización' }
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
    meta: { title: 'Categorías', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/tags',
    name: 'admin-tags',
    component: () => import('@/views/admin/TagsView.vue'),
    meta: { title: 'Tags', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/proyectos',
    name: 'admin-projects',
    component: () => import('@/views/admin/ProjectsListView.vue'),
    meta: { title: 'Proyectos', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/proyectos/nuevo',
    name: 'admin-project-new',
    component: () => import('@/views/admin/ProjectFormView.vue'),
    meta: { title: 'Nuevo Proyecto', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/proyectos/:id',
    name: 'admin-project-edit',
    component: () => import('@/views/admin/ProjectFormView.vue'),
    meta: { title: 'Editar Proyecto', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/contenido',
    name: 'admin-content',
    component: () => import('@/views/admin/ContentView.vue'),
    meta: { title: 'Contenido', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/contactos',
    name: 'admin-contacts',
    component: () => import('@/views/admin/ContactsView.vue'),
    meta: { title: 'Contactos', requiresAuth: true, requiresAdmin: true }
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

  // Check admin role for admin-only routes
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'admin' })
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

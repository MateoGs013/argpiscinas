import { SERVICES_COLLECTIONS_CONTENT_KEY } from '@/data/servicesCollectionsDefaults'

export const sectionLabels = {
  'home.hero': 'Inicio — Hero',
  'home.renolit': 'Inicio — RENOLIT ALKORPLAN',
  'home.services': 'Inicio — Servicios',
  'home.benefits': 'Inicio — Beneficios',
  'home.process': 'Inicio — Proceso',
  'home.projects': 'Inicio — Proyectos Destacados',
  'home.testimonials': 'Inicio — Testimonios',
  'home.faq': 'Inicio — Preguntas Frecuentes',
  'home.cta': 'Inicio — CTA Final',
  'about': 'Nosotros',
  'services': 'Servicios (General)',
  'contact': 'Contacto',
  'projects': 'Proyectos',
  'blog': 'Blog'
}

export const groupLabels = {
  home: 'Inicio',
  services: 'Servicios',
  about: 'Nosotros',
  contact: 'Contacto',
  projects: 'Proyectos',
  blog: 'Blog'
}

export const sectionOrderByPage = {
  // Home
  'home.hero': 10,
  'home.renolit': 20,
  'home.services': 30,
  'home.benefits': 40,
  'home.process': 50,
  'home.projects': 60,
  'home.testimonials': 70,
  'home.faq': 80,
  'home.cta': 90,
  // Servicios
  services: 10,
  // Nosotros
  'about.hero': 10,
  'about.content': 20,
  'about.highlights': 30,
  'about.method': 40,
  about: 50,
  'about.cta': 60,
  // Contacto
  'contact.hero': 10,
  'contact.info': 20,
  'contact.form': 30,
  contact: 40,
  // Proyectos y blog
  projects: 10,
  'projects.hero': 20,
  blog: 10,
  'blog.hero': 20
}

const deprecatedContentSections = new Set([
  'services.installation',
  'services.rehabilitation',
  'services.waterproofing'
])

const hiddenContentKeys = new Set([
  SERVICES_COLLECTIONS_CONTENT_KEY
])

export function isDeprecatedContentSection(sectionKey) {
  return deprecatedContentSections.has(sectionKey)
}

export function isHiddenContentKey(contentKey) {
  return hiddenContentKeys.has(contentKey)
}

// ===== DEFAULT CONTENT (used when API is not available) =====
export const defaultContent = [
  // HOME — HERO
  { key: 'home.hero.title', value: 'La mejor lámina, bien instalada.', section: 'home.hero', label: 'Título principal', type: 'text' },
  { key: 'home.hero.subtitle', value: 'RENOLIT ALKORPLAN resuelve filtraciones e impermeabilización de una vez. Sin intermediarios.', section: 'home.hero', label: 'Subtítulo', type: 'textarea' },
  { key: 'home.hero.cta_primary', value: 'Pedir Presupuesto', section: 'home.hero', label: 'Botón principal', type: 'text' },
  { key: 'home.hero.cta_secondary', value: 'Ver Proyectos', section: 'home.hero', label: 'Botón secundario', type: 'text' },
  { key: 'home.hero.trust_1', value: 'Instaladores oficiales', section: 'home.hero', label: 'Confianza — Texto 1', type: 'text' },
  { key: 'home.hero.trust_2', value: 'Garantía 15 años', section: 'home.hero', label: 'Confianza — Texto 2', type: 'text' },
  // HOME — RENOLIT
  { key: 'home.renolit.label', value: '¿Por qué RENOLIT ALKORPLAN?', section: 'home.renolit', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.renolit.title', value: 'La Mejor Lámina Armada del Mercado', section: 'home.renolit', label: 'Título', type: 'text' },
  { key: 'home.renolit.description', value: 'RENOLIT ALKORPLAN es la membrana armada más utilizada en el mundo para el revestimiento de piscinas. Como instaladores oficiales certificados, garantizamos una instalación profesional con materiales de primera calidad.', section: 'home.renolit', label: 'Descripción', type: 'textarea' },
  { key: 'home.renolit.feature1_title', value: '100% Estanqueidad Garantizada', section: 'home.renolit', label: 'Característica 1 — Título', type: 'text' },
  { key: 'home.renolit.feature1_desc', value: 'Impermeabilización total con garantía escrita de 15 años.', section: 'home.renolit', label: 'Característica 1 — Descripción', type: 'text' },
  { key: 'home.renolit.feature2_title', value: 'Resistencia UV Superior', section: 'home.renolit', label: 'Característica 2 — Título', type: 'text' },
  { key: 'home.renolit.feature2_desc', value: 'Protección lacada contra rayos UV y envejecimiento prematuro.', section: 'home.renolit', label: 'Característica 2 — Descripción', type: 'text' },
  { key: 'home.renolit.feature3_title', value: 'Amplia Gama de Diseños', section: 'home.renolit', label: 'Característica 3 — Título', type: 'text' },
  { key: 'home.renolit.feature3_desc', value: 'Colecciones TOUCH, VOGUE, CERAMICS y más para personalizar tu piscina.', section: 'home.renolit', label: 'Característica 3 — Descripción', type: 'text' },
  { key: 'home.renolit.link_text', value: 'Conocer más sobre RENOLIT ALKORPLAN', section: 'home.renolit', label: 'Texto del enlace externo', type: 'text' },
  // HOME — SERVICES
  { key: 'home.services.label', value: 'Nuestros Servicios', section: 'home.services', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.services.title', value: 'Soluciones con RENOLIT ALKORPLAN', section: 'home.services', label: 'Título', type: 'text' },
  { key: 'home.services.description', value: 'Como instaladores oficiales, ofrecemos servicios especializados de instalación de lámina armada RENOLIT ALKORPLAN para todo tipo de piscinas.', section: 'home.services', label: 'Descripción', type: 'textarea' },
  { key: 'home.services.service1_title', value: 'Instalación en Piscinas Nuevas', section: 'home.services', label: 'Servicio 1 — Título', type: 'text' },
  { key: 'home.services.service1_desc', value: 'Instalación de lámina armada RENOLIT ALKORPLAN en piscinas de nueva construcción.', section: 'home.services', label: 'Servicio 1 — Descripción', type: 'text' },
  { key: 'home.services.service2_title', value: 'Rehabilitación de Piscinas', section: 'home.services', label: 'Servicio 2 — Título', type: 'text' },
  { key: 'home.services.service2_desc', value: 'Renovación de piscinas existentes con membrana RENOLIT ALKORPLAN.', section: 'home.services', label: 'Servicio 2 — Descripción', type: 'text' },
  // HOME — BENEFITS
  { key: 'home.benefits.label', value: '¿Por qué elegirnos?', section: 'home.benefits', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.benefits.title', value: 'Instaladores Oficiales Certificados', section: 'home.benefits', label: 'Título', type: 'text' },
  { key: 'home.benefits.description', value: 'Como instaladores oficiales de RENOLIT ALKORPLAN, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.', section: 'home.benefits', label: 'Descripción', type: 'textarea' },
  { key: 'home.benefits.stat_value', value: '15 años', section: 'home.benefits', label: 'Estadística — Valor', type: 'text' },
  { key: 'home.benefits.stat_label', value: 'Garantía escrita RENOLIT', section: 'home.benefits', label: 'Estadística — Etiqueta', type: 'text' },
  { key: 'home.benefits.benefit1_title', value: 'Certificación Oficial RENOLIT', section: 'home.benefits', label: 'Beneficio 1 — Título', type: 'text' },
  { key: 'home.benefits.benefit1_desc', value: 'Somos instaladores certificados por RENOLIT, garantizando la calidad del trabajo.', section: 'home.benefits', label: 'Beneficio 1 — Descripción', type: 'text' },
  { key: 'home.benefits.benefit2_title', value: 'Materiales Premium Originales', section: 'home.benefits', label: 'Beneficio 2 — Título', type: 'text' },
  { key: 'home.benefits.benefit2_desc', value: 'Utilizamos exclusivamente láminas RENOLIT ALKORPLAN originales de fábrica.', section: 'home.benefits', label: 'Beneficio 2 — Descripción', type: 'text' },
  { key: 'home.benefits.benefit3_title', value: 'Equipo Especializado', section: 'home.benefits', label: 'Beneficio 3 — Título', type: 'text' },
  { key: 'home.benefits.benefit3_desc', value: 'Técnicos formados directamente por RENOLIT con las últimas técnicas.', section: 'home.benefits', label: 'Beneficio 3 — Descripción', type: 'text' },
  { key: 'home.benefits.benefit4_title', value: 'Garantía Escrita de 15 Años', section: 'home.benefits', label: 'Beneficio 4 — Título', type: 'text' },
  { key: 'home.benefits.benefit4_desc', value: 'Respaldamos nuestro trabajo con la garantía oficial de RENOLIT ALKORPLAN.', section: 'home.benefits', label: 'Beneficio 4 — Descripción', type: 'text' },
  // HOME — PROCESS
  { key: 'home.process.label', value: 'Nuestro Proceso', section: 'home.process', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.process.title', value: 'Cómo Trabajamos', section: 'home.process', label: 'Título', type: 'text' },
  { key: 'home.process.description', value: 'Un proceso transparente y eficiente para garantizar los mejores resultados en tu proyecto.', section: 'home.process', label: 'Descripción', type: 'textarea' },
  { key: 'home.process.step1_title', value: 'Visita Técnica', section: 'home.process', label: 'Paso 1 — Título', type: 'text' },
  { key: 'home.process.step1_desc', value: 'Evaluamos tu piscina y te asesoramos sobre la mejor solución.', section: 'home.process', label: 'Paso 1 — Descripción', type: 'text' },
  { key: 'home.process.step2_title', value: 'Presupuesto', section: 'home.process', label: 'Paso 2 — Título', type: 'text' },
  { key: 'home.process.step2_desc', value: 'Elaboramos un presupuesto detallado sin compromiso.', section: 'home.process', label: 'Paso 2 — Descripción', type: 'text' },
  { key: 'home.process.step3_title', value: 'Instalación', section: 'home.process', label: 'Paso 3 — Título', type: 'text' },
  { key: 'home.process.step3_desc', value: 'Nuestro equipo certificado realiza la instalación profesional.', section: 'home.process', label: 'Paso 3 — Descripción', type: 'text' },
  { key: 'home.process.step4_title', value: 'Garantía', section: 'home.process', label: 'Paso 4 — Título', type: 'text' },
  { key: 'home.process.step4_desc', value: 'Te entregamos tu piscina con garantía escrita de 15 años.', section: 'home.process', label: 'Paso 4 — Descripción', type: 'text' },
  // HOME — PROJECTS
  { key: 'home.projects.label', value: 'Nuestro Trabajo', section: 'home.projects', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.projects.title', value: 'Proyectos Destacados', section: 'home.projects', label: 'Título', type: 'text' },
  { key: 'home.projects.description', value: 'Descubre algunos de nuestros trabajos más recientes y déjate inspirar.', section: 'home.projects', label: 'Descripción', type: 'textarea' },
  { key: 'home.projects.cta', value: 'Ver Todos los Proyectos', section: 'home.projects', label: 'Texto del botón', type: 'text' },
  // HOME — TESTIMONIALS
  { key: 'home.testimonials.label', value: 'Testimonios', section: 'home.testimonials', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.testimonials.title', value: 'Lo Que Dicen Nuestros Clientes', section: 'home.testimonials', label: 'Título', type: 'text' },
  { key: 'home.testimonials.t1_name', value: 'Carlos Martínez', section: 'home.testimonials', label: 'Testimonio 1 — Nombre', type: 'text' },
  { key: 'home.testimonials.t1_location', value: 'Madrid', section: 'home.testimonials', label: 'Testimonio 1 — Ubicación', type: 'text' },
  { key: 'home.testimonials.t1_content', value: 'Increíble transformación de nuestra piscina. El equipo fue profesional, puntual y el resultado superó nuestras expectativas.', section: 'home.testimonials', label: 'Testimonio 1 — Contenido', type: 'textarea' },
  { key: 'home.testimonials.t2_name', value: 'María García', section: 'home.testimonials', label: 'Testimonio 2 — Nombre', type: 'text' },
  { key: 'home.testimonials.t2_location', value: 'Valencia', section: 'home.testimonials', label: 'Testimonio 2 — Ubicación', type: 'text' },
  { key: 'home.testimonials.t2_content', value: 'Después de años con problemas de fugas, por fin tenemos una piscina perfecta. El proceso fue rápido y limpio.', section: 'home.testimonials', label: 'Testimonio 2 — Contenido', type: 'textarea' },
  { key: 'home.testimonials.t3_name', value: 'Comunidad Los Olivos', section: 'home.testimonials', label: 'Testimonio 3 — Nombre', type: 'text' },
  { key: 'home.testimonials.t3_location', value: 'Barcelona', section: 'home.testimonials', label: 'Testimonio 3 — Ubicación', type: 'text' },
  { key: 'home.testimonials.t3_content', value: 'Rehabilitaron nuestra piscina comunitaria en tiempo récord. La comunicación con la comunidad fue excelente.', section: 'home.testimonials', label: 'Testimonio 3 — Contenido', type: 'textarea' },
  // HOME — FAQ
  { key: 'home.faq.label', value: 'Preguntas Frecuentes', section: 'home.faq', label: 'Etiqueta de sección', type: 'text' },
  { key: 'home.faq.title', value: 'Todo Sobre RENOLIT ALKORPLAN', section: 'home.faq', label: 'Título', type: 'text' },
  { key: 'home.faq.description', value: 'Resolvemos las dudas más comunes sobre la instalación de lámina armada en piscinas.', section: 'home.faq', label: 'Descripción', type: 'textarea' },
  { key: 'home.faq.q1', value: '¿Qué es la lámina armada RENOLIT ALKORPLAN?', section: 'home.faq', label: 'Pregunta 1', type: 'text' },
  { key: 'home.faq.a1', value: 'RENOLIT ALKORPLAN es una membrana de PVC reforzada con malla de poliéster que garantiza la impermeabilización total de piscinas. Es el sistema más utilizado en Europa por su durabilidad, estética y facilidad de mantenimiento.', section: 'home.faq', label: 'Respuesta 1', type: 'textarea' },
  { key: 'home.faq.q2', value: '¿Cuánto dura la garantía de la instalación?', section: 'home.faq', label: 'Pregunta 2', type: 'text' },
  { key: 'home.faq.a2', value: 'Ofrecemos una garantía escrita de 15 años en todos nuestros trabajos de instalación con membrana RENOLIT ALKORPLAN. Esta garantía cubre tanto el material como la mano de obra de instalación.', section: 'home.faq', label: 'Respuesta 2', type: 'textarea' },
  { key: 'home.faq.q3', value: '¿Se puede instalar sobre gresite existente?', section: 'home.faq', label: 'Pregunta 3', type: 'text' },
  { key: 'home.faq.a3', value: 'Sí, una de las grandes ventajas de RENOLIT ALKORPLAN es que se puede instalar sobre cualquier superficie existente (gresite, cemento, fibra, etc.) sin necesidad de demoler, lo que reduce tiempos y costes.', section: 'home.faq', label: 'Respuesta 3', type: 'textarea' },
  { key: 'home.faq.q4', value: '¿Cuánto tiempo tarda la instalación?', section: 'home.faq', label: 'Pregunta 4', type: 'text' },
  { key: 'home.faq.a4', value: 'El tiempo de instalación depende del tamaño de la piscina. Una piscina residencial estándar suele completarse en 3-5 días. Durante el proceso, te mantenemos informado de cada avance.', section: 'home.faq', label: 'Respuesta 4', type: 'textarea' },
  { key: 'home.faq.q5', value: '¿Qué mantenimiento requiere la lámina armada?', section: 'home.faq', label: 'Pregunta 5', type: 'text' },
  { key: 'home.faq.a5', value: 'El mantenimiento es mínimo. Basta con mantener los niveles adecuados de cloro y pH del agua. La superficie lisa de ALKORPLAN evita la acumulación de algas y facilita la limpieza.', section: 'home.faq', label: 'Respuesta 5', type: 'textarea' },
  { key: 'home.faq.q6', value: '¿Puedo elegir el color y diseño de la lámina?', section: 'home.faq', label: 'Pregunta 6', type: 'text' },
  { key: 'home.faq.a6', value: 'Por supuesto. RENOLIT ALKORPLAN ofrece una amplia gama de colores y diseños: desde tonos lisos clásicos hasta imitaciones de mosaico, piedra o arena. Te asesoramos para elegir el que mejor se adapte a tu piscina.', section: 'home.faq', label: 'Respuesta 6', type: 'textarea' },
  { key: 'home.faq.q7', value: '¿Por qué elegir un instalador oficial RENOLIT?', section: 'home.faq', label: 'Pregunta 7', type: 'text' },
  { key: 'home.faq.a7', value: 'Los instaladores oficiales hemos recibido formación específica de RENOLIT y trabajamos exclusivamente con material original de fábrica. Esto garantiza que la instalación cumpla todos los estándares de calidad y puedas disfrutar de la garantía oficial.', section: 'home.faq', label: 'Respuesta 7', type: 'textarea' },
  // HOME — CTA
  { key: 'home.cta.title', value: '¿Listo para Impermeabilizar tu Piscina?', section: 'home.cta', label: 'Título', type: 'text' },
  { key: 'home.cta.description', value: 'Contáctanos hoy y recibe un presupuesto personalizado sin compromiso. Instalación profesional con garantía RENOLIT ALKORPLAN.', section: 'home.cta', label: 'Descripción', type: 'textarea' },
  { key: 'home.cta.button_primary', value: 'Solicitar Presupuesto', section: 'home.cta', label: 'Botón principal', type: 'text' },
  { key: 'home.cta.button_secondary', value: 'Llamar Ahora', section: 'home.cta', label: 'Botón secundario', type: 'text' },
  // ABOUT
  { key: 'about.hero.label', value: 'Conócenos', section: 'about', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'about.hero.title', value: 'Instaladores Oficiales RENOLIT ALKORPLAN', section: 'about', label: 'Hero — Título', type: 'text' },
  { key: 'about.hero.description', value: 'Somos especialistas certificados en instalación de lámina armada RENOLIT ALKORPLAN, la membrana más utilizada en el mundo para el revestimiento de piscinas.', section: 'about', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'about.content.title', value: 'Quiénes Somos', section: 'about', label: 'Contenido — Título', type: 'text' },
  { key: 'about.content.paragraph1', value: 'ARG Piscinas es una empresa especializada exclusivamente en la instalación de lámina armada RENOLIT ALKORPLAN para piscinas. Como instaladores oficiales certificados, contamos con la formación, herramientas y materiales necesarios para garantizar resultados excepcionales.', section: 'about', label: 'Contenido — Párrafo 1', type: 'textarea' },
  { key: 'about.content.paragraph2', value: 'Nuestra especialización nos permite ofrecer un servicio de máxima calidad, centrado en lo que mejor sabemos hacer: impermeabilizar piscinas con la tecnología más avanzada del mercado.', section: 'about', label: 'Contenido — Párrafo 2', type: 'textarea' },
  { key: 'about.content.paragraph3', value: 'Trabajamos tanto en piscinas de nueva construcción como en rehabilitaciones, ofreciendo soluciones personalizadas para cada proyecto con la garantía oficial de RENOLIT.', section: 'about', label: 'Contenido — Párrafo 3', type: 'textarea' },
  { key: 'about.cta.title', value: '¿Listo para tu Proyecto?', section: 'about', label: 'CTA — Título', type: 'text' },
  { key: 'about.cta.description', value: 'Contacta con nosotros y recibe un presupuesto personalizado para la instalación de RENOLIT ALKORPLAN en tu piscina.', section: 'about', label: 'CTA — Descripción', type: 'textarea' },
  { key: 'about.cta.button', value: 'Solicitar Presupuesto', section: 'about', label: 'CTA — Botón', type: 'text' },
  // CONTACT
  { key: 'contact.hero.label', value: 'Contacto', section: 'contact', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'contact.hero.title', value: '¿Cómo Podemos Ayudarte?', section: 'contact', label: 'Hero — Título', type: 'text' },
  { key: 'contact.hero.description', value: 'Estamos aquí para responder tus preguntas y ayudarte con tu proyecto de piscina. Contáctanos y te responderemos lo antes posible.', section: 'contact', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'contact.info.title', value: 'Información de Contacto', section: 'contact', label: 'Info — Título', type: 'text' },
  { key: 'contact.info.description', value: 'Puedes contactarnos por cualquiera de estos medios o rellenar el formulario y te responderemos en menos de 24 horas.', section: 'contact', label: 'Info — Descripción', type: 'textarea' },
  { key: 'contact.info.phone', value: '+34 900 000 000', section: 'contact', label: 'Teléfono', type: 'text' },
  { key: 'contact.info.email', value: 'info@argpiscinas.com', section: 'contact', label: 'Email', type: 'text' },
  { key: 'contact.info.address_line1', value: 'Calle Ejemplo 123', section: 'contact', label: 'Dirección — Línea 1', type: 'text' },
  { key: 'contact.info.address_line2', value: '28001 Madrid', section: 'contact', label: 'Dirección — Línea 2', type: 'text' },
  { key: 'contact.info.whatsapp', value: '+34 900 000 000', section: 'contact', label: 'WhatsApp', type: 'text' },
  { key: 'contact.info.schedule', value: 'Lun - Vie: 9:00 - 19:00', section: 'contact', label: 'Horario', type: 'text' },
  { key: 'contact.form.title', value: 'Envíanos un Mensaje', section: 'contact', label: 'Formulario — Título', type: 'text' },
  { key: 'contact.form.success', value: '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.', section: 'contact', label: 'Formulario — Mensaje de éxito', type: 'text' },
  // PROJECTS
  { key: 'projects.hero.label', value: 'Portfolio', section: 'projects', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'projects.hero.title', value: 'Nuestros Proyectos', section: 'projects', label: 'Hero — Título', type: 'text' },
  { key: 'projects.hero.description', value: 'Descubre nuestros trabajos de instalación de lámina armada RENOLIT ALKORPLAN en piscinas de toda España.', section: 'projects', label: 'Hero — Descripción', type: 'textarea' },
  // BLOG
  { key: 'blog.hero.label', value: 'Blog', section: 'blog', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'blog.hero.title', value: 'Artículos y Novedades', section: 'blog', label: 'Hero — Título', type: 'text' },
  { key: 'blog.hero.description', value: 'Consejos, novedades y todo lo que necesitas saber sobre piscinas y lámina armada RENOLIT ALKORPLAN.', section: 'blog', label: 'Hero — Descripción', type: 'textarea' },
  // SERVICES (General)
  { key: 'services.hero.label', value: 'Servicios', section: 'services', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.hero.title', value: 'Nuestros Servicios', section: 'services', label: 'Hero — Título', type: 'text' },
  { key: 'services.hero.description', value: 'Servicios especializados de instalación de lámina armada RENOLIT ALKORPLAN para piscinas.', section: 'services', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.collections.label', value: 'Colecciones', section: 'services', label: 'Colecciones — Etiqueta', type: 'text' },
  { key: 'services.collections.title', value: 'Gama RENOLIT ALKORPLAN', section: 'services', label: 'Colecciones — Título', type: 'text' },
  { key: 'services.collections.description', value: 'Ofrecemos toda la gama de membranas RENOLIT ALKORPLAN para que elijas el acabado perfecto para tu piscina.', section: 'services', label: 'Colecciones — Descripción', type: 'textarea' },
  { key: 'services.cta.title', value: '¿Necesitas Asesoramiento?', section: 'services', label: 'CTA — Título', type: 'text' },
  { key: 'services.cta.description', value: 'Te ayudamos a elegir la mejor solución RENOLIT ALKORPLAN para tu piscina. Presupuesto sin compromiso.', section: 'services', label: 'CTA — Descripción', type: 'textarea' },
  { key: 'services.cta.button', value: 'Contactar Ahora', section: 'services', label: 'CTA — Botón', type: 'text' },
  // SERVICIO — INSTALACIÓN
  { key: 'services.installation.hero_label', value: 'Servicio Especializado', section: 'services.installation', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.installation.hero_title', value: 'Instalación de Lámina Armada', section: 'services.installation', label: 'Hero — Título', type: 'text' },
  { key: 'services.installation.hero_desc', value: 'La solución más duradera y estética para impermeabilizar tu piscina. Instalación profesional con garantía de 15 años.', section: 'services.installation', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.installation.content', value: '<h2>¿Qué es la Lámina Armada?</h2><p>La lámina armada es un revestimiento de PVC reforzado con poliéster que se utiliza para impermeabilizar piscinas. Es el sistema más avanzado y duradero del mercado, ofreciendo una vida útil de más de 20 años con el mantenimiento adecuado.</p><h2>Ventajas de la Lámina Armada</h2><ul><li><strong>Durabilidad excepcional:</strong> Más de 20 años de vida útil con garantía de fabricante.</li><li><strong>Impermeabilización total:</strong> Sistema 100% estanco sin juntas ni fisuras.</li><li><strong>Versatilidad estética:</strong> Amplia gama de colores y acabados disponibles.</li><li><strong>Instalación rápida:</strong> Una piscina estándar puede estar lista en 5-7 días.</li><li><strong>Bajo mantenimiento:</strong> Superficie lisa que evita la acumulación de algas.</li><li><strong>Resistencia UV:</strong> No se decolora con la exposición solar.</li></ul><h2>Nuestro Proceso de Instalación</h2><h3>1. Evaluación inicial</h3><p>Realizamos una inspección completa de tu piscina para determinar el estado del vaso y planificar la instalación óptima.</p><h3>2. Preparación del vaso</h3><p>Limpiamos y preparamos la superficie, reparando cualquier imperfección para garantizar una instalación perfecta.</p><h3>3. Instalación de la lámina</h3><p>Colocamos la lámina armada utilizando técnicas de termosoldadura que garantizan una unión perfecta y estanca.</p><h3>4. Acabados y entrega</h3><p>Instalamos los accesorios (skimmers, impulsores, iluminación) y realizamos las pruebas finales antes de la entrega.</p><h2>Materiales que Utilizamos</h2><p>Trabajamos exclusivamente con las mejores marcas del mercado europeo:</p><ul><li><strong>RENOLIT ALKORPLAN:</strong> Líder mundial en láminas para piscinas.</li><li><strong>CEFIL:</strong> Fabricante español de alta calidad.</li><li><strong>FLAGPOOL:</strong> Marca premium con acabados exclusivos.</li></ul>', section: 'services.installation', label: 'Contenido principal (HTML)', type: 'html' },
  { key: 'services.installation.sidebar_cta_title', value: '¿Interesado en este servicio?', section: 'services.installation', label: 'Sidebar CTA — Título', type: 'text' },
  { key: 'services.installation.sidebar_cta_desc', value: 'Solicita un presupuesto personalizado sin compromiso.', section: 'services.installation', label: 'Sidebar CTA — Descripción', type: 'textarea' },
  { key: 'services.installation.sidebar_cta_button', value: 'Solicitar Presupuesto', section: 'services.installation', label: 'Sidebar CTA — Botón', type: 'text' },
  { key: 'services.installation.sidebar_features_title', value: 'Incluye:', section: 'services.installation', label: 'Sidebar — Título características', type: 'text' },
  { key: 'services.installation.sidebar_feat1', value: 'Garantía de 15 años', section: 'services.installation', label: 'Sidebar — Característica 1', type: 'text' },
  { key: 'services.installation.sidebar_feat2', value: 'Materiales certificados', section: 'services.installation', label: 'Sidebar — Característica 2', type: 'text' },
  { key: 'services.installation.sidebar_feat3', value: 'Técnicos especializados', section: 'services.installation', label: 'Sidebar — Característica 3', type: 'text' },
  { key: 'services.installation.sidebar_feat4', value: 'Presupuesto detallado', section: 'services.installation', label: 'Sidebar — Característica 4', type: 'text' },
  { key: 'services.installation.sidebar_contact_title', value: '¿Preguntas?', section: 'services.installation', label: 'Sidebar Contacto — Título', type: 'text' },
  { key: 'services.installation.sidebar_contact_desc', value: 'Llámanos para resolver cualquier duda.', section: 'services.installation', label: 'Sidebar Contacto — Descripción', type: 'text' },
  { key: 'services.installation.sidebar_contact_phone', value: '+34 900 000 000', section: 'services.installation', label: 'Sidebar Contacto — Teléfono', type: 'text' },
  // SERVICIO — REHABILITACIÓN
  { key: 'services.rehabilitation.hero_label', value: 'Servicio Especializado', section: 'services.rehabilitation', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.rehabilitation.hero_title', value: 'Rehabilitación de Piscinas', section: 'services.rehabilitation', label: 'Hero — Título', type: 'text' },
  { key: 'services.rehabilitation.hero_desc', value: 'Devolvemos la vida a tu piscina. Solucionamos filtraciones, deterioro del gresite y cualquier problema estructural con resultados garantizados.', section: 'services.rehabilitation', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.rehabilitation.content', value: '<h2>¿Cuándo Rehabilitar tu Piscina?</h2><p>Las piscinas, como cualquier estructura, sufren desgaste con el tiempo. Si observas alguna de estas señales, es momento de considerar una rehabilitación:</p><ul><li>Pérdida de agua anormal (más de 5cm por semana)</li><li>Gresite desprendido o deteriorado</li><li>Manchas persistentes o decoloración</li><li>Grietas visibles en el vaso</li><li>Problemas de humedad en zonas circundantes</li></ul><h2>Nuestra Solución: Lámina Armada</h2><p>La rehabilitación con lámina armada es la solución más eficiente y duradera. A diferencia de volver a engrestar, la lámina armada:</p><ul><li><strong>Sella completamente</strong> cualquier fuga existente</li><li><strong>Cubre imperfecciones</strong> sin necesidad de picar</li><li><strong>Renueva la estética</strong> por completo</li><li><strong>Añade años de vida</strong> a la estructura</li><li><strong>Reduce el mantenimiento</strong> futuro</li></ul><h2>Proceso de Rehabilitación</h2><h3>1. Diagnóstico</h3><p>Realizamos una evaluación completa del estado del vaso, identificando fugas, daños estructurales y otros problemas.</p><h3>2. Vaciado y Limpieza</h3><p>Vaciamos la piscina y realizamos una limpieza profunda de toda la superficie.</p><h3>3. Reparaciones Estructurales</h3><p>Reparamos grietas, sellamos filtraciones y nivelamos la superficie para la instalación óptima de la lámina.</p><h3>4. Instalación de Lámina</h3><p>Colocamos la lámina armada con técnicas de termosoldadura profesional.</p><h3>5. Puesta en Marcha</h3><p>Llenamos la piscina, equilibramos el agua y te entregamos tu piscina completamente renovada.</p>', section: 'services.rehabilitation', label: 'Contenido principal (HTML)', type: 'html' },
  { key: 'services.rehabilitation.sidebar_cta_title', value: '¿Tu piscina necesita rehabilitación?', section: 'services.rehabilitation', label: 'Sidebar CTA — Título', type: 'text' },
  { key: 'services.rehabilitation.sidebar_cta_desc', value: 'Solicita una inspección gratuita y te daremos un diagnóstico completo.', section: 'services.rehabilitation', label: 'Sidebar CTA — Descripción', type: 'textarea' },
  { key: 'services.rehabilitation.sidebar_cta_button', value: 'Solicitar Inspección', section: 'services.rehabilitation', label: 'Sidebar CTA — Botón', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alerts_title', value: 'Señales de alerta:', section: 'services.rehabilitation', label: 'Sidebar — Título alertas', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert1', value: 'Nivel de agua baja constantemente', section: 'services.rehabilitation', label: 'Sidebar — Alerta 1', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert2', value: 'Gresite que se despega', section: 'services.rehabilitation', label: 'Sidebar — Alerta 2', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert3', value: 'Manchas que no desaparecen', section: 'services.rehabilitation', label: 'Sidebar — Alerta 3', type: 'text' },
  { key: 'services.rehabilitation.sidebar_alert4', value: 'Grietas visibles', section: 'services.rehabilitation', label: 'Sidebar — Alerta 4', type: 'text' },
  // SERVICIO — IMPERMEABILIZACIÓN
  { key: 'services.waterproofing.hero_label', value: 'Servicio Especializado', section: 'services.waterproofing', label: 'Hero — Etiqueta', type: 'text' },
  { key: 'services.waterproofing.hero_title', value: 'Impermeabilización de Piscinas', section: 'services.waterproofing', label: 'Hero — Título', type: 'text' },
  { key: 'services.waterproofing.hero_desc', value: 'Sistemas profesionales de impermeabilización para garantizar la estanqueidad total de tu piscina y eliminar filtraciones definitivamente.', section: 'services.waterproofing', label: 'Hero — Descripción', type: 'textarea' },
  { key: 'services.waterproofing.content', value: '<h2>Importancia de la Impermeabilización</h2><p>Una piscina mal impermeabilizada puede causar problemas graves: pérdida de agua, daños estructurales, humedades en zonas cercanas y un gasto continuo en productos químicos y agua.</p><h2>Sistemas de Impermeabilización</h2><h3>Lámina Armada PVC</h3><p>El sistema más avanzado del mercado. Crea una barrera 100% estanca que se adapta a cualquier forma de vaso.</p><h3>Poliurea</h3><p>Ideal para piscinas con formas complejas o zonas de difícil acceso. Se aplica por proyección y forma una membrana continua.</p><h3>Morteros Impermeabilizantes</h3><p>Solución económica para casos específicos, como reparaciones puntuales o preparación de superficies.</p><h2>¿Cuándo Necesitas Impermeabilizar?</h2><ul><li>Construcción de nueva piscina</li><li>Fugas o filtraciones detectadas</li><li>Renovación del revestimiento</li><li>Cambio de gresite a lámina</li><li>Daños por movimientos estructurales</li></ul><h2>Nuestro Proceso</h2><ol><li><strong>Inspección:</strong> Identificamos el origen de las filtraciones.</li><li><strong>Diagnóstico:</strong> Evaluamos el mejor sistema para tu caso.</li><li><strong>Preparación:</strong> Acondicionamos la superficie.</li><li><strong>Aplicación:</strong> Instalamos el sistema de impermeabilización.</li><li><strong>Verificación:</strong> Comprobamos la estanqueidad total.</li></ol>', section: 'services.waterproofing', label: 'Contenido principal (HTML)', type: 'html' },
  { key: 'services.waterproofing.sidebar_cta_title', value: '¿Problemas de filtraciones?', section: 'services.waterproofing', label: 'Sidebar CTA — Título', type: 'text' },
  { key: 'services.waterproofing.sidebar_cta_desc', value: 'Te ayudamos a identificar el origen y te proponemos la mejor solución.', section: 'services.waterproofing', label: 'Sidebar CTA — Descripción', type: 'textarea' },
  { key: 'services.waterproofing.sidebar_cta_button', value: 'Consultar', section: 'services.waterproofing', label: 'Sidebar CTA — Botón', type: 'text' },
  { key: 'services.waterproofing.sidebar_features_title', value: 'Garantizamos:', section: 'services.waterproofing', label: 'Sidebar — Título garantías', type: 'text' },
  { key: 'services.waterproofing.sidebar_feat1', value: 'Estanqueidad 100%', section: 'services.waterproofing', label: 'Sidebar — Garantía 1', type: 'text' },
  { key: 'services.waterproofing.sidebar_feat2', value: 'Garantía por escrito', section: 'services.waterproofing', label: 'Sidebar — Garantía 2', type: 'text' },
  { key: 'services.waterproofing.sidebar_feat3', value: 'Materiales certificados', section: 'services.waterproofing', label: 'Sidebar — Garantía 3', type: 'text' },
]

export function buildSectionsFromDefaults() {
  const sections = {}
  for (const item of defaultContent) {
    if (isDeprecatedContentSection(item.section)) {
      continue
    }
    if (isHiddenContentKey(item.key)) {
      continue
    }
    if (!sections[item.section]) {
      sections[item.section] = []
    }
    sections[item.section].push({ ...item })
  }
  return sections
}

export function inferItemType(item) {
  if (item?.type) return item.type
  const value = String(item?.value ?? '')
  const trimmedValue = value.trim()
  if (trimmedValue.startsWith('{') || trimmedValue.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmedValue)
      if (parsed && typeof parsed === 'object') {
        return 'json'
      }
    } catch (_error) {
      // ignore JSON parse errors and continue with heuristic
    }
  }
  if (/<[a-z][\s\S]*>/i.test(value)) return 'html'
  if (value.length > 160) return 'textarea'
  return 'text'
}

export function mergeSectionsWithDefaults(remoteSections = {}) {
  const merged = buildSectionsFromDefaults()

  for (const [sectionKey, items] of Object.entries(remoteSections || {})) {
    if (isDeprecatedContentSection(sectionKey)) {
      continue
    }

    if (!merged[sectionKey]) {
      merged[sectionKey] = []
    }

    for (const item of items || []) {
      if (isHiddenContentKey(item.key)) {
        continue
      }
      const idx = merged[sectionKey].findIndex(existing => existing.key === item.key)
      if (idx >= 0) {
        merged[sectionKey][idx] = {
          ...merged[sectionKey][idx],
          ...item,
          value: item.value ?? merged[sectionKey][idx].value,
          type: item.type || merged[sectionKey][idx].type
        }
      } else {
        merged[sectionKey].push({
          ...item,
          label: item.label || item.key,
          type: inferItemType(item)
        })
      }
    }
  }

  return merged
}

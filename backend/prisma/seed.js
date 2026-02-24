const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // =====================
  // USUARIOS
  // =====================
  const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'Admin1234!', 10);
  const editorPassword = await bcrypt.hash(process.env.SEED_EDITOR_PASSWORD || 'Editor1234!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@argpiscinas.com' },
    update: {},
    create: {
      email: 'admin@argpiscinas.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@argpiscinas.com' },
    update: {},
    create: {
      email: 'editor@argpiscinas.com',
      password: editorPassword,
      name: 'Editor',
      role: 'EDITOR',
    },
  });

  console.log('✅ Usuarios creados:', { admin: admin.email, editor: editor.email });

  // =====================
  // CATEGORÍAS
  // =====================
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'consejos' },
      update: {},
      create: {
        name: 'Consejos',
        slug: 'consejos',
        description: 'Consejos y recomendaciones para el cuidado de tu piscina',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mantenimiento' },
      update: {},
      create: {
        name: 'Mantenimiento',
        slug: 'mantenimiento',
        description: 'Guías de mantenimiento y cuidado de piscinas',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tendencias' },
      update: {},
      create: {
        name: 'Tendencias',
        slug: 'tendencias',
        description: 'Últimas tendencias en diseño y construcción de piscinas',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tecnologia' },
      update: {},
      create: {
        name: 'Tecnología',
        slug: 'tecnologia',
        description: 'Innovaciones tecnológicas en el mundo de las piscinas',
      },
    }),
  ]);

  console.log('✅ Categorías creadas:', categories.length);

  // =====================
  // TAGS
  // =====================
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'lamina-armada' },
      update: {},
      create: { name: 'Lámina Armada', slug: 'lamina-armada' },
    }),
    prisma.tag.upsert({
      where: { slug: 'rehabilitacion' },
      update: {},
      create: { name: 'Rehabilitación', slug: 'rehabilitacion' },
    }),
    prisma.tag.upsert({
      where: { slug: 'impermeabilizacion' },
      update: {},
      create: { name: 'Impermeabilización', slug: 'impermeabilizacion' },
    }),
    prisma.tag.upsert({
      where: { slug: 'piscinas-residenciales' },
      update: {},
      create: { name: 'Piscinas Residenciales', slug: 'piscinas-residenciales' },
    }),
    prisma.tag.upsert({
      where: { slug: 'piscinas-comunitarias' },
      update: {},
      create: { name: 'Piscinas Comunitarias', slug: 'piscinas-comunitarias' },
    }),
    prisma.tag.upsert({
      where: { slug: 'ahorro-agua' },
      update: {},
      create: { name: 'Ahorro de Agua', slug: 'ahorro-agua' },
    }),
  ]);

  console.log('✅ Tags creados:', tags.length);

  // =====================
  // POSTS
  // =====================
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'ventajas-lamina-armada-piscinas' },
      update: {},
      create: {
        title: 'Las 7 Ventajas de la Lámina Armada para tu Piscina',
        slug: 'ventajas-lamina-armada-piscinas',
        excerpt: 'Descubre por qué la lámina armada es la mejor opción para impermeabilizar tu piscina. Durabilidad, estética y garantía en un solo material.',
        content: `# Las 7 Ventajas de la Lámina Armada para tu Piscina

La lámina armada se ha convertido en el estándar de oro para la impermeabilización de piscinas. En ARG Piscinas, llevamos más de 15 años instalando este material y podemos asegurar que es la mejor inversión para tu piscina.

## 1. Durabilidad Excepcional

La lámina armada tiene una vida útil de **más de 20 años** cuando se instala correctamente. Su composición de PVC reforzado con poliéster la hace resistente a:

- Rayos UV
- Productos químicos del agua
- Cambios de temperatura
- Estrés mecánico

## 2. Impermeabilización Total

A diferencia del gresite tradicional, la lámina armada crea una barrera 100% estanca. No hay juntas ni fisuras por donde pueda filtrarse el agua.

## 3. Versatilidad Estética

Disponible en múltiples colores y acabados:

- Azul clásico
- Blanco arena
- Gris antracita
- Mosaico
- Imitación gresite

## 4. Instalación Rápida

Una piscina estándar puede estar lista en **5-7 días**, frente a las semanas que requiere el gresite.

## 5. Mantenimiento Sencillo

La superficie lisa de la lámina:

- Evita la acumulación de algas
- Facilita la limpieza
- Reduce el consumo de productos químicos

## 6. Coste-Eficiencia

Aunque la inversión inicial puede ser similar al gresite, el ahorro en mantenimiento y reparaciones la hace más económica a largo plazo.

## 7. Garantía de Fabricante

Las mejores marcas ofrecen garantías de hasta **10 años** contra defectos de fabricación.

---

¿Estás pensando en renovar tu piscina? [Contacta con nosotros](/contacto) para un presupuesto sin compromiso.`,
        status: 'PUBLISHED',
        seoTitle: 'Ventajas de la Lámina Armada para Piscinas | ARG Piscinas',
        seoDescription: 'Descubre las 7 ventajas principales de instalar lámina armada en tu piscina: durabilidad, impermeabilización, estética y más. Expertos en instalación.',
        publishedAt: new Date('2024-01-15'),
        authorId: admin.id,
      },
    }),
    prisma.post.upsert({
      where: { slug: 'cuando-rehabilitar-piscina' },
      update: {},
      create: {
        title: 'Cuándo es el Momento de Rehabilitar tu Piscina',
        slug: 'cuando-rehabilitar-piscina',
        excerpt: 'Aprende a identificar las señales que indican que tu piscina necesita una rehabilitación urgente. No esperes a que sea demasiado tarde.',
        content: `# Cuándo es el Momento de Rehabilitar tu Piscina

Las piscinas, como cualquier estructura, tienen una vida útil y requieren mantenimiento. Saber identificar las señales de deterioro a tiempo puede ahorrarte mucho dinero y problemas.

## Señales de Alarma

### 1. Pérdida de Agua

Si notas que el nivel del agua baja más de lo normal (más de 5cm por semana sin uso), probablemente tengas una fuga.

### 2. Gresite Desprendido

Las piezas de gresite que se sueltan son señal de:

- Humedad detrás del revestimiento
- Fallo del adhesivo
- Movimientos estructurales

### 3. Manchas y Decoloración

Las manchas persistentes pueden indicar:

- Problemas con el pH del agua
- Corrosión de armaduras
- Hongos y bacterias

### 4. Grietas Visibles

Las fisuras en el vaso son potencialmente peligrosas y deben evaluarse inmediatamente.

## La Solución: Lámina Armada

La rehabilitación con lámina armada es la solución más efectiva porque:

1. **Sella completamente** cualquier fuga existente
2. **Cubre imperfecciones** sin necesidad de picar
3. **Renueva la estética** por completo
4. **Añade años de vida** a la estructura

## Proceso de Rehabilitación

1. Vaciado y limpieza
2. Evaluación estructural
3. Reparación de daños
4. Instalación de lámina
5. Llenado y puesta en marcha

---

¿Tu piscina muestra alguna de estas señales? [Solicita una inspección gratuita](/contacto).`,
        status: 'PUBLISHED',
        seoTitle: 'Cuándo Rehabilitar tu Piscina - Guía Completa | ARG Piscinas',
        seoDescription: 'Aprende a identificar las señales que indican que tu piscina necesita rehabilitación: fugas, gresite dañado, grietas y más. Soluciones profesionales.',
        publishedAt: new Date('2024-02-10'),
        authorId: admin.id,
      },
    }),
    prisma.post.upsert({
      where: { slug: 'preparar-piscina-verano' },
      update: {},
      create: {
        title: 'Cómo Preparar tu Piscina para el Verano',
        slug: 'preparar-piscina-verano',
        excerpt: 'Guía completa para poner a punto tu piscina antes de la temporada de baño. Desde la limpieza hasta el equilibrio del agua.',
        content: `# Cómo Preparar tu Piscina para el Verano

El verano se acerca y es momento de preparar tu piscina para disfrutarla al máximo. Sigue esta guía paso a paso.

## Paso 1: Inspección Visual

Antes de empezar, inspecciona:

- El vaso de la piscina
- Los equipos de filtración
- Las escaleras y accesorios
- El sistema de iluminación

## Paso 2: Limpieza Profunda

### Elimina la suciedad acumulada

1. Retira hojas y residuos con el recogehojas
2. Cepilla las paredes y el fondo
3. Aspira los sedimentos

### Limpia los filtros

- Filtros de arena: contralavado
- Filtros de cartucho: limpieza con agua a presión

## Paso 3: Equilibrio del Agua

Los parámetros ideales son:

| Parámetro | Valor Ideal |
|-----------|-------------|
| pH | 7.2 - 7.6 |
| Cloro | 1 - 3 ppm |
| Alcalinidad | 80 - 120 ppm |
| Dureza | 200 - 400 ppm |

## Paso 4: Tratamiento de Choque

Si el agua está muy verde o turbia:

1. Realiza una cloración de choque
2. Mantén la depuradora funcionando 24h
3. Usa floculante si es necesario
4. Aspira el fondo tras la decantación

## Paso 5: Mantenimiento Preventivo

Durante la temporada:

- Mide el pH cada 2-3 días
- Limpia el skimmer semanalmente
- Revisa el nivel de cloro
- Mantén el agua en movimiento

---

¿Necesitas ayuda profesional? [Contacta con nuestro equipo](/contacto) para un mantenimiento completo.`,
        status: 'PUBLISHED',
        seoTitle: 'Preparar Piscina para Verano - Guía Completa | ARG Piscinas',
        seoDescription: 'Guía paso a paso para preparar tu piscina para el verano: limpieza, equilibrio del agua, tratamiento de choque y mantenimiento preventivo.',
        publishedAt: new Date('2024-03-01'),
        authorId: editor.id,
      },
    }),
  ]);

  console.log('✅ Posts creados:', posts.length);

  // Asignar categorías y tags a posts
  await prisma.postCategory.createMany({
    data: [
      { postId: posts[0].id, categoryId: categories[0].id },
      { postId: posts[0].id, categoryId: categories[2].id },
      { postId: posts[1].id, categoryId: categories[0].id },
      { postId: posts[1].id, categoryId: categories[1].id },
      { postId: posts[2].id, categoryId: categories[1].id },
    ],
    skipDuplicates: true,
  });

  await prisma.postTag.createMany({
    data: [
      { postId: posts[0].id, tagId: tags[0].id },
      { postId: posts[0].id, tagId: tags[2].id },
      { postId: posts[1].id, tagId: tags[1].id },
      { postId: posts[1].id, tagId: tags[0].id },
      { postId: posts[2].id, tagId: tags[3].id },
      { postId: posts[2].id, tagId: tags[5].id },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Relaciones de posts creadas');

  // =====================
  // PROYECTOS
  // =====================
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: 'piscina-residencial-madrid-norte' },
      update: {},
      create: {
        title: 'Rehabilitación Completa en Chalet de Madrid Norte',
        slug: 'piscina-residencial-madrid-norte',
        description: 'Transformación total de una piscina de gresite deteriorada a un elegante acabado en lámina armada gris antracita.',
        content: `## El Desafío

El propietario de este chalet en la zona norte de Madrid nos contactó porque su piscina de 10x5 metros presentaba múltiples problemas:

- Gresite desprendido en varias zonas
- Fugas de agua constantes
- Aspecto envejecido y manchado

## Nuestra Solución

Tras una evaluación completa, propusimos una rehabilitación integral con lámina armada RENOLIT ALKORPLAN 3000 en color Touch Elegance.

### Trabajos Realizados

1. Vaciado y preparación del vaso
2. Reparación de fisuras estructurales
3. Nivelación de superficies
4. Instalación de lámina armada
5. Renovación de la línea de coronación
6. Instalación de nueva iluminación LED

## El Resultado

Una piscina completamente renovada con un aspecto moderno y elegante, garantía de 10 años y cero fugas.

**Duración del proyecto:** 8 días
**Inversión:** €12.500`,
        location: 'Madrid Norte',
        year: 2024,
        images: [
          '/images/projects/madrid-norte-1.jpg',
          '/images/projects/madrid-norte-2.jpg',
          '/images/projects/madrid-norte-3.jpg',
        ],
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: 'comunidad-vecinos-valencia' },
      update: {},
      create: {
        title: 'Piscina Comunitaria en Valencia',
        slug: 'comunidad-vecinos-valencia',
        description: 'Rehabilitación de piscina comunitaria de 25x12 metros con acabado en lámina armada azul adriático.',
        content: `## El Proyecto

La comunidad de propietarios de este complejo residencial en Valencia necesitaba renovar urgentemente su piscina comunitaria antes de la temporada de verano.

## Características

- Dimensiones: 25x12 metros
- Profundidad: 1.2m a 2.2m
- Lámina: RENOLIT ALKORPLAN 2000 Azul Adriático

## Trabajos Especiales

- Refuerzo estructural en zonas debilitadas
- Nuevos desagües de fondo
- Instalación de escaleras de acero inoxidable
- Sistema de iluminación perimetral

**Duración:** 15 días
**Inversión:** €35.000`,
        location: 'Valencia',
        year: 2024,
        images: [
          '/images/projects/valencia-comunidad-1.jpg',
          '/images/projects/valencia-comunidad-2.jpg',
        ],
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { slug: 'piscina-infinity-marbella' },
      update: {},
      create: {
        title: 'Piscina Infinity con Vistas al Mar',
        slug: 'piscina-infinity-marbella',
        description: 'Construcción de piscina infinity de diseño con lámina armada en villa de lujo en Marbella.',
        content: `## Un Proyecto de Lujo

Esta espectacular villa en Marbella requería una piscina a la altura de sus vistas. Diseñamos una piscina infinity que parece fundirse con el horizonte mediterráneo.

## Especificaciones Técnicas

- Tipo: Infinity (rebosadero perimetral)
- Dimensiones: 15x4 metros
- Sistema: Desbordante con depósito de compensación
- Acabado: Lámina armada RENOLIT ALKORPLAN TOUCH Relax

## Características Especiales

- Iluminación RGB programable
- Sistema de climatización
- Cubierta automática sumergida
- Zona de hidromasaje integrada

**Duración:** 45 días
**Inversión:** €85.000`,
        location: 'Marbella',
        year: 2023,
        images: [
          '/images/projects/marbella-infinity-1.jpg',
          '/images/projects/marbella-infinity-2.jpg',
          '/images/projects/marbella-infinity-3.jpg',
        ],
        featured: true,
      },
    }),
  ]);

  console.log('✅ Proyectos creados:', projects.length);

  // =====================
  // TESTIMONIOS
  // =====================
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Carlos Martínez',
        location: 'Madrid',
        content: 'Increíble transformación de nuestra piscina. El equipo de ARG Piscinas fue profesional, puntual y el resultado superó nuestras expectativas. La lámina armada ha sido la mejor decisión.',
        rating: 5,
        featured: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'María García',
        location: 'Valencia',
        content: 'Después de años con problemas de fugas, por fin tenemos una piscina perfecta. El proceso fue rápido y limpio. Muy recomendables.',
        rating: 5,
        featured: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Comunidad Residencial Los Olivos',
        location: 'Barcelona',
        content: 'Rehabilitaron nuestra piscina comunitaria en tiempo récord. La comunicación con la comunidad fue excelente y el presupuesto se respetó al 100%.',
        rating: 5,
        featured: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Antonio López',
        location: 'Sevilla',
        content: 'Profesionales de verdad. Nos asesoraron perfectamente sobre el tipo de lámina ideal para nuestra zona. Dos veranos después, la piscina sigue como el primer día.',
        rating: 5,
        featured: false,
      },
    }),
  ]);

  console.log('✅ Testimonios creados:', testimonials.length);

  console.log('');
  console.log('🎉 Seed completado exitosamente!');
  console.log('');
  console.log('📧 Credenciales de acceso:');
  console.log('   Admin: admin@argpiscinas.com / (SEED_ADMIN_PASSWORD env var)');
  console.log('   Editor: editor@argpiscinas.com / (SEED_EDITOR_PASSWORD env var)');

  // Seed de contenido del sitio
  const { seedContent } = require('./seed-content');
  await seedContent();
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

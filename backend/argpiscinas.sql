-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-01-2026 a las 20:56:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `argpiscinas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Tendencias', 'tendencias', 'Últimas tendencias en diseño y construcción de piscinas', '2026-01-26 22:36:20.775', '2026-01-26 22:36:20.775'),
(2, 'Mantenimiento', 'mantenimiento', 'Guías de mantenimiento y cuidado de piscinas', '2026-01-26 22:36:20.775', '2026-01-26 22:36:20.775'),
(3, 'Tecnología', 'tecnologia', 'Innovaciones tecnológicas en el mundo de las piscinas', '2026-01-26 22:36:20.775', '2026-01-26 22:36:20.775'),
(4, 'Consejos', 'consejos', 'Consejos y recomendaciones para el cuidado de tu piscina', '2026-01-26 22:36:20.775', '2026-01-26 22:36:20.775');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('PENDING','READ','REPLIED','ARCHIVED') NOT NULL DEFAULT 'PENDING',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `status` enum('DRAFT','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` varchar(500) DEFAULT NULL,
  `published_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `status`, `seo_title`, `seo_description`, `published_at`, `created_at`, `updated_at`, `author_id`) VALUES
(1, 'Cuándo es el Momento de Rehabilitar tu Piscina', 'cuando-rehabilitar-piscina', 'Aprende a identificar las señales que indican que tu piscina necesita una rehabilitación urgente. No esperes a que sea demasiado tarde.', '# Cuándo es el Momento de Rehabilitar tu Piscina\n\nLas piscinas, como cualquier estructura, tienen una vida útil y requieren mantenimiento. Saber identificar las señales de deterioro a tiempo puede ahorrarte mucho dinero y problemas.\n\n## Señales de Alarma\n\n### 1. Pérdida de Agua\n\nSi notas que el nivel del agua baja más de lo normal (más de 5cm por semana sin uso), probablemente tengas una fuga.\n\n### 2. Gresite Desprendido\n\nLas piezas de gresite que se sueltan son señal de:\n\n- Humedad detrás del revestimiento\n- Fallo del adhesivo\n- Movimientos estructurales\n\n### 3. Manchas y Decoloración\n\nLas manchas persistentes pueden indicar:\n\n- Problemas con el pH del agua\n- Corrosión de armaduras\n- Hongos y bacterias\n\n### 4. Grietas Visibles\n\nLas fisuras en el vaso son potencialmente peligrosas y deben evaluarse inmediatamente.\n\n## La Solución: Lámina Armada\n\nLa rehabilitación con lámina armada es la solución más efectiva porque:\n\n1. **Sella completamente** cualquier fuga existente\n2. **Cubre imperfecciones** sin necesidad de picar\n3. **Renueva la estética** por completo\n4. **Añade años de vida** a la estructura\n\n## Proceso de Rehabilitación\n\n1. Vaciado y limpieza\n2. Evaluación estructural\n3. Reparación de daños\n4. Instalación de lámina\n5. Llenado y puesta en marcha\n\n---\n\n¿Tu piscina muestra alguna de estas señales? [Solicita una inspección gratuita](/contacto).', '/uploads/image-1769472638759-919914874.jpg', 'PUBLISHED', 'Cuándo Rehabilitar tu Piscina - Guía Completa | ARG Piscinas', 'Aprende a identificar las señales que indican que tu piscina necesita rehabilitación: fugas, gresite dañado, grietas y más. Soluciones profesionales.', '2024-02-10 00:00:00.000', '2026-01-26 22:36:20.798', '2026-01-27 00:10:47.577', 1),
(2, 'Las 7 Ventajas de la Lámina Armada para tu Piscina', 'ventajas-lamina-armada-piscinas', 'Descubre por qué la lámina armada es la mejor opción para impermeabilizar tu piscina. Durabilidad, estética y garantía en un solo material.', '# Las 7 Ventajas de la Lámina Armada para tu Piscina\n\nLa lámina armada se ha convertido en el estándar de oro para la impermeabilización de piscinas. En ARG Piscinas, llevamos más de 15 años instalando este material y podemos asegurar que es la mejor inversión para tu piscina.\n\n## 1. Durabilidad Excepcional\n\nLa lámina armada tiene una vida útil de **más de 20 años** cuando se instala correctamente. Su composición de PVC reforzado con poliéster la hace resistente a:\n\n- Rayos UV\n- Productos químicos del agua\n- Cambios de temperatura\n- Estrés mecánico\n\n## 2. Impermeabilización Total\n\nA diferencia del gresite tradicional, la lámina armada crea una barrera 100% estanca. No hay juntas ni fisuras por donde pueda filtrarse el agua.\n\n## 3. Versatilidad Estética\n\nDisponible en múltiples colores y acabados:\n\n- Azul clásico\n- Blanco arena\n- Gris antracita\n- Mosaico\n- Imitación gresite\n\n## 4. Instalación Rápida\n\nUna piscina estándar puede estar lista en **5-7 días**, frente a las semanas que requiere el gresite.\n\n## 5. Mantenimiento Sencillo\n\nLa superficie lisa de la lámina:\n\n- Evita la acumulación de algas\n- Facilita la limpieza\n- Reduce el consumo de productos químicos\n\n## 6. Coste-Eficiencia\n\nAunque la inversión inicial puede ser similar al gresite, el ahorro en mantenimiento y reparaciones la hace más económica a largo plazo.\n\n## 7. Garantía de Fabricante\n\nLas mejores marcas ofrecen garantías de hasta **10 años** contra defectos de fabricación.\n\n---\n\n¿Estás pensando en renovar tu piscina? [Contacta con nosotros](/contacto) para un presupuesto sin compromiso.', NULL, 'PUBLISHED', 'Ventajas de la Lámina Armada para Piscinas | ARG Piscinas', 'Descubre las 7 ventajas principales de instalar lámina armada en tu piscina: durabilidad, impermeabilización, estética y más. Expertos en instalación.', '2024-01-15 00:00:00.000', '2026-01-26 22:36:20.798', '2026-01-26 22:36:20.798', 1),
(3, 'Cómo Preparar tu Piscina para el Verano', 'preparar-piscina-verano', 'Guía completa para poner a punto tu piscina antes de la temporada de baño. Desde la limpieza hasta el equilibrio del agua.', '# Cómo Preparar tu Piscina para el Verano\n\nEl verano se acerca y es momento de preparar tu piscina para disfrutarla al máximo. Sigue esta guía paso a paso.\n\n## Paso 1: Inspección Visual\n\nAntes de empezar, inspecciona:\n\n- El vaso de la piscina\n- Los equipos de filtración\n- Las escaleras y accesorios\n- El sistema de iluminación\n\n## Paso 2: Limpieza Profunda\n\n### Elimina la suciedad acumulada\n\n1. Retira hojas y residuos con el recogehojas\n2. Cepilla las paredes y el fondo\n3. Aspira los sedimentos\n\n### Limpia los filtros\n\n- Filtros de arena: contralavado\n- Filtros de cartucho: limpieza con agua a presión\n\n## Paso 3: Equilibrio del Agua\n\nLos parámetros ideales son:\n\n| Parámetro | Valor Ideal |\n|-----------|-------------|\n| pH | 7.2 - 7.6 |\n| Cloro | 1 - 3 ppm |\n| Alcalinidad | 80 - 120 ppm |\n| Dureza | 200 - 400 ppm |\n\n## Paso 4: Tratamiento de Choque\n\nSi el agua está muy verde o turbia:\n\n1. Realiza una cloración de choque\n2. Mantén la depuradora funcionando 24h\n3. Usa floculante si es necesario\n4. Aspira el fondo tras la decantación\n\n## Paso 5: Mantenimiento Preventivo\n\nDurante la temporada:\n\n- Mide el pH cada 2-3 días\n- Limpia el skimmer semanalmente\n- Revisa el nivel de cloro\n- Mantén el agua en movimiento\n\n---\n\n¿Necesitas ayuda profesional? [Contacta con nuestro equipo](/contacto) para un mantenimiento completo.', '', 'PUBLISHED', 'Preparar Piscina para Verano - Guía Completa | ARG Piscinas', 'Guía paso a paso para preparar tu piscina para el verano: limpieza, equilibrio del agua, tratamiento de choque y mantenimiento preventivo.', '2024-03-01 00:00:00.000', '2026-01-26 22:36:20.798', '2026-01-27 00:01:34.865', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_categories`
--

CREATE TABLE `post_categories` (
  `post_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `post_categories`
--

INSERT INTO `post_categories` (`post_id`, `category_id`) VALUES
(1, 2),
(2, 1),
(2, 4),
(3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_tags`
--

CREATE TABLE `post_tags` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `post_tags`
--

INSERT INTO `post_tags` (`post_id`, `tag_id`) VALUES
(1, 1),
(1, 6),
(2, 1),
(2, 2),
(3, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `projects`
--

INSERT INTO `projects` (`id`, `title`, `slug`, `description`, `content`, `location`, `year`, `images`, `featured`, `created_at`, `updated_at`) VALUES
(1, 'Rehabilitación Completa en Chalet de Madrid Norte', 'piscina-residencial-madrid-norte', 'Transformación total de una piscina de gresite deteriorada a un elegante acabado en lámina armada gris antracita.', '## El Desafío\n\nEl propietario de este chalet en la zona norte de Madrid nos contactó porque su piscina de 10x5 metros presentaba múltiples problemas:\n\n- Gresite desprendido en varias zonas\n- Fugas de agua constantes\n- Aspecto envejecido y manchado\n\n## Nuestra Solución\n\nTras una evaluación completa, propusimos una rehabilitación integral con lámina armada RENOLIT ALKORPLAN 3000 en color Touch Elegance.\n\n### Trabajos Realizados\n\n1. Vaciado y preparación del vaso\n2. Reparación de fisuras estructurales\n3. Nivelación de superficies\n4. Instalación de lámina armada\n5. Renovación de la línea de coronación\n6. Instalación de nueva iluminación LED\n\n## El Resultado\n\nUna piscina completamente renovada con un aspecto moderno y elegante, garantía de 10 años y cero fugas.\n\n**Duración del proyecto:** 8 días\n**Inversión:** €12.500', 'Madrid Norte', 2024, '\"[\\\"/images/projects/madrid-norte-1.jpg\\\",\\\"/images/projects/madrid-norte-2.jpg\\\",\\\"/images/projects/madrid-norte-3.jpg\\\"]\"', 1, '2026-01-26 22:36:20.815', '2026-01-26 22:36:20.815'),
(2, 'Piscina Infinity con Vistas al Mar', 'piscina-infinity-marbella', 'Construcción de piscina infinity de diseño con lámina armada en villa de lujo en Marbella.', '## Un Proyecto de Lujo\n\nEsta espectacular villa en Marbella requería una piscina a la altura de sus vistas. Diseñamos una piscina infinity que parece fundirse con el horizonte mediterráneo.\n\n## Especificaciones Técnicas\n\n- Tipo: Infinity (rebosadero perimetral)\n- Dimensiones: 15x4 metros\n- Sistema: Desbordante con depósito de compensación\n- Acabado: Lámina armada RENOLIT ALKORPLAN TOUCH Relax\n\n## Características Especiales\n\n- Iluminación RGB programable\n- Sistema de climatización\n- Cubierta automática sumergida\n- Zona de hidromasaje integrada\n\n**Duración:** 45 días\n**Inversión:** €85.000', 'Marbella', 2023, '\"[\\\"/images/projects/marbella-infinity-1.jpg\\\",\\\"/images/projects/marbella-infinity-2.jpg\\\",\\\"/images/projects/marbella-infinity-3.jpg\\\"]\"', 1, '2026-01-26 22:36:20.815', '2026-01-26 22:36:20.815'),
(3, 'Piscina Comunitaria en Valencia', 'comunidad-vecinos-valencia', 'Rehabilitación de piscina comunitaria de 25x12 metros con acabado en lámina armada azul adriático.', '## El Proyecto\n\nLa comunidad de propietarios de este complejo residencial en Valencia necesitaba renovar urgentemente su piscina comunitaria antes de la temporada de verano.\n\n## Características\n\n- Dimensiones: 25x12 metros\n- Profundidad: 1.2m a 2.2m\n- Lámina: RENOLIT ALKORPLAN 2000 Azul Adriático\n\n## Trabajos Especiales\n\n- Refuerzo estructural en zonas debilitadas\n- Nuevos desagües de fondo\n- Instalación de escaleras de acero inoxidable\n- Sistema de iluminación perimetral\n\n**Duración:** 15 días\n**Inversión:** €35.000', 'Valencia', 2024, '\"[\\\"/images/projects/valencia-comunidad-1.jpg\\\",\\\"/images/projects/valencia-comunidad-2.jpg\\\"]\"', 1, '2026-01-26 22:36:20.815', '2026-01-26 22:36:20.815');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Lámina Armada', 'lamina-armada', '2026-01-26 22:36:20.788', '2026-01-26 22:36:20.788'),
(2, 'Impermeabilización', 'impermeabilizacion', '2026-01-26 22:36:20.788', '2026-01-26 22:36:20.788'),
(3, 'Piscinas Residenciales', 'piscinas-residenciales', '2026-01-26 22:36:20.788', '2026-01-26 22:36:20.788'),
(4, 'Ahorro de Agua', 'ahorro-agua', '2026-01-26 22:36:20.788', '2026-01-26 22:36:20.788'),
(5, 'Piscinas Comunitarias', 'piscinas-comunitarias', '2026-01-26 22:36:20.788', '2026-01-26 22:36:20.788'),
(6, 'Rehabilitación', 'rehabilitacion', '2026-01-26 22:36:20.788', '2026-01-26 22:36:20.788');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `avatar` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `location`, `content`, `rating`, `avatar`, `featured`, `created_at`, `updated_at`) VALUES
(1, 'Comunidad Residencial Los Olivos', 'Barcelona', 'Rehabilitaron nuestra piscina comunitaria en tiempo récord. La comunicación con la comunidad fue excelente y el presupuesto se respetó al 100%.', 5, NULL, 1, '2026-01-26 22:36:20.825', '2026-01-26 22:36:20.825'),
(2, 'María García', 'Valencia', 'Después de años con problemas de fugas, por fin tenemos una piscina perfecta. El proceso fue rápido y limpio. Muy recomendables.', 5, NULL, 1, '2026-01-26 22:36:20.825', '2026-01-26 22:36:20.825'),
(3, 'Antonio López', 'Sevilla', 'Profesionales de verdad. Nos asesoraron perfectamente sobre el tipo de lámina ideal para nuestra zona. Dos veranos después, la piscina sigue como el primer día.', 5, NULL, 0, '2026-01-26 22:36:20.825', '2026-01-26 22:36:20.825'),
(4, 'Carlos Martínez', 'Madrid', 'Increíble transformación de nuestra piscina. El equipo de ARG Piscinas fue profesional, puntual y el resultado superó nuestras expectativas. La lámina armada ha sido la mejor decisión.', 5, NULL, 1, '2026-01-26 22:36:20.825', '2026-01-26 22:36:20.825');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` enum('ADMIN','EDITOR') NOT NULL DEFAULT 'EDITOR',
  `avatar` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'admin@argpiscinas.com', '$2a$10$nP6fUF7VNEXilU4AuRGxIeAQ.h3S2RkqarCLGx3r8qWPkC5pZGE0i', 'Administrador', 'ADMIN', NULL, '2026-01-26 22:36:20.758', '2026-01-26 22:36:20.758'),
(2, 'editor@argpiscinas.com', '$2a$10$dNGW4tsK0SmObi2ZkRI9h.4wx9QNFmvVOs9eLIGR4xNH6R4gII/gW', 'Editor', 'EDITOR', NULL, '2026-01-26 22:36:20.766', '2026-01-26 22:36:20.766');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('392760d1-003a-4d99-b2af-fc55d5417689', '22fbe23ad2f5a1f34f6a6f578011758305d56fedeaa79cdc1a8bbf7f13a430b5', '2026-01-26 22:36:15.051', '20260126223614_init', NULL, NULL, '2026-01-26 22:36:14.748', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_key` (`slug`),
  ADD KEY `categories_slug_idx` (`slug`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_status_idx` (`status`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_slug_key` (`slug`),
  ADD KEY `posts_slug_idx` (`slug`),
  ADD KEY `posts_status_idx` (`status`),
  ADD KEY `posts_published_at_idx` (`published_at`),
  ADD KEY `posts_author_id_fkey` (`author_id`);

--
-- Indices de la tabla `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`post_id`,`category_id`),
  ADD KEY `post_categories_category_id_fkey` (`category_id`);

--
-- Indices de la tabla `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`post_id`,`tag_id`),
  ADD KEY `post_tags_tag_id_fkey` (`tag_id`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_key` (`slug`),
  ADD KEY `projects_slug_idx` (`slug`),
  ADD KEY `projects_featured_idx` (`featured`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tags_slug_key` (`slug`),
  ADD KEY `tags_slug_idx` (`slug`);

--
-- Indices de la tabla `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `post_categories`
--
ALTER TABLE `post_categories`
  ADD CONSTRAINT `post_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_categories_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `post_tags`
--
ALTER TABLE `post_tags`
  ADD CONSTRAINT `post_tags_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

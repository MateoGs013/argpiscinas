const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

function normalizeBaseUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function getSiteUrl() {
  return normalizeBaseUrl(process.env.SITE_URL || process.env.FRONTEND_URL || 'https://argpiscinas.com');
}

// Generar sitemap XML dinámico
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = getSiteUrl();

    // Obtener posts publicados
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    });

    // Obtener proyectos
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    });

    // Obtener categorías
    const categories = await prisma.category.findMany({
      select: { slug: true, updatedAt: true },
    });

    // Obtener servicios
    const services = await prisma.service.findMany({
      select: { slug: true, updatedAt: true },
    });

    // Páginas estáticas (sin servicios individuales, serán añadidos más abajo)
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/servicios', priority: '0.9', changefreq: 'monthly' },
      { url: '/proyectos', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/contacto', priority: '0.7', changefreq: 'monthly' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Páginas estáticas
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Posts del blog
    for (const post of posts) {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Proyectos
    for (const project of projects) {
      xml += `
  <url>
    <loc>${baseUrl}/proyectos/${project.slug}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    // Categorías
    for (const category of categories) {
      xml += `
  <url>
    <loc>${baseUrl}/blog/categoria/${category.slug}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
    }

    // Servicios
    for (const svc of services) {
      xml += `
  <url>
    <loc>${baseUrl}/servicios/${svc.slug}</loc>
    <lastmod>${svc.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }

    xml += `
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generando sitemap:', error);
    res.status(500).send('Error generando sitemap');
  }
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = getSiteUrl();
  const sitemapUrl = process.env.SITEMAP_URL || `${baseUrl}/api/sitemap.xml`;
  
  const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}

Disallow: /admin
Disallow: /api/
`;

  res.set('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;

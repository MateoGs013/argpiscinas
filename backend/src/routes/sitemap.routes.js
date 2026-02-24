const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// Generar sitemap XML dinámico
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://argpiscinas.com';

    const [posts, projects, categories] = await Promise.all([
      prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.project.findMany({
        select: { slug: true, updatedAt: true },
      }),
      prisma.category.findMany({
        select: { slug: true, updatedAt: true },
      }),
    ]);

    // Páginas estáticas (removed /servicios/construccion)
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/servicios', priority: '0.9', changefreq: 'monthly' },
      { url: '/servicios/instalacion-lamina-armada', priority: '0.8', changefreq: 'monthly' },
      { url: '/servicios/rehabilitacion-piscinas', priority: '0.8', changefreq: 'monthly' },
      { url: '/servicios/impermeabilizacion', priority: '0.8', changefreq: 'monthly' },
      { url: '/proyectos', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/contacto', priority: '0.7', changefreq: 'monthly' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    for (const post of posts) {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    for (const project of projects) {
      xml += `
  <url>
    <loc>${baseUrl}/proyectos/${project.slug}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    for (const category of categories) {
      xml += `
  <url>
    <loc>${baseUrl}/blog/categoria/${category.slug}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
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
  const baseUrl = process.env.FRONTEND_URL || 'https://argpiscinas.com';
  
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap.xml

Disallow: /admin
Disallow: /api/
`;

  res.set('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;

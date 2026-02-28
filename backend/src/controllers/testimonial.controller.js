const prisma = require('../lib/prisma');
const { parseId } = require('../lib/parseId');

function parseFeatured(value, fallback = false) {
  if (value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
}

function parseRating(value, fallback = 5) {
  if (value === undefined || value === null || value === '') return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) return null;
  return parsed;
}

// Obtener testimonios (público) — with pagination (M10)
const getTestimonials = async (req, res) => {
  try {
    const { featured, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (featured === 'true') {
      where.featured = true;
    }

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.testimonial.count({ where }),
    ]);

    res.json({
      testimonials,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    res.status(500).json({ error: 'Error al obtener los testimonios' });
  }
};

// Crear testimonio (admin)
const createTestimonial = async (req, res) => {
  try {
    const { name, location, content, rating, avatar, featured } = req.body;
    const normalizedRating = parseRating(rating, 5);

    if (normalizedRating === null) {
      return res.status(400).json({ error: 'Rating debe ser un entero entre 1 y 5' });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        location,
        content,
        rating: normalizedRating,
        avatar,
        featured: parseFeatured(featured, false),
      },
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Error al crear testimonio:', error);
    res.status(500).json({ error: 'Error al crear el testimonio' });
  }
};

// Actualizar testimonio
const updateTestimonial = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const { name, location, content, rating, avatar, featured } = req.body;
    const normalizedRating = parseRating(rating, undefined);

    if (rating !== undefined && normalizedRating === null) {
      return res.status(400).json({ error: 'Rating debe ser un entero entre 1 y 5' });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        location,
        content,
        rating: normalizedRating,
        avatar,
        featured: featured === undefined ? undefined : parseFeatured(featured),
      },
    });

    res.json(testimonial);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    console.error('Error al actualizar testimonio:', error);
    res.status(500).json({ error: 'Error al actualizar el testimonio' });
  }
};

// Eliminar testimonio
const deleteTestimonial = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    await prisma.testimonial.delete({ where: { id } });

    res.json({ message: 'Testimonio eliminado correctamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }
    console.error('Error al eliminar testimonio:', error);
    res.status(500).json({ error: 'Error al eliminar el testimonio' });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

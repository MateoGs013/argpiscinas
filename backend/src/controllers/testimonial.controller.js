const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener testimonios (público)
const getTestimonials = async (req, res) => {
  try {
    const { featured } = req.query;

    const where = {};
    if (featured === 'true') {
      where.featured = true;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(testimonials);
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    res.status(500).json({ error: 'Error al obtener los testimonios' });
  }
};

// Crear testimonio (admin)
const createTestimonial = async (req, res) => {
  try {
    const { name, location, content, rating, avatar, featured } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        location,
        content,
        rating: rating || 5,
        avatar,
        featured: featured || false,
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
    const { id } = req.params;
    const { name, location, content, rating, avatar, featured } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        name,
        location,
        content,
        rating,
        avatar,
        featured,
      },
    });

    res.json(testimonial);
  } catch (error) {
    console.error('Error al actualizar testimonio:', error);
    res.status(500).json({ error: 'Error al actualizar el testimonio' });
  }
};

// Eliminar testimonio
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Testimonio eliminado correctamente' });
  } catch (error) {
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

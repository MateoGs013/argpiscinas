const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

// Obtener todas las categorías
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json(categories.map(cat => ({
      ...cat,
      postCount: cat._count.posts,
      _count: undefined,
    })));
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Obtener categoría por slug
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({
      ...category,
      postCount: category._count.posts,
      _count: undefined,
    });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

// Crear categoría
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// Actualizar categoría
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const updateData = { description };

    if (name && name !== existingCategory.name) {
      const newSlug = slugify(name, { lower: true, strict: true });
      const slugExists = await prisma.category.findFirst({
        where: {
          slug: newSlug,
          id: { not: parseInt(id) },
        },
      });

      if (slugExists) {
        return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
      }

      updateData.name = name;
      updateData.slug = newSlug;
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json(category);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminar categoría
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    if (category._count.posts > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar una categoría con posts asociados' 
      });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};

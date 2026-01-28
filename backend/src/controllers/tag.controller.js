const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

// Obtener todos los tags
const getTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json(tags.map(tag => ({
      ...tag,
      postCount: tag._count.posts,
      _count: undefined,
    })));
  } catch (error) {
    console.error('Error al obtener tags:', error);
    res.status(500).json({ error: 'Error al obtener los tags' });
  }
};

// Obtener tag por slug
const getTagBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const tag = await prisma.tag.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag no encontrado' });
    }

    res.json({
      ...tag,
      postCount: tag._count.posts,
      _count: undefined,
    });
  } catch (error) {
    console.error('Error al obtener tag:', error);
    res.status(500).json({ error: 'Error al obtener el tag' });
  }
};

// Crear tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    });

    if (existingTag) {
      return res.status(400).json({ error: 'Ya existe un tag con ese nombre' });
    }

    const tag = await prisma.tag.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error('Error al crear tag:', error);
    res.status(500).json({ error: 'Error al crear el tag' });
  }
};

// Actualizar tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingTag = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingTag) {
      return res.status(404).json({ error: 'Tag no encontrado' });
    }

    const newSlug = slugify(name, { lower: true, strict: true });
    
    const slugExists = await prisma.tag.findFirst({
      where: {
        slug: newSlug,
        id: { not: parseInt(id) },
      },
    });

    if (slugExists) {
      return res.status(400).json({ error: 'Ya existe un tag con ese nombre' });
    }

    const tag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: {
        name,
        slug: newSlug,
      },
    });

    res.json(tag);
  } catch (error) {
    console.error('Error al actualizar tag:', error);
    res.status(500).json({ error: 'Error al actualizar el tag' });
  }
};

// Eliminar tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag no encontrado' });
    }

    await prisma.tag.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Tag eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar tag:', error);
    res.status(500).json({ error: 'Error al eliminar el tag' });
  }
};

module.exports = {
  getTags,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag,
};

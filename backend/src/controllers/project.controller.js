const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

// Obtener proyectos (público)
const getProjects = async (req, res) => {
  try {
    const { featured, category } = req.query;

    const where = {};
    if (featured === 'true') {
      where.featured = true;
    }
    if (category) {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

// Obtener proyecto por slug
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Try by ID first (for admin), then by slug (for public)
    let project = null;
    const idNum = parseInt(slug);
    if (!isNaN(idNum)) {
      project = await prisma.project.findUnique({
        where: { id: idNum },
      });
    }
    if (!project) {
      project = await prisma.project.findUnique({
        where: { slug },
      });
    }

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

// Crear proyecto
const createProject = async (req, res) => {
  try {
    const { title, description, content, category, location, year, featuredImage, images, featured } = req.body;

    let slug = slugify(title, { lower: true, strict: true });

    const existingProject = await prisma.project.findUnique({ where: { slug } });
    if (existingProject) {
      slug = `${slug}-${Date.now()}`;
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        content,
        category: category || null,
        location,
        year: year ? parseInt(year) : null,
        featuredImage: featuredImage || null,
        images: images || null,
        featured: featured || false,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

// Actualizar proyecto
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, location, year, featuredImage, images, featured } = req.body;

    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const updateData = {};

    // Only include fields that were actually sent (avoid undefined in Prisma data)
    if (title && title !== existingProject.title) {
      let newSlug = slugify(title, { lower: true, strict: true });
      const slugExists = await prisma.project.findFirst({
        where: { slug: newSlug, id: { not: parseInt(id) } },
      });
      if (slugExists) {
        newSlug = `${newSlug}-${Date.now()}`;
      }
      updateData.title = title;
      updateData.slug = newSlug;
    }
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category || null;
    if (location !== undefined) updateData.location = location;
    if (year !== undefined) updateData.year = year ? parseInt(year) : null;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage || null;
    if (images !== undefined) updateData.images = images;
    if (featured !== undefined) updateData.featured = featured === true;

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json(project);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

// Eliminar proyecto
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};

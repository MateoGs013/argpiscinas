const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

// Obtener proyectos (público)
const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;

    const where = {};
    if (featured === 'true') {
      where.featured = true;
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

    const project = await prisma.project.findUnique({
      where: { slug },
    });

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
    const { title, description, content, location, year, images, featured } = req.body;

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
        location,
        year: year ? parseInt(year) : null,
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
    const { title, description, content, location, year, images, featured } = req.body;

    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const updateData = {
      description,
      content,
      location,
      year: year ? parseInt(year) : null,
      images: images || null,
      featured,
    };

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

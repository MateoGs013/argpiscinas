const prisma = require('../lib/prisma');
const { sanitize } = require('../lib/sanitize');
const { generateSlug, ensureUniqueSlug } = require('../lib/slugify');
const { parseId } = require('../lib/parseId');

function toBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  if (typeof value === 'number') return value === 1;
  return Boolean(value);
}

function parseYear(value) {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1900 || parsed > 2100) {
    return null;
  }
  return parsed;
}

function normalizeImages(value) {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;

  if (Array.isArray(value)) return value;

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : value;
    } catch {
      return value;
    }
  }

  return value;
}

// Obtener proyectos (público) — with pagination (M10)
const getProjects = async (req, res) => {
  try {
    const { featured, category, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    if (featured === 'true') {
      where.featured = true;
    }
    if (category) {
      where.category = category;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      projects,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
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
    const idNum = parseId(slug);
    if (idNum) {
      project = await prisma.project.findUnique({ where: { id: idNum } });
    }
    if (!project) {
      project = await prisma.project.findUnique({ where: { slug } });
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
    const parsedYear = parseYear(year);

    if (year !== undefined && parsedYear === null) {
      return res.status(400).json({ error: 'El año debe ser un entero entre 1900 y 2100' });
    }

    const baseSlug = generateSlug(title);
    const slug = await ensureUniqueSlug(prisma, 'project', baseSlug);

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        content: sanitize(content),
        category: category || null,
        location,
        year: parsedYear ?? null,
        featuredImage: featuredImage || null,
        images: normalizeImages(images),
        featured: toBoolean(featured, false),
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
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const { title, description, content, category, location, year, featuredImage, images, featured } = req.body;
    const parsedYear = parseYear(year);
    if (year !== undefined && parsedYear === null) {
      return res.status(400).json({ error: 'El año debe ser un entero entre 1900 y 2100' });
    }

    const existingProject = await prisma.project.findUnique({ where: { id } });

    if (!existingProject) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const updateData = {};

    if (title && title !== existingProject.title) {
      const newSlug = generateSlug(title);
      updateData.slug = await ensureUniqueSlug(prisma, 'project', newSlug, id);
      updateData.title = title;
    }
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = sanitize(content);
    if (category !== undefined) updateData.category = category || null;
    if (location !== undefined) updateData.location = location;
    if (year !== undefined) updateData.year = parsedYear;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage || null;
    if (images !== undefined) updateData.images = normalizeImages(images);
    if (featured !== undefined) updateData.featured = toBoolean(featured);

    const project = await prisma.project.update({
      where: { id },
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
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await prisma.project.delete({ where: { id } });

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

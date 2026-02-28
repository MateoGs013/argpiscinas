const prisma = require('../lib/prisma');
const { parseId } = require('../lib/parseId');
const { generateSlug, ensureUniqueSlug } = require('../lib/slugify');

function toBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  if (typeof value === 'number') return value === 1;
  return Boolean(value);
}

function toInt(value) {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

function normalizeFeatures(value) {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return value.split('\n').map((item) => item.trim()).filter(Boolean);
    }
  }

  return null;
}

const getServices = async (req, res) => {
  try {
    const { showOnHome } = req.query;
    const where = {};
    if (showOnHome === 'true') {
      where.showOnHome = true;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });

    res.json(services);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({ where: { slug } });

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description, content, image, features, showOnHome, order } = req.body;
    const parsedOrder = toInt(order);

    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    if (order !== undefined && parsedOrder === null) {
      return res.status(400).json({ error: 'El campo order debe ser un entero mayor o igual a 0' });
    }

    const baseSlug = generateSlug(String(title));
    const slug = await ensureUniqueSlug(prisma, 'service', baseSlug);

    const service = await prisma.service.create({
      data: {
        title: String(title).trim(),
        slug,
        description: description || null,
        content: content || null,
        image: image || null,
        features: normalizeFeatures(features),
        showOnHome: toBoolean(showOnHome, false),
        order: parsedOrder ?? 0,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

const updateService = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const { title, description, content, image, features, showOnHome, order } = req.body;
    const parsedOrder = toInt(order);

    if (order !== undefined && parsedOrder === null) {
      return res.status(400).json({ error: 'El campo order debe ser un entero mayor o igual a 0' });
    }

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const updateData = {};

    if (title !== undefined && String(title).trim() && String(title).trim() !== existing.title) {
      const baseSlug = generateSlug(String(title).trim());
      updateData.title = String(title).trim();
      updateData.slug = await ensureUniqueSlug(prisma, 'service', baseSlug, id);
    }
    if (description !== undefined) updateData.description = description || null;
    if (content !== undefined) updateData.content = content || null;
    if (image !== undefined) updateData.image = image || null;
    if (features !== undefined) updateData.features = normalizeFeatures(features);
    if (showOnHome !== undefined) updateData.showOnHome = toBoolean(showOnHome, false);
    if (order !== undefined) updateData.order = parsedOrder;

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
    });

    res.json(service);
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    await prisma.service.delete({ where: { id } });
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};

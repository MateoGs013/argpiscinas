const prisma = require('../lib/prisma');
const { sanitize } = require('../lib/sanitize');

function inferSectionFromKey(key) {
  if (!key || typeof key !== 'string') return 'general';
  const segments = key.split('.').filter(Boolean);
  if (segments.length === 0) return 'general';
  if (segments[0] === 'services' && segments.length > 1) {
    return `services.${segments[1]}`;
  }
  return segments[0];
}

function inferTypeFromValue(value) {
  const normalized = String(value ?? '').trim();
  if (!normalized) return 'text';

  if (normalized.startsWith('{') || normalized.startsWith('[')) {
    try {
      const parsed = JSON.parse(normalized);
      if (parsed && typeof parsed === 'object') {
        return 'json';
      }
    } catch (_error) {
      // Keep evaluating with other heuristics
    }
  }

  if (/<[a-z][\s\S]*>/i.test(normalized)) return 'html';
  if (normalized.length > 160) return 'textarea';
  return 'text';
}

function buildCreatePayload(item) {
  return {
    key: item.key,
    value: sanitize(String(item.value ?? '')),
    section: item.section || inferSectionFromKey(item.key),
    label: item.label || item.key,
    type: item.type || inferTypeFromValue(item.value)
  };
}

// GET /api/content — Obtener todo el contenido (público)
const getAllContent = async (req, res) => {
  try {
    const contents = await prisma.siteContent.findMany({
      orderBy: [{ section: 'asc' }, { key: 'asc' }]
    });

    const contentMap = {};
    contents.forEach(item => {
      contentMap[item.key] = item.value;
    });

    res.json({ data: contentMap, items: contents });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Error al obtener el contenido' });
  }
};

// GET /api/content/sections — Obtener contenido agrupado por sección (admin)
const getContentBySections = async (req, res) => {
  try {
    const contents = await prisma.siteContent.findMany({
      orderBy: [{ section: 'asc' }, { id: 'asc' }]
    });

    const sections = {};
    contents.forEach(item => {
      if (!sections[item.section]) {
        sections[item.section] = [];
      }
      sections[item.section].push(item);
    });

    res.json({ data: sections });
  } catch (error) {
    console.error('Error fetching content sections:', error);
    res.status(500).json({ error: 'Error al obtener las secciones' });
  }
};

// PUT /api/content/:key — Actualizar un contenido específico (admin)
const updateContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, section, label, type } = req.body;

    if (value === undefined || value === null) {
      return res.status(400).json({ error: 'El campo "value" es requerido' });
    }

    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value: sanitize(String(value)) },
      create: buildCreatePayload({ key, value, section, label, type })
    });

    res.json({ data: content });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Error al actualizar el contenido' });
  }
};

// PUT /api/content — Actualización masiva (admin)
const bulkUpdateContent = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Se requiere un array de items' });
    }

    const updates = await Promise.all(items.map(item =>
      prisma.siteContent.upsert({
        where: { key: item.key },
        update: { value: sanitize(String(item.value ?? '')) },
        create: buildCreatePayload(item)
      }).catch(err => {
        console.error(`Error updating key "${item.key}":`, err.message);
        return null;
      })
    ));

    const successful = updates.filter(u => u !== null);

    res.json({
      message: `${successful.length} de ${items.length} contenidos actualizados`,
      data: successful
    });
  } catch (error) {
    console.error('Error bulk updating content:', error);
    res.status(500).json({ error: 'Error al actualizar el contenido' });
  }
};

module.exports = {
  getAllContent,
  getContentBySections,
  updateContent,
  bulkUpdateContent
};

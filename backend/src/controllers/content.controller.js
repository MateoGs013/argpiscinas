const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/content — Obtener todo el contenido (público)
const getAllContent = async (req, res) => {
  try {
    const contents = await prisma.siteContent.findMany({
      orderBy: [{ section: 'asc' }, { key: 'asc' }]
    });

    // Devolver como objeto key-value para fácil consumo en frontend
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

    // Agrupar por sección
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
    const { value } = req.body;

    if (value === undefined || value === null) {
      return res.status(400).json({ error: 'El campo "value" es requerido' });
    }

    const content = await prisma.siteContent.update({
      where: { key },
      data: { value: String(value) }
    });

    res.json({ data: content });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }
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

    const updates = await Promise.all(
      items.map(item =>
        prisma.siteContent.update({
          where: { key: item.key },
          data: { value: String(item.value) }
        }).catch(err => {
          console.error(`Error updating key "${item.key}":`, err.message);
          return null;
        })
      )
    );

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

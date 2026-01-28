const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Enviar mensaje de contacto
const createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
      },
    });

    res.status(201).json({
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
      id: contact.id,
    });
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
};

// Obtener todos los contactos (admin)
const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    if (status) {
      where.status = status;
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
};

// Obtener un contacto
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error al obtener contacto:', error);
    res.status(500).json({ error: 'Error al obtener el contacto' });
  }
};

// Actualizar estado del contacto
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(contact);
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    res.status(500).json({ error: 'Error al actualizar el contacto' });
  }
};

// Eliminar contacto
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Contacto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).json({ error: 'Error al eliminar el contacto' });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};

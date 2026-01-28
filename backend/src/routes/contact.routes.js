const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contact.controller');

const router = express.Router();

// Ruta pública - enviar mensaje
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('message').trim().notEmpty().withMessage('El mensaje es requerido'),
  ],
  validate,
  createContact
);

// Rutas admin
router.get('/', authenticate, getContacts);
router.get('/:id', authenticate, getContactById);

router.patch(
  '/:id/status',
  authenticate,
  [
    body('status').isIn(['PENDING', 'READ', 'REPLIED', 'ARCHIVED']).withMessage('Estado inválido'),
  ],
  validate,
  updateContactStatus
);

router.delete('/:id', authenticate, deleteContact);

module.exports = router;

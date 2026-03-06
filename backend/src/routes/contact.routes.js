const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contact.controller');

const router = express.Router();

const contactWindowMs = Number.parseInt(process.env.CONTACT_RATE_WINDOW_MS, 10) || 60 * 60 * 1000;
const contactMaxRequests = Number.parseInt(process.env.CONTACT_RATE_MAX, 10) || 5;

// Rate limit for public contact form (C2: spam protection)
const contactLimiter = rateLimit({
  windowMs: contactWindowMs,
  max: contactMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados mensajes enviados, intente de nuevo más tarde' },
});

// Ruta pública - enviar mensaje
router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('message').trim().notEmpty().withMessage('El mensaje es requerido'),
  ],
  validate,
  createContact
);

// Rutas admin (H4: authorize ADMIN)
router.get('/', authenticate, authorize('ADMIN'), getContacts);
router.get('/:id', authenticate, authorize('ADMIN'), getContactById);

router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN'),
  [
    body('status').isIn(['PENDING', 'READ', 'REPLIED', 'ARCHIVED']).withMessage('Estado inválido'),
  ],
  validate,
  updateContactStatus
);

router.delete('/:id', authenticate, authorize('ADMIN'), deleteContact);

module.exports = router;

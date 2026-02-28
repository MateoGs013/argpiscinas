const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/service.controller');

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('title').trim().notEmpty().withMessage('El título es requerido'),
    body('content').optional({ nullable: true }).isString().withMessage('El contenido debe ser texto'),
  ],
  validate,
  createService
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  [
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío'),
    body('content').optional({ nullable: true }).isString().withMessage('El contenido debe ser texto'),
  ],
  validate,
  updateService
);

router.delete('/:id', authenticate, authorize('ADMIN'), deleteService);

module.exports = router;

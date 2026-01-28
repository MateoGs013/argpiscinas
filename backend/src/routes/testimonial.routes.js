const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial.controller');

const router = express.Router();

// Ruta pública
router.get('/', getTestimonials);

// Rutas admin
router.post(
  '/',
  authenticate,
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('content').trim().notEmpty().withMessage('El contenido es requerido'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating debe ser entre 1 y 5'),
  ],
  validate,
  createTestimonial
);

router.put(
  '/:id',
  authenticate,
  [
    body('name').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('content').optional().trim().notEmpty().withMessage('El contenido no puede estar vacío'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating debe ser entre 1 y 5'),
  ],
  validate,
  updateTestimonial
);

router.delete('/:id', authenticate, deleteTestimonial);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const router = express.Router();

// Rutas públicas
router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Rutas admin (H4: authorize ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  ],
  validate,
  createCategory
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  [
    body('name').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
  ],
  validate,
  updateCategory
);

router.delete('/:id', authenticate, authorize('ADMIN'), deleteCategory);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
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

// Rutas admin
router.post(
  '/',
  authenticate,
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  ],
  validate,
  createCategory
);

router.put(
  '/:id',
  authenticate,
  [
    body('name').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
  ],
  validate,
  updateCategory
);

router.delete('/:id', authenticate, deleteCategory);

module.exports = router;

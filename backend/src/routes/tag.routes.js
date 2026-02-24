const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  getTags,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag,
} = require('../controllers/tag.controller');

const router = express.Router();

// Rutas públicas
router.get('/', getTags);
router.get('/:slug', getTagBySlug);

// Rutas admin (H4: authorize ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  ],
  validate,
  createTag
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  ],
  validate,
  updateTag
);

router.delete('/:id', authenticate, authorize('ADMIN'), deleteTag);

module.exports = router;

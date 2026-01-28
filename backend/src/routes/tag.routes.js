const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
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

// Rutas admin
router.post(
  '/',
  authenticate,
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  ],
  validate,
  createTag
);

router.put(
  '/:id',
  authenticate,
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  ],
  validate,
  updateTag
);

router.delete('/:id', authenticate, deleteTag);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth.middleware');
const {
  getPosts,
  getAdminPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  updatePostStatus,
} = require('../controllers/post.controller');

const router = express.Router();

// Rutas públicas
router.get('/', getPosts);
router.get('/slug/:slug', optionalAuth, getPostBySlug);

// Rutas admin (H4: authorize ADMIN)
router.get('/admin', authenticate, authorize('ADMIN', 'EDITOR'), getAdminPosts);
router.get('/admin/:id', authenticate, authorize('ADMIN', 'EDITOR'), getPostById);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'EDITOR'),
  [
    body('title').trim().notEmpty().withMessage('El título es requerido'),
    body('content').trim().notEmpty().withMessage('El contenido es requerido'),
    body('status').optional().isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED']).withMessage('Estado inválido'),
    body('publishedAt')
      .optional({ values: 'falsy' })
      .isISO8601()
      .withMessage('Fecha de publicación inválida'),
    body('categoryIds')
      .optional()
      .isArray()
      .withMessage('categoryIds debe ser un array'),
    body('categoryIds.*')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Cada categoryId debe ser un entero positivo'),
    body('tagIds')
      .optional()
      .isArray()
      .withMessage('tagIds debe ser un array'),
    body('tagIds.*')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Cada tagId debe ser un entero positivo'),
  ],
  validate,
  createPost
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'EDITOR'),
  [
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío'),
    body('status').optional().isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED']).withMessage('Estado inválido'),
    body('publishedAt')
      .optional({ values: 'falsy' })
      .isISO8601()
      .withMessage('Fecha de publicación inválida'),
    body('categoryIds')
      .optional()
      .isArray()
      .withMessage('categoryIds debe ser un array'),
    body('categoryIds.*')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Cada categoryId debe ser un entero positivo'),
    body('tagIds')
      .optional()
      .isArray()
      .withMessage('tagIds debe ser un array'),
    body('tagIds.*')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Cada tagId debe ser un entero positivo'),
  ],
  validate,
  updatePost
);

router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN', 'EDITOR'),
  [
    body('status').isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED']).withMessage('Estado inválido'),
  ],
  validate,
  updatePostStatus
);

router.delete('/:id', authenticate, authorize('ADMIN'), deletePost);

module.exports = router;

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

const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, optionalAuth } = require('../middlewares/auth.middleware');
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

// Rutas admin
router.get('/admin', authenticate, getAdminPosts);
router.get('/admin/:id', authenticate, getPostById);

router.post(
  '/',
  authenticate,
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
  [
    body('status').isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED']).withMessage('Estado inválido'),
  ],
  validate,
  updatePostStatus
);

router.delete('/:id', authenticate, deletePost);

module.exports = router;

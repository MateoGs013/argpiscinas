const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');

const router = express.Router();

// Rutas públicas
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Rutas admin (H4: authorize ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('title').trim().notEmpty().withMessage('El título es requerido'),
  ],
  validate,
  createProject
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  [
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío'),
  ],
  validate,
  updateProject
);

router.delete('/:id', authenticate, authorize('ADMIN'), deleteProject);

module.exports = router;

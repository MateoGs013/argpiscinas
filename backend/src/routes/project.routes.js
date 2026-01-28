const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
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

// Rutas admin
router.post(
  '/',
  authenticate,
  [
    body('title').trim().notEmpty().withMessage('El título es requerido'),
  ],
  validate,
  createProject
);

router.put(
  '/:id',
  authenticate,
  [
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío'),
  ],
  validate,
  updateProject
);

router.delete('/:id', authenticate, deleteProject);

module.exports = router;

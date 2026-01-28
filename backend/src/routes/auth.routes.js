const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  login,
  me,
  updateProfile,
  register,
} = require('../controllers/auth.controller');

const router = express.Router();

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
  ],
  validate,
  login
);

// Obtener usuario actual
router.get('/me', authenticate, me);

// Actualizar perfil
router.put(
  '/profile',
  authenticate,
  [
    body('email').optional().isEmail().withMessage('Email inválido'),
    body('name').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
  ],
  validate,
  updateProfile
);

// Registrar usuario (solo admin)
router.post(
  '/register',
  authenticate,
  authorize('ADMIN'),
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('role').optional().isIn(['ADMIN', 'EDITOR']).withMessage('Rol inválido'),
  ],
  validate,
  register
);

module.exports = router;

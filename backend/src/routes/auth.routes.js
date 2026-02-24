const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { validate } = require('../middlewares/validate.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  login,
  me,
  updateProfile,
  register,
} = require('../controllers/auth.controller');

const router = express.Router();

// Rate limit for login (C2: brute-force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos de login, intente de nuevo en 15 minutos' },
});

// Login
router.post(
  '/login',
  loginLimiter,
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

// Registrar usuario (solo admin) — L7: stronger password validation
router.post(
  '/register',
  authenticate,
  authorize('ADMIN'),
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula')
      .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una minúscula')
      .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('role').optional().isIn(['ADMIN', 'EDITOR']).withMessage('Rol inválido'),
  ],
  validate,
  register
);

module.exports = router;

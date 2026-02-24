const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const {
  getAllContent,
  getContentBySections,
  updateContent,
  bulkUpdateContent
} = require('../controllers/content.controller');

// Rutas públicas
router.get('/', getAllContent);

// Rutas admin
router.get('/sections', authenticate, getContentBySections);
router.put('/bulk', authenticate, bulkUpdateContent);
router.put('/:key', authenticate, updateContent);

module.exports = router;

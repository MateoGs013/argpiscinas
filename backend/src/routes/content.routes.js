const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  getAllContent,
  getContentBySections,
  updateContent,
  bulkUpdateContent
} = require('../controllers/content.controller');

// Rutas públicas
router.get('/', getAllContent);

// Rutas admin (H4: authorize ADMIN)
router.get('/sections', authenticate, authorize('ADMIN'), getContentBySections);
router.put('/bulk', authenticate, authorize('ADMIN'), bulkUpdateContent);
router.put('/:key', authenticate, authorize('ADMIN'), updateContent);

module.exports = router;

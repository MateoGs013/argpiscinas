const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { upload, uploadImage, deleteImage } = require('../controllers/upload.controller');

const router = express.Router();

// Subir imagen (requiere autenticación + admin role)
router.post('/image', authenticate, authorize('ADMIN', 'EDITOR'), upload.single('image'), uploadImage);

// Eliminar imagen (H4: authorize ADMIN)
router.delete('/image/:filename', authenticate, authorize('ADMIN'), deleteImage);

module.exports = router;

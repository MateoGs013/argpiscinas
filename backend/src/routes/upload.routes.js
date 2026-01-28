const express = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const { upload, uploadImage, deleteImage } = require('../controllers/upload.controller');

const router = express.Router();

// Subir imagen (requiere autenticación)
router.post('/image', authenticate, upload.single('image'), uploadImage);

// Eliminar imagen
router.delete('/image/:filename', authenticate, deleteImage);

module.exports = router;

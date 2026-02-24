const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Magic bytes for allowed image types
const MAGIC_BYTES = {
  'image/jpeg': [Buffer.from([0xFF, 0xD8, 0xFF])],
  'image/png': [Buffer.from([0x89, 0x50, 0x4E, 0x47])],
  'image/gif': [Buffer.from('GIF87a'), Buffer.from('GIF89a')],
  'image/webp': [Buffer.from('RIFF')], // RIFF....WEBP
};

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filtrar tipos de archivo (client-sent mimetype — first layer)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP).'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/**
 * Validate file content by checking magic bytes (second layer).
 * Returns true if file content matches an allowed image type.
 */
function validateMagicBytes(filePath) {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(12);
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);

    for (const signatures of Object.values(MAGIC_BYTES)) {
      for (const sig of signatures) {
        if (buffer.subarray(0, sig.length).equals(sig)) {
          return true;
        }
      }
    }
    return false;
  } catch {
    return false;
  }
}

// Controller para subir imagen
const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }

    // Validate magic bytes — reject spoofed MIME types
    if (!validateMagicBytes(req.file.path)) {
      // Remove the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'El archivo no es una imagen válida' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
};

// Controller para eliminar imagen (C1 fix: sanitise filename to prevent path traversal)
const deleteImage = (req, res) => {
  try {
    const { filename } = req.params;

    // Sanitise: only allow the basename (no directory traversal)
    const safeName = path.basename(filename);

    // Extra guard: reject any remaining suspicious patterns
    if (safeName !== filename || safeName.includes('..') || safeName.includes('\0')) {
      return res.status(400).json({ error: 'Nombre de archivo inválido' });
    }

    const filePath = path.join(__dirname, '../../uploads', safeName);

    // Ensure resolved path is still inside uploads dir
    const uploadsDir = path.resolve(__dirname, '../../uploads');
    if (!path.resolve(filePath).startsWith(uploadsDir)) {
      return res.status(400).json({ error: 'Nombre de archivo inválido' });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Archivo eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ error: 'Error al eliminar el archivo' });
  }
};

module.exports = {
  upload,
  uploadImage,
  deleteImage,
};

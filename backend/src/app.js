require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

if (!process.env.JWT_SECRET || !process.env.JWT_SECRET.trim()) {
  console.error('Falta JWT_SECRET en variables de entorno. El backend no puede iniciar sin esta clave.');
  process.exit(1);
}

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const categoryRoutes = require('./routes/category.routes');
const tagRoutes = require('./routes/tag.routes');
const projectRoutes = require('./routes/project.routes');
const contactRoutes = require('./routes/contact.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const uploadRoutes = require('./routes/upload.routes');
const sitemapRoutes = require('./routes/sitemap.routes');
const contentRoutes = require('./routes/content.routes');
const serviceRoutes = require('./routes/service.routes');

const app = express();

function normalizeOrigin(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function getAllowedOrigins() {
  const explicitOrigins = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173';
  return explicitOrigins
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

const allowedOrigins = getAllowedOrigins();

// Middlewares
app.use(cors({
  origin(origin, callback) {
    // Permitir requests server-to-server/curl sin Origin
    if (!origin) return callback(null, true);

    const normalizedOrigin = normalizeOrigin(origin);
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
}));
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api', sitemapRoutes);

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err?.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'El archivo excede el tamaño máximo permitido' });
    }
    return res.status(400).json({ error: 'Error al procesar el archivo subido' });
  }

  if (err?.message === 'Origen no permitido por CORS') {
    return res.status(403).json({ error: err.message });
  }

  if (err?.message?.includes('Tipo de archivo no permitido')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

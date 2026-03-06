# ARG Piscinas - Web Corporativa

Web corporativa moderna para empresa especializada en instalación y rehabilitación de piscinas con lámina armada.

## 🚀 Tecnologías

### Frontend
- **Vue 3** (Composition API)
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **GSAP** + ScrollTrigger - Animaciones
- **Vue Router** - Navegación
- **Pinia** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** + Express
- **Prisma** ORM
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación

## 📦 Instalación

### Requisitos previos
- Node.js 18+
- MySQL 8.0+

### 1. Clonar repositorio
```bash
git clone https://github.com/tu-usuario/argpiscinas.git
cd argpiscinas
```

### 2. Configurar Backend
```bash
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL
```

Editar `.env`:
```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/argpiscinas"
JWT_SECRET="tu-clave-secreta-muy-segura"
JWT_EXPIRES_IN="7d"
PORT=3001
```

### 3. Configurar Base de Datos
```bash
# Crear base de datos
mysql -u root -p -e "CREATE DATABASE argpiscinas;"

# Ejecutar migraciones
npx prisma migrate dev --name init

# Poblar datos iniciales
npx prisma db seed
```

### 4. Configurar Frontend
```bash
cd ../frontend
npm install
```

## 🏃 Ejecución

### Desarrollo
Abre dos terminales:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

El frontend estará en `http://localhost:5173` y el backend en `http://localhost:3001`.

### Producción
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
argpiscinas/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Modelos de base de datos
│   │   └── seed.js            # Datos iniciales
│   ├── src/
│   │   ├── controllers/       # Controladores
│   │   ├── middlewares/       # Middlewares
│   │   ├── routes/            # Rutas API
│   │   └── app.js             # Servidor Express
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Estilos CSS
│   │   ├── components/        # Componentes Vue
│   │   ├── composables/       # Composables (SEO, Animations)
│   │   ├── router/            # Vue Router
│   │   ├── services/          # API Service
│   │   ├── stores/            # Pinia stores
│   │   ├── views/             # Vistas/Páginas
│   │   └── animations/        # GSAP utilities
│   └── package.json
│
└── README.md
```

## 🔑 Credenciales de Admin

Después de ejecutar el seed, puedes acceder al panel de admin con:

- **Email:** admin@argpiscinas.com
- **Contraseña:** admin123

⚠️ **Importante:** Cambiar estas credenciales en producción.

## 📱 Características

### Público
- ✅ Home con animaciones GSAP
- ✅ Páginas de servicios (4 tipos)
- ✅ Galería de proyectos
- ✅ Blog con categorías y tags
- ✅ Formulario de contacto
- ✅ Diseño responsive (mobile-first)
- ✅ Optimización SEO
- ✅ Meta tags dinámicos
- ✅ Schema.org structured data

### Panel Admin
- ✅ Dashboard con estadísticas
- ✅ CRUD de posts
- ✅ Gestión de categorías
- ✅ Gestión de tags
- ✅ CRUD de proyectos
- ✅ Bandeja de mensajes de contacto
- ✅ Autenticación JWT

## 🎨 Personalización

### Colores
Editar `frontend/tailwind.config.js`:
```js
colors: {
  primary: {
    50: '#e6f2ff',
    // ...
  }
}
```

### Contenido
- Modificar textos en los componentes Vue
- Añadir imágenes en `public/`
- Actualizar datos de contacto en Footer y Contact

## 📄 API Endpoints

### Auth
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuario actual

### Posts
- `GET /api/posts` - Listar posts
- `GET /api/posts/:slug` - Detalle por slug
- `POST /api/posts` - Crear (auth)
- `PUT /api/posts/:id` - Actualizar (auth)
- `DELETE /api/posts/:id` - Eliminar (auth)

### Categories / Tags
- `GET /api/categories`
- `POST /api/categories` (auth)
- `GET /api/tags`
- `POST /api/tags` (auth)

### Projects
- `GET /api/projects`
- `GET /api/projects/:slug`
- `POST /api/projects` (auth)

### Contacts
- `GET /api/contacts` (auth)
- `POST /api/contacts` - Enviar mensaje

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir carpeta dist/
```

### Backend (Railway/Render)
1. Conectar repositorio
2. Configurar variables de entorno
3. Deploy automático

## 📝 Licencia

MIT

## 👥 Autor

Tu Nombre - [tu@email.com](mailto:tu@email.com)

---

Desarrollado con ❤️ para ARG Piscinas

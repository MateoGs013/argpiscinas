# ARG Piscinas - Contexto del Proyecto y Flujo Local/Deploy

Este documento resume el estado real del proyecto para trabajar en local y preparar el paso a producción.

## 1) Panorama rápido

- Monorepo con:
- `frontend/`: Vue 3 + Vite + Pinia + Tailwind.
- `backend/`: Node.js + Express + Prisma + MySQL.
- Base de datos: MySQL (ideal para usar MySQL de XAMPP en local).
- Subida de imágenes: backend en `backend/uploads`, expuestas por `/uploads`.

## 2) Estructura útil

- `frontend/src/services/api.js`: cliente Axios y resolución de imágenes.
- `frontend/vite.config.js`: proxy de desarrollo.
- `backend/src/app.js`: configuración CORS, rutas API, health check.
- `backend/prisma/schema.prisma`: modelos de datos.
- `backend/prisma/seed.js`: datos iniciales (usuarios, posts, servicios, proyectos, etc.).

## 3) Variables de entorno relevantes

### Backend (`backend/.env`)

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `PORT` (default recomendado: `3001`)
- `NODE_ENV`
- `FRONTEND_URL` (origen permitido por CORS)

### Frontend (`frontend/.env.local`)

- `VITE_API_URL=http://localhost:3001` para desarrollo local contra backend local.

Nota: si `VITE_API_URL` no existe, el frontend usa rutas relativas `/api` y depende del proxy/configuración del host.

## 4) Flujo local recomendado con XAMPP

## 4.1 Prerrequisitos

- Node.js 18+.
- XAMPP instalado (usar al menos MySQL; Apache opcional para servir `dist`).

## 4.2 Levantar MySQL en XAMPP

1. Abrir XAMPP Control Panel.
2. Iniciar `MySQL`.
3. Crear la base `argpiscinas` (por phpMyAdmin o CLI).

Ejemplo por CLI:

```sql
CREATE DATABASE argpiscinas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 4.3 Configurar backend

Desde `backend/`:

```bash
npm install
```

Configurar `.env` con tu usuario/password de MySQL (XAMPP suele usar `root` sin password en local, según instalación):

```env
DATABASE_URL="mysql://root:password@localhost:3306/argpiscinas"
JWT_SECRET="cambiar-esto"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

## 4.4 Migraciones + seed

Desde `backend/`:

```bash
npx prisma generate
npx prisma migrate dev
npm run db:seed
```

## 4.5 Levantar backend

```bash
npm run dev
```

Health check:

- `http://localhost:3001/api/health`

## 4.6 Configurar frontend

Desde `frontend/`:

```bash
npm install
npm run dev
```

Frontend local:

- `http://localhost:5173`

## 5) Build de frontend + backend remoto (objetivo final)

Objetivo indicado: trabajar local con XAMPP, luego compilar frontend y publicar backend para que el frontend lo consuma.

## 5.1 Build frontend para producción

En `frontend/.env.production`:

```env
VITE_API_URL=https://api.tu-dominio.com
```

Luego:

```bash
cd frontend
npm run build
```

Resultado: `frontend/dist/`.

## 5.2 Publicar frontend estático (Apache/XAMPP o hosting)

Copiar contenido de `dist/` al directorio público (`htdocs` en XAMPP o carpeta pública del hosting).

Como usa `createWebHistory()` (Vue Router), agregar `/.htaccess` en el frontend desplegado:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 5.3 Publicar backend

- Deploy en VPS/Render/Railway (Node + MySQL).
- Variables de entorno mínimas:
- `DATABASE_URL` (producción)
- `JWT_SECRET` fuerte
- `PORT`
- `NODE_ENV=production`
- `FRONTEND_URL=https://tu-frontend.com`

El frontend debe consumir ese backend vía `VITE_API_URL`.

## 6) Hallazgos importantes (estado actual)

1. Prisma no valida el esquema actual:
- En `backend/prisma/schema.prisma` hay un campo inválido en `Service`: `"order" Int ...`.
- Esto rompe `prisma validate` y puede bloquear migraciones/cliente.

2. Inconsistencia en rutas de contacto:
- Backend monta contactos en `/api/contact` (singular).
- Parte del frontend usa `/contacts` (plural), lo que puede dar `404`.

3. Inconsistencia de modelo de contacto:
- Frontend usa campos como `subject` y `read`.
- Modelo/backend actual usa `status` y no contempla `subject`.
- El panel de contactos puede comportarse mal hasta unificar contrato.

4. Script faltante en raíz:
- `package.json` raíz tiene `setup:local` apuntando a `scripts/setupLocalDev.js`, pero ese archivo no existe.

5. Proxy de Vite apunta a producción por defecto:
- `frontend/vite.config.js` usa `https://api.argpiscinas.pegasuz.com.ar` como proxy.
- En local conviene depender de `VITE_API_URL=http://localhost:3001` para evitar mezclar entornos.

## 7) Orden recomendado de trabajo técnico

1. Corregir `schema.prisma` para que Prisma valide.
2. Unificar contrato de contactos (rutas y campos) entre frontend y backend.
3. Confirmar flujo de imágenes (`/uploads`) en local y producción.
4. Recién después, estabilizar build/deploy final de frontend estático + backend remoto.

---

Si querés, el siguiente paso lo puedo hacer yo directamente: corregir el contrato de contactos y dejarlo consistente end-to-end (frontend + backend + Prisma).

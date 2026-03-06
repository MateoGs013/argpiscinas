# Guía de Inicio Rápido - ARG Piscinas

## ✅ Estado Actual

- ✅ Frontend funcionando en http://localhost:5173
- ✅ Backend funcionando en http://localhost:3001
- ⚠️ Base de datos MySQL pendiente de configurar

## 🗄️ Configurar MySQL

### Paso 1: Crear Base de Datos

Si tienes MySQL instalado, ejecuta:

```sql
CREATE DATABASE argpiscinas;
```
 
O desde terminal:
```bash
mysql -u root -p -e "CREATE DATABASE argpiscinas;"
```

### Paso 2: Configurar credenciales

Edita el archivo `backend/.env` con tus credenciales de MySQL:

```env
DATABASE_URL="mysql://tu_usuario:tu_contraseña@localhost:3306/argpiscinas"
```

### Paso 3: Ejecutar migraciones de Prisma

```bash
cd backend
npx prisma migrate dev --name init
```

### Paso 4: Poblar datos iniciales

```bash
cd backend
npm run db:seed
```

## 🔑 Credenciales Admin (después del seed)

- **URL:** http://localhost:5173/admin/login
- **Email:** admin@argpiscinas.com
- **Contraseña:** admin123

## 🚀 Comandos Útiles

```bash
# Iniciar frontend
cd frontend && npm run dev

# Iniciar backend
cd backend && npm run dev

# Abrir Prisma Studio (GUI de base de datos)
cd backend && npx prisma studio

# Regenerar cliente Prisma
cd backend && npx prisma generate
```

## 📱 URLs del Proyecto

| Descripción | URL |
|-------------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001/api |
| Health Check | http://localhost:3001/api/health |
| Panel Admin | http://localhost:5173/admin |
| Prisma Studio | http://localhost:5555 |

## 🛠️ Troubleshooting

### Error: "Can't reach database server"
- Verifica que MySQL esté corriendo
- Verifica las credenciales en `.env`

### Error: "Table does not exist"
- Ejecuta las migraciones: `npx prisma migrate dev`

### Error: "Module not found"
- Ejecuta `npm install` en las carpetas correspondientes

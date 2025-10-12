# Pre-altas Backend API

API REST desarrollada con NestJS para el sistema de pre-altas de materias universitarias. Esta aplicación permite la gestión de estudiantes, carreras, materias, periodos y la administración de pre-inscripciones.

## 🚀 Tecnologías

- **Framework**: NestJS
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT + Passport
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator
- **Containerización**: Docker & Docker Compose

## 📋 Funcionalidades

- ✅ Gestión de estudiantes y administradores
- ✅ Autenticación JWT con roles (estudiante/admin)
- ✅ CRUD de carreras y materias
- ✅ Gestión de periodos académicos
- ✅ Relación de materias por carrera
- ✅ Sistema de paginación
- ✅ Documentación automática con Swagger
- ✅ Validación de datos
- ✅ Seeder de datos iniciales

## 🛠️ Instalación y Configuración

### Prerequisitos

- Node.js (v18+)
- Docker y Docker Compose
- Git

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# Puerto de la aplicación
PORT=3000

# Configuración de base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mi_basededatos

# JWT Secret para autenticación
JWT_KEY=tu_jwt_secret_key_muy_segura

# Entorno de desarrollo
NODE_ENV=development
```

### 🔧 Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd pre-altas-backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear el archivo .env con las variables mostradas arriba
   ```

4. **Ejecutar con Docker (Recomendado)**

   Para ejecutar la aplicación en **modo desarrollo** con hot-reload:
   ```bash
   docker-compose up pre-altas-backend-dev
   ```

   Esto iniciará:
   - La aplicación en el puerto 3000
   - PostgreSQL en el puerto 5432
   - Debugger en el puerto 9229
   - Hot-reload automático

5. **Ejecutar sin Docker**
   ```bash
   # Iniciar solo la base de datos
   docker-compose up db -d

   # Ejecutar la aplicación en modo desarrollo
   npm run start:dev
   ```

### 🐳 Comandos Docker Disponibles

```bash
# Modo desarrollo (con hot-reload)
docker-compose up pre-altas-backend-dev

# Modo producción
docker-compose up pre-altas-backend

# Solo base de datos
docker-compose up db

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### 📦 Scripts de NPM

```bash
# Desarrollo
npm run start:dev          # Desarrollo con hot-reload
npm run start:debug        # Desarrollo con debugger

# Producción
npm run build              # Compilar para producción
npm run start:prod         # Ejecutar versión de producción

npm run format             # Formatear código
npm run lint               # Linter
npm run test               # Ejecutar tests
npm run test:watch         # Tests en modo watch
```

## 📚 Documentación de la API

Una vez que la aplicación esté en ejecución, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:<PUERTO_DE_TU_ENV>/api
```
Reemplaza `<PUERTO_DE_TU_ENV>` por el puerto configurado en tu archivo `.env` (por ejemplo, `3000`).

La documentación incluye:
- Todos los endpoints disponibles
- Esquemas de datos
- Ejemplos de peticiones y respuestas
- Autenticación JWT integrada

## 🗄️ Estructura del Proyecto

```
src/
├── admins/              # Módulo de administradores
├── auth/                # Autenticación y autorización
├── careers/             # Gestión de carreras
├── career-subjects/     # Relación carreras-materias
├── docs/                # Decoradores para documentación
├── periods/             # Periodos académicos
├── seed/                # Datos de prueba
├── students/            # Gestión de estudiantes
├── subjects/            # Gestión de materias
├── app.module.ts        # Módulo principal
└── main.ts              # Punto de entrada
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Existen dos tipos de usuarios:

### Roles disponibles:
- **Student**: Estudiantes del sistema
- **Admin**: Administradores con permisos completos

### Endpoints de autenticación:
- `POST /auth/login/student` - Login para estudiantes
- `POST /auth/login/admin` - Login para administradores
- `POST /auth/register/student` - Registro de nuevos estudiantes

## 🌱 Datos de Prueba (Seeder)

El proyecto incluye un seeder para poblar la base de datos con datos de ejemplo:

```bash
# Los datos se cargan automáticamente al iniciar la aplicación
# Los archivos de datos están en src/seed/data/
```

## 🚀 Despliegue

### Docker Compose (Producción)

```bash
# Construir y ejecutar en modo producción
docker-compose up pre-altas-backend

# En background
docker-compose up -d pre-altas-backend
```

### Variables de Entorno para Producción

Asegúrate de configurar las siguientes variables para producción:

```bash
NODE_ENV=production
JWT_KEY=tu_jwt_secret_muy_seguro_para_produccion
DB_PASSWORD=password_seguro_para_produccion
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
```bash
# Verificar que PostgreSQL esté ejecutándose
docker-compose ps

# Reiniciar servicios
docker-compose restart
```

### Puerto ya en uso
```bash
# Cambiar el puerto en .env
PORT=3001

# O detener el proceso que usa el puerto
lsof -ti:3000 | xargs kill -9
```

### Problemas con volúmenes de Docker
```bash
# Limpiar volúmenes
docker-compose down -v
docker volume prune
```

**Desarrollado como parte del Servicio Social**
**Universidad**: Universidad Autónoma de Querétaro

**Repositorio**: https://github.com/FernandoRuiz87/pre-altas-materias-backend

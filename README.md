# 🎨 Frontend Sistema de Cursos - React

Aplicación frontend desarrollada con React que consume una API segura con autenticación JWT.

🔗 Backend del proyecto:
https://github.com/jara96/api-seguridad-jwt

---

## 🚀 Stack Tecnológico

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- Fetch API
- JWT Authentication

---

## 📌 Funcionalidades

- Login de usuario
- Recepción y almacenamiento de JWT
- Protección de rutas privadas
- Dashboard dinámico según rol
- Administración de usuarios (rol ADMIN)
- Gestión y visualización de cursos
- Manejo global de autenticación con Context

---

## 🔐 Sistema de Autenticación

El flujo funciona de la siguiente manera:

1. Usuario envía credenciales
2. Backend valida y genera JWT
3. Frontend almacena el token
4. El token se envía en cada request protegida
5. Rutas privadas verifican autenticación

---

## 🏗️ Arquitectura del Proyecto

- `components/` → Componentes reutilizables
- `pages/` → Vistas principales
- `context/` → Manejo global de autenticación
- `api/` → Capa de conexión con backend
- `types/` → Definiciones TypeScript

---

## ⚙️ Instalación

1. Clonar repositorio
2. Instalar dependencias:

```bash
npm install

Ejecutar servidor de desarrollo:

npm run dev

Aplicación disponible en:

http://localhost:5173

🔗 Configuración Backend

El frontend consume la API en:

http://localhost:8080

Si es necesario cambiar la URL, editar:

src/api/api.ts

Repositorio backend:
👉 https://github.com/jara96/api-seguridad-jwt

🎯 Objetivo del Proyecto

Proyecto desarrollado como práctica profesional para integrar un frontend moderno con una API segura implementando autenticación JWT y control de roles.

👨‍💻 Autor

Fernando Jara

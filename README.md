# 🏋️ ForceGim Backend

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Cron](https://img.shields.io/badge/Node--Cron-FFD700?style=for-the-badge&logo=clock&logoColor=black)

> **API RESTful** de alto rendimiento diseñada para la gestión integral del gimnasio **ForceGim**. Este sistema centraliza la administración de socios, el control de acceso, el seguimiento financiero y la automatización de membresías.

---

## 📖 Descripción

Este backend constituye el núcleo lógico de ForceGim, proporcionando una arquitectura robusta basada en **Node.js** y **Express**. Implementa un sistema de permisos avanzado (RBAC), integración flexible con **MongoDB** y una suite de herramientas de análisis para el dashboard administrativo.

### ✨ Características Principales

- 🔐 **Control de Acceso por Roles (RBAC):** Niveles de acceso diferenciados para `Superadmin`, `Admin` y `Moderador`.
- 📊 **Dashboard Analítico:** Generación de estadísticas en tiempo real sobre ingresos mensuales, distribución de planes y estado de socios.
- ⏰ **Automatización de Vencimientos:** Tarea programada (Cron Job) que verifica y desactiva automáticamente socios cuya membresía ha expirado.
- 🛡️ **Seguridad Avanzada:** Autenticación mediante **JWT**, protección de rutas sensibles y hashing de contraseñas con **Bcrypt**.
- 📅 **Gestión de Membresías:** Cálculos automáticos de fechas de vencimiento según el plan contratado (Mensual, Trimestral, Semestral, Anual).

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Node.js** | Entorno de ejecución de JavaScript plano de servidor. |
| **Express.js** | Framework web para la gestión de rutas y middlewares. |
| **MongoDB & Mongoose** | Base de datos NoSQL y ODM para el modelado de datos. |
| **JSON Web Token** | Estándar para la transmisión segura de información de identidad. |
| **Node-Cron** | Planificador de tareas para procesos automatizados. |
| **Bcrypt** | Algoritmo de hashing para la protección de credenciales. |

---

## 👥 Sistema de Roles y Permisos

| Rol | Alcance de Permisos |
| :--- | :--- |
| **Superadmin** | Control total. Gestión de otros administradores, eliminación de registros críticos y acceso completo a estadísticas. |
| **Admin** | Gestión operativa. Puede registrar socios, renovar membresías, editar datos y visualizar el dashboard. |
| **Moderador** | Soporte y Front-Desk. Puede renovar membresías, consultar datos de socios y ver estadísticas generales. |

---

## 🔌 Documentación de la API

### 🛡️ Administración y Autenticación
| Método | Endpoint | Descripción | Rol Mínimo |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Inicio de sesión y entrega de Token | Público |
| `POST` | `/api/admin/crear` | Registro de nuevos administradores | Superadmin |
| `GET` | `/api/admin/listar` | Listado de todo el personal administrativo | Superadmin |
| `PUT` | `/api/admin/editar/:id` | Actualización de datos de perfil | Superadmin |
| `DELETE` | `/api/admin/delete/:id` | Eliminación de administradores | Superadmin |

### 👥 Gestión de Socios
| Método | Endpoint | Descripción | Rol Mínimo |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios` | Listado general de socios | Admin |
| `POST` | `/api/usuarios` | Registro de nuevo socio | Admin |
| `GET` | `/api/usuarios/:id` | Detalle específico de un socio | Moderador |
| `PUT` | `/api/usuarios/:id` | Actualización de perfil y membresía | Admin |
| `DELETE` | `/api/usuarios/:id` | Baja definitiva del socio | Admin |
| `POST` | `/api/usuarios/renovar/:id`| Renovación de plan activo | Moderador |
| `POST` | `/api/usuarios/ingreso` | Registro de entrada (Check-in) | Público |

### 📈 Estadísticas (Dashboard)
| Método | Endpoint | Descripción | Rol Mínimo |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stats/dashboard` | Resumen de ingresos, planes y estados | Moderador |

---

## ⚙️ Instalación y Configuración

### 1. Requisitos Previos
- Node.js v18+
- MongoDB instalado o una URI de MongoDB Atlas.

### 2. Pasos de Instalación
```bash
# Clonar repositorio
git clone https://github.com/Maxii34/Force-Gym-Backend.git

# Instalar dependencias
npm install

# Configurar variables de entorno (.env)
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
SECRET_JWT=tu_secreto_para_tokens
```

### 3. Ejecución
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

---

## 📂 Estructura del Proyecto

```text
src/
├── 📂 controllers   # Lógica de negocio y manejo de peticiones
├── 📂 middlewares   # Seguridad, JWT y validaciones de esquema
├── 📂 models        # Definiciones de esquemas de Mongoose
├── 📂 routers       # Definición de rutas segmentadas
├── 📂 tasks         # Tareas automatizadas (Cron Jobs)
└── 📄 index.js      # Punto de entrada de la aplicación
```

---

## 👤 Autor

**[Maximiliano Exequiel Ordoñez]**  
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Maxii34)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tu-usuario)

---
Desarrollado con pasión y dedicación.
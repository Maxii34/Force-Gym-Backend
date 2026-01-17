# 🏋️ ForceGim Backend

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

> **API RESTful** robusta y escalable diseñada para la gestión integral del gimnasio **ForceGim**.

---

## 📖 Descripción

Este backend gestiona la lógica de negocio completa para el control de socios y administradores. Se centra en la seguridad de datos, la autenticación mediante tokens y la automatización de procesos clave, como el cálculo de vencimientos de membresías.

### ✨ Características Principales

- **Autenticación Segura:** Login de administradores con generación de **JWT**.
- **Gestión de Socios:** CRUD completo de usuarios del gimnasio.
- **Lógica de Negocio Automática:** Cálculo automático de la `fechaVencimiento` basado en el plan (Mensual, Trimestral, Semestral, Anual).
- **Seguridad:** Hashing de contraseñas con **Bcrypt** y protección de rutas privadas.
- **Validaciones:** Middleware robusto para garantizar la integridad de los datos de entrada.

---

## 🛠️ Stack Tecnológico

| Tecnología                                                                                          | Propósito               |
| :-------------------------------------------------------------------------------------------------- | :---------------------- |
| ![NodeJS](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)     | Entorno de ejecución    |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white)    | Framework de servidor   |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)    | Base de datos NoSQL     |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | Modelado de datos (ODM) |

---
## 👤 Autor

**[Maximiliano Exequiel Ordoñez]**

*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Maxii34)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tu-usuario)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tuemail@gmail.com)
---
## ⚙️ Instalación y Configuración

Sigue estos pasos para desplegar el proyecto localmente:

### 1. Clonar el repositorio

````bash
git clone [https://github.com/tu-usuario/forcegim-backend.git](https://github.com/tu-usuario/forcegim-backend.git)
cd forcegim-backend

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar entorno (.env)**
    Crea un archivo `.env` en la raíz con estas variables:
    ```env
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/forcegim_db
    SECRET_JWT=tu_clave_secreta_aqui
    ```

4.  **Iniciar servidor**
    ```bash
    npm run dev   # Modo desarrollo
    npm start     # Modo producción
    ```

---

## 🔌 Endpoints

### 🛡️ Admin & Auth

| Verbo | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin` | Crear primer Administrador | 🔐 **Privado** |
| `POST` | `/api/admin/login` | Iniciar Sesión (Recibir Token) | 🔐 **Privado** |
| `PUT` | `/api/admin/editar/:id` | Editar datos de Admin | 🔐 **Privado** |

### 👥 Gestión de Socios

| Verbo | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios` | Listar todos los socios | 🔐 **Privado** |
| `POST` | `/api/usuarios` | Registrar nuevo socio | 🔐 **Privado** |
| `GET` | `/api/usuarios/:id` | Ver detalle de socio | 🔐 **Privado** |
| `PUT` | `/api/usuarios/:id` | Actualizar membresía/datos | 🔐 **Privado** |
| `DELETE`| `/api/usuarios/:id` | Dar de baja socio | 🔐 **Privado** |


---

## 📂 Estructura del Proyecto

```bash
src/
├── 📂 controllers   # Lógica de negocio y respuestas
├── 📂 database      # Configuración de MongoDB
├── 📂 middlewares   # Validaciones y Auth (JWT)
├── 📂 models        # Esquemas de datos (Mongoose)
├── 📂 routes        # Definición de rutas de la API
└── 📄 index.js      # Entry point del servidor
````
---
Desarrollado en **Enero 2026**.
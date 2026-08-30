import { Router } from "express";
import {
  crearAdministrador,
  iniciarSesion,
  editarAdministrador,
  deleteuserRol,
  listarAdministradores,
  obtenerAdmin,
} from "../controllers/Admin.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { permitirRoles } from "../middlewares/permisos.js";
import {
  validarAdministrador,
  validarAdminLogin,
} from "../middlewares/validacionAdmin.js";

const router = Router();

// http://localhost:3000/api/admin/crear
router.post(
  "/crear",
  [validarToken, permitirRoles(["superadmin"]), validarAdministrador],
  crearAdministrador,
);

// http://localhost:3000/api/admin/listar
router.get(
  "/listar",
  [validarToken, permitirRoles(["superadmin"])],
  listarAdministradores,
);

// http://localhost:3000/api/admin/login
router.post("/login", validarAdminLogin, iniciarSesion);

// http://localhost:3000/api/admin/obtener/:id
router.get(
  "/obtener/:id",
  [validarToken, permitirRoles(["superadmin"])],
  obtenerAdmin,
);

// http://localhost:3000/api/admin/editar/:id
router.put(
  "/editar/:id",
  [validarToken, permitirRoles(["superadmin"]), validarAdministrador],
  editarAdministrador,
);

// http://localhost:3000/api/admin/delete/:id
router.delete(
  "/delete/:id",
  [validarToken, permitirRoles(["superadmin"])],
  deleteuserRol,
);

export default router;

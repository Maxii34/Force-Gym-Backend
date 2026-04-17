import { Router } from "express";
import { crearAdministrador, iniciarSesion, editarAdministrador, deleteuserRol, listarAdmin } from "../controllers/Admin.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
// 1. Debes importar el nuevo middleware que creamos
import { permitirRoles } from "../controllers/permisos.js";

const router = Router();

// http://localhost:3000/api/admin/crear
router.post("/crear", [validarToken, permitirRoles(["superadmin"])], crearAdministrador);

// http://localhost:3000/api/admin/listar
router.get("/listar", [validarToken, permitirRoles(["superadmin"])], listarAdmin);

// http://localhost:3000/api/admin/login
router.post("/login", iniciarSesion);

// http://localhost:3000/api/admin/editar/:id
router.put("/editar/:id", [validarToken, permitirRoles(["superadmin"])], editarAdministrador);

// http://localhost:3000/api/admin/delete/:id
router.delete("/delete/:id", [validarToken, permitirRoles(["superadmin"])], deleteuserRol);

export default router;
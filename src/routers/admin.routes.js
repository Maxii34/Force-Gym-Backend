import { Router } from "express";
import { crearAdministrador, iniciarSesion, editarAdministrador } from "../controllers/Admin.controlers.js";
import validarToken from "../middlewares/validarToken.js";

const router = Router();

//http://localhost:3000/api/admin/crear
router.post("/crear", crearAdministrador);

//http://localhost:3000/api/admin/login
router.post("/login", iniciarSesion);

//http://localhost:3000/api/admin/editar/:id
router.put("/editar/:id", validarToken, editarAdministrador);

export default router;
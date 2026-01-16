import { Router } from "express";
import { crearAdministrador, iniciarSesion, editarAdministrador } from "../controllers/Admin.controlers.js";

const router = Router();

//http://localhost:3000/api/admin
router.post("/crear", crearAdministrador);

//http://localhost:3000/api/admin/login
router.post("/login", iniciarSesion);

//http://localhost:3000/api/admin/editar/:id
router.put("/editar/:id", editarAdministrador);

export default router;
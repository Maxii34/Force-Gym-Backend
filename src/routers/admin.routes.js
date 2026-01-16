import { Router } from "express";
import { crearAdministrador, iniciarSesion } from "../controllers/Admin.controlers.js";

const router = Router();

//http://localhost:3000/api/admin
router.post("/crear", crearAdministrador);

//http://localhost:3000/api/admin/login
router.post("/login", iniciarSesion);

export default router;
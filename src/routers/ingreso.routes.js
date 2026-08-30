import { Router } from "express";
import {
  registrarIngreso,
  obtenerIngresosHoy,
} from "../controllers/ingreso.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { validarIngreso } from "../middlewares/validarIngreso.js";

const router = Router();

// http://localhost:3000/api/ingreso
router.post("/", [validarToken, validarIngreso], registrarIngreso);
router.get("/hoy", validarToken, obtenerIngresosHoy);

export default router;

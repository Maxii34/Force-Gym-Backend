import { Router } from "express";
import {
  registrarIngreso,
  obtenerIngresosHoy,
  obtenerDetalleIngresosHoy,
} from "../controllers/ingreso.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { validarIngreso } from "../middlewares/validarIngreso.js";

const router = Router();

// http://localhost:3000/api/ingreso
router.post("/", [validarIngreso], registrarIngreso);
router.get("/hoy", validarToken, obtenerIngresosHoy);
router.get("/hoy/detalle", validarToken, obtenerDetalleIngresosHoy);

export default router;

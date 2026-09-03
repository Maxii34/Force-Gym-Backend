import { Router } from "express";
import { validarToken } from "../middlewares/validarToken.js";
import { permitirRoles } from "../middlewares/permisos.js";
import resultadoValidacion from "../middlewares/resultadoValidacion.js";
import {
  renovarUsuario,
  obtenerRenovacionesRecientes,
} from "../controllers/renovacion.controlers.js";
import { validarRenovacion } from "../middlewares/validacionRenovacion.js";

const router = Router();

router.get("/recientes", [validarToken, permitirRoles(["admin", "superadmin", "moderador"])], obtenerRenovacionesRecientes);

//http://localhost:3000/api/renovar
router
  .route("/")
  .post(
    [
      validarToken,
      validarRenovacion,
      permitirRoles(["admin", "superadmin", "moderador"]),
    ],
    renovarUsuario,
  );

export default router;

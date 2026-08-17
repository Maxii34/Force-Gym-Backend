import { Router } from "express";
import { validarToken } from "../middlewares/validarToken";
import { permitirRoles } from "../controllers/permisos";
import resultadoValidacion from "../middlewares/resultadoValidacion";
import { renovarUsuario } from "../controllers/renovacion.controlers.js";
import { validarRenovacion } from "../middlewares/validacionRenovacion";

const router = Router();

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

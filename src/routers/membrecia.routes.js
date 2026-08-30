import { Router } from "express";
import {
  obtenerMembrecias,
  obtenerMembrecia,
  crearMembresia,
  actualizarMembresia,
  eliminarMembresia,
  obtenerMembreciasActivas,
  obtenerEstadisticasMembresias,
} from "../controllers/membrecia.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { validarMembresia } from "../middlewares/validacionMembrecia.js";

const router = Router();

router
  .route("/activas")
  .get([validarToken, validarMembresia], obtenerMembreciasActivas);
router.route("/estadisticas").get(validarToken, obtenerEstadisticasMembresias);
router
  .route("/")
  .get(validarToken, obtenerMembrecias)
  .post([validarToken, validarMembresia], crearMembresia);
router
  .route("/:id")
  .get(validarToken, obtenerMembrecia)
  .put([validarToken, validarMembresia], actualizarMembresia)
  .delete(validarToken, eliminarMembresia);

export default router;

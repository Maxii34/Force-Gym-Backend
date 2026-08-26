import { Router } from "express";
import {
  obtenerMembrecias,
  obtenerMembrecia,
  crearMembresia,
  actualizarMembresia,
  eliminarMembresia,
  obtenerMembreciasActivas,
  obtenerEstadisticasMembresias
} from "../controllers/membrecia.controlers.js";

const router = Router();

router.route("/activas").get(obtenerMembreciasActivas);
router.route("/estadisticas").get(obtenerEstadisticasMembresias);
router.route("/").get(obtenerMembrecias).post(crearMembresia);
router
  .route("/:id")
  .get(obtenerMembrecia)
  .put(actualizarMembresia)
  .delete(eliminarMembresia);

export default router;

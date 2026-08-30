import { Router } from "express";
import { obtenerDashboardGeneral } from "../controllers/stats.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { permitirRoles } from "../middlewares/permisos.js";

const router = Router();

// Endpoint central de estadísticas
router.get("/dashboard", [validarToken, permitirRoles(["superadmin", "admin", "moderador"])], obtenerDashboardGeneral);

export default router;
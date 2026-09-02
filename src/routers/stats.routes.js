import { Router } from "express";
import { obtenerDashboardGeneral } from "../controllers/stats.controlers.js";

const router = Router();

// Endpoint central de estadísticas
router.get("/dashboard", obtenerDashboardGeneral);

export default router;
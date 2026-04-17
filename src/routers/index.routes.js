import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js"
import adminRoutes from "./admin.routes.js";
import statsRoutes from "./stats.routes.js";


const router = Router()

router.use("/usuarios", usuariosRoutes)

router.use("/admin", adminRoutes);

router.use("/stats", statsRoutes);

export default router;
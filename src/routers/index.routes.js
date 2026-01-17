import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js"
import adminRoutes from "./admin.routes.js";


const router = Router()

router.use("/usuarios", usuariosRoutes)

router.use("/admin", adminRoutes);

export default router;
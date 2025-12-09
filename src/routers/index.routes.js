import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js"


const router = Router()

router.use("/usuarios", usuariosRoutes)

export default router;
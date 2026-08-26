import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js";
import adminRoutes from "./admin.routes.js";
import statsRoutes from "./stats.routes.js";
import renovarRoutes from "./renovacion.routes.js";
import menbreciaRoutes from "./membrecia.routes.js";

const router = Router();

router.use("/usuarios", usuariosRoutes);

router.use("/membrecia", menbreciaRoutes);

router.use("/renovar", renovarRoutes);

router.use("/admin", adminRoutes);

router.use("/stats", statsRoutes);

export default router;

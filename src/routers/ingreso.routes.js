import { Router } from "express";
import { registrarIngreso } from "../controllers/ingreso.controlers.js";

const router = Router();

router.post("/", registrarIngreso);

export default router;
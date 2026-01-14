import { Router } from "express";
import { ingresoUsuarios } from "../controllers/usuarioDatos.controlers.js";


const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(ingresoUsuarios);


export default router;
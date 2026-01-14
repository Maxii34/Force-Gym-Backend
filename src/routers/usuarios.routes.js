import { Router } from "express";
import { ingresoUsuarios, crearUsuarios} from "../controllers/usuarioDatos.controlers.js";


const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(crearUsuarios);
router.route("/ingreso").post(ingresoUsuarios);


export default router;
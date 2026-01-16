import { Router } from "express";
import { ingresoUsuarios, crearUsuarios, listarUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuarioDatos.controlers.js";
import { renovarUsuario } from "../controllers/renovacion.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";


const router = Router();

//http://localhost:3000/api/usuarios
router.route("/").post(validarToken, crearUsuarios).get(listarUsuarios);

//http://localhost:3000/api/usuarios/ingreso
router.route("/ingreso").post(ingresoUsuarios);

//http://localhost:3000/api/usuarios/:id
router.route("/:id").get(validarToken, obtenerUsuario).put(validarToken, actualizarUsuario).delete(validarToken, eliminarUsuario);

//http://localhost:3000/api/usuarios/renovar/:id
router.route("/renovar/:id").post(validarToken, renovarUsuario);

export default router;
import { Router } from "express";
import {
  ingresoUsuarios,
  crearUsuarios,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuarioDatos.controlers.js";
import { renovarUsuario } from "../controllers/renovacion.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { validarUsuario } from "../middlewares/validacionUsuarios.js";
import { validarRenovacion } from "../middlewares/validacionRenovacion.js";


const router = Router();

//http://localhost:3000/api/usuarios
router
  .route("/")
  .post([validarToken, validarUsuario], crearUsuarios)
  .get(validarToken, listarUsuarios);

//http://localhost:3000/api/usuarios/ingreso
router.route("/ingreso").post(ingresoUsuarios);

//http://localhost:3000/api/usuarios/:id
router
  .route("/:id")
  .get(validarToken, obtenerUsuario)
  .put([validarToken, validarUsuario], actualizarUsuario)
  .delete(validarToken, eliminarUsuario);

//http://localhost:3000/api/usuarios/renovar/:id
router
  .route("/renovar/:id")
  .post([validarToken, validarRenovacion], renovarUsuario);

export default router;

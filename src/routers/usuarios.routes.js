import { Router } from "express";
import {
  ingresoUsuarios,
  crearUsuarios,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  verificarVencimientos,
} from "../controllers/usuarioDatos.controlers.js";
import { validarToken } from "../middlewares/validarToken.js";
import { validarUsuario } from "../middlewares/validacionUsuarios.js";
import { permitirRoles } from "../middlewares/permisos.js";

const router = Router();

//http://localhost:3000/api/usuarios
router
  .route("/")
  .post(
    [validarToken, validarUsuario, permitirRoles(["admin", "superadmin"])],
    crearUsuarios,
  )
  .get(validarToken, listarUsuarios);

//localhost:3000/api/usuarios/verificar-vencimientos
router.post("/verificar-vencimientos", verificarVencimientos);

//http://localhost:3000/api/usuarios/ingreso
//Ruta publica de usuarios
router.route("/ingreso").post(ingresoUsuarios);

//http://localhost:3000/api/usuarios/:id
router
  .route("/:id")
  .get(
    [validarToken, permitirRoles(["admin", "superadmin", "moderador"])],
    obtenerUsuario,
  )
  .put(
    [validarToken, validarUsuario, permitirRoles(["admin", "superadmin"])],
    actualizarUsuario,
  )
  .delete(
    [validarToken, permitirRoles(["admin", "superadmin"])],
    eliminarUsuario,
  );

export default router;

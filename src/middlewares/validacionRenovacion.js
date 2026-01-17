import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Renovacion from "../models/renovarUsuario.js";
import UsuarioData from "../models/usuarioDatos.js";

export const validarRenovacion = [
  body("dni")
    .trim()
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isNumeric()
    .withMessage("El DNI solo debe contener números")
    .isLength({ min: 7, max: 9 })
    .withMessage("El DNI debe tener entre 7 y 9 dígitos")
    .custom(async (value) => {
      // 1. Validar que el cliente EXISTA en la base de datos de usuarios
      const usuario = await UsuarioData.findOne({ dni: value });
      if (!usuario) {
        throw new Error("El DNI no pertenece a ningún socio registrado");
      }
    }),
  body("pago")
    .notEmpty()
    .withMessage("El monto del pago es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El pago debe ser un número positivo"),
  body("tipoMembresia")
    .notEmpty()
    .withMessage("El tipo de membresía es obligatorio")
    .isIn(["mensual", "trimestral", "semestral", "anual"])
    .withMessage("El tipo de membresía no es válido"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

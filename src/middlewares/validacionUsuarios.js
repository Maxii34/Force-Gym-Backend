import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import UsuarioData from "../models/usuarioDatos.js";


export const validarUsuario = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("telefono")
    .trim()
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\+?[0-9\s-]{7,15}$/)
    .withMessage("El teléfono no tiene un formato válido (ej: 381-1234567)"),

  body("dni")
    .trim()
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isNumeric()
    .withMessage("El DNI solo debe contener números")
    .isLength({ min: 7, max: 9 })
    .withMessage("El DNI debe tener entre 7 y 9 dígitos")
    .custom(async (value, { req }) => { 
        // Buscamos si existe alguien con ese DNI
        const usuarioExistente = await UsuarioData.findOne({ dni: value });

        if (usuarioExistente) {
            if (usuarioExistente._id.toString() !== req.params.id) {
                throw new Error("El DNI ya se encuentra registrado en el sistema");
            }
        }
        return true;
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
    .withMessage(
      "El tipo de membresía no es válido (mensual, trimestral, semestral, anual)"
    ),


  body("estado")
    .optional()
    .isIn(["activo", "inactivo", "suspendido"])
    .withMessage("Estado inválido"),

  (req, res, next) => resultadoValidacion(req, res, next), 
];

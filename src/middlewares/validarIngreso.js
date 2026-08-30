import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarIngreso = [
  body("dni")
    .trim()
    .isLength({ min: 8, max: 8 })
    .withMessage("El DNI debe tener 8 caracteres")
    .isNumeric()
    .withMessage("El DNI debe ser un número"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

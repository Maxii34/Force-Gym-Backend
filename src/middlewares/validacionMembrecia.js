import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarMembresia = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  body("descripcion")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres"),
  body("precio")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("duracion")
    .isInt({ gt: 0 })
    .withMessage("La duración debe ser un número positivo"),
  resultadoValidacion,
];
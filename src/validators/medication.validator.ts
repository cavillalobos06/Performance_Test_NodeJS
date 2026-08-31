/**
 * Reglas de validacion para medicamentos.
 */
import { body } from 'express-validator';

export const crearMedicamentoValidator = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripcion es obligatoria'),
];

export const actualizarMedicamentoValidator = [
  body('nombre')
    .optional()
    .notEmpty()
    .withMessage('El nombre no puede estar vacio'),
  body('descripcion')
    .optional()
    .notEmpty()
    .withMessage('La descripcion no puede estar vacia'),
];

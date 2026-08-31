/**
 * Reglas de validacion para almacenes.
 */
import { body } from 'express-validator';

export const crearAlmacenValidator = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('ubicacion').notEmpty().withMessage('La ubicacion es obligatoria'),
];

export const actualizarAlmacenValidator = [
  body('nombre')
    .optional()
    .notEmpty()
    .withMessage('El nombre no puede estar vacio'),
  body('ubicacion')
    .optional()
    .notEmpty()
    .withMessage('La ubicacion no puede estar vacia'),
];

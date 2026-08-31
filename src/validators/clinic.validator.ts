/**
 * Reglas de validacion para clinicas.
 */
import { body } from 'express-validator';

export const crearClinicaValidator = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('nit').notEmpty().withMessage('El NIT es obligatorio'),
  body('responsable').notEmpty().withMessage('El responsable es obligatorio'),
  body('telefono').notEmpty().withMessage('El telefono es obligatorio'),
  body('direccion').notEmpty().withMessage('La direccion es obligatoria'),
];

export const actualizarClinicaValidator = [
  body('nombre')
    .optional()
    .notEmpty()
    .withMessage('El nombre no puede estar vacio'),
  body('nit').optional().notEmpty().withMessage('El NIT no puede estar vacio'),
  body('responsable')
    .optional()
    .notEmpty()
    .withMessage('El responsable no puede estar vacio'),
  body('telefono')
    .optional()
    .notEmpty()
    .withMessage('El telefono no puede estar vacio'),
  body('direccion')
    .optional()
    .notEmpty()
    .withMessage('La direccion no puede estar vacia'),
];

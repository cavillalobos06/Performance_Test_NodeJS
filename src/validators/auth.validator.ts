/**
 * Reglas de validacion para registro y login.
 */
import { body } from 'express-validator';

export const registroValidator = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('El email no es valido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener minimo 6 caracteres'),
  body('role')
    .isIn(['ADMINISTRADOR', 'GESTOR_SOLICITUDES'])
    .withMessage('El rol debe ser ADMINISTRADOR o GESTOR_SOLICITUDES'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('El email no es valido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

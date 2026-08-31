/**
 * Reglas de validacion para solicitudes.
 * La cantidad debe ser mayor que cero (regla explicita del enunciado).
 */
import { body } from 'express-validator';

export const crearSolicitudValidator = [
  body('clinicaId')
    .isInt()
    .withMessage('clinicaId es obligatorio y debe ser numerico'),
  body('medicamentoId')
    .isInt()
    .withMessage('medicamentoId es obligatorio y debe ser numerico'),
  body('almacenId')
    .isInt()
    .withMessage('almacenId es obligatorio y debe ser numerico'),
  body('cantidadSolicitada')
    .isInt({ gt: 0 })
    .withMessage('cantidadSolicitada debe ser un numero mayor que cero'),
];

export const actualizarEstadoSolicitudValidator = [
  body('estado')
    .isIn(['PENDIENTE', 'APROBADA', 'RECHAZADA', 'ENTREGADA'])
    .withMessage(
      'El estado debe ser PENDIENTE, APROBADA, RECHAZADA o ENTREGADA',
    ),
];

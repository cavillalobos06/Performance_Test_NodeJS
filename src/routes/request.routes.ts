import { Router } from 'express';
import * as requestController from '../controllers/request.controller.js';
import {
  crearSolicitudValidator,
  actualizarEstadoSolicitudValidator,
} from '../validators/request.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         clinicaId: { type: integer, example: 1 }
 *         medicamentoId: { type: integer, example: 1 }
 *         almacenId: { type: integer, example: 1 }
 *         cantidadSolicitada: { type: integer, example: 50 }
 */

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Crea una solicitud de abastecimiento (ADMINISTRATOR o GESTOR_SOLICITUDES)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solicitud'
 *     responses:
 *       201: { description: Solicitud creada }
 *       400: { description: Inventario insuficiente }
 *       404: { description: Clinica, medicamento o almacen no existe }
 *   get:
 *     summary: Lista todas las solicitudes (solo ADMINISTRATOR)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de solicitudes }
 */
router.post(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR', 'REQUEST_MANAGER'),
  crearSolicitudValidator,
  validate,
  requestController.crear,
);
router.get(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  requestController.listarTodas,
);

/**
 * @swagger
 * /requests/actives:
 *   get:
 *     summary: Lista las solicitudes activas (cualquier usuario autenticado)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de solicitudes activas }
 */
router.get('/activas', authMiddleware, requestController.listarActivas);

/**
 * @swagger
 * /requests/history/{clinicId}:
 *   get:
 *     summary: Consulta el historial de solicitudes de una clinica (cualquier usuario autenticado)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clinicaId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Historial de solicitudes de la clinica }
 */
router.get(
  '/history/:clinicId',
  authMiddleware,
  requestController.historialPorClinica,
);

/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Obtiene una solicitud por id (solo ADMINISTRATOR)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Solicitud encontrada }
 *   delete:
 *     summary: Elimina logicamente una solicitud (solo ADMINISTRATOR)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Solicitud eliminada }
 */
router.get(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  requestController.obtener,
);
router.delete(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  requestController.eliminar,
);

/**
 * @swagger
 * /requests/{id}/status:
 *   put:
 *     summary: Actualiza el estado de una solicitud (ADMINISTRATOR o GESTOR_SOLICITUDES)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado: { type: string, enum: [PENDIENTE, APROBADA, RECHAZADA, ENTREGADA], example: "APROBADA" }
 *     responses:
 *       200: { description: Estado actualizado }
 *       400: { description: Transicion de estado no permitida }
 */
router.put(
  '/:id/status',
  authMiddleware,
  authorize('ADMINISTRATOR', 'REQUEST_MANAGER'),
  actualizarEstadoSolicitudValidator,
  validate,
  requestController.actualizarEstado,
);

export default router;

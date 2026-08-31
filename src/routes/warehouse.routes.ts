import { Router } from 'express';
import * as warehouseController from '../controllers/warehouse.controller.js';
import {
  crearAlmacenValidator,
  actualizarAlmacenValidator,
} from '../validators/warehouse.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Almacen:
 *       type: object
 *       properties:
 *         nombre: { type: string, example: "Almacen Central" }
 *         ubicacion: { type: string, example: "Bogota, Zona Industrial" }
 */

/**
 * @swagger
 * /almacenes:
 *   post:
 *     summary: Crea un almacen (solo ADMINISTRADOR)
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Almacen'
 *     responses:
 *       201: { description: Almacen creado }
 *   get:
 *     summary: Lista todos los almacenes activos (solo ADMINISTRADOR)
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de almacenes }
 */
router.post(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  crearAlmacenValidator,
  validate,
  warehouseController.crear,
);
router.get(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  warehouseController.listar,
);

/**
 * @swagger
 * /almacenes/{id}:
 *   get:
 *     summary: Obtiene un almacen por id (solo ADMINISTRADOR)
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacen encontrado }
 *   put:
 *     summary: Actualiza un almacen (solo ADMINISTRADOR)
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Almacen'
 *     responses:
 *       200: { description: Almacen actualizado }
 *   delete:
 *     summary: Elimina logicamente un almacen (solo ADMINISTRADOR)
 *     tags: [Almacenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Almacen eliminado }
 */
router.get(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  warehouseController.obtener,
);
router.put(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  actualizarAlmacenValidator,
  validate,
  warehouseController.actualizar,
);
router.delete(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  warehouseController.eliminar,
);

export default router;

import { Router } from 'express';
import * as medicationController from '../controllers/medication.controller.js';
import {
  crearMedicamentoValidator,
  actualizarMedicamentoValidator,
} from '../validators/medication.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Medicamento:
 *       type: object
 *       properties:
 *         nombre: { type: string, example: "Acetaminofen 500mg" }
 *         descripcion: { type: string, example: "Analgesico y antipiretico" }
 */

/**
 * @swagger
 * /medicamentos:
 *   post:
 *     summary: Crea un medicamento (solo ADMINISTRATOR)
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicamento'
 *     responses:
 *       201: { description: Medicamento creado }
 *   get:
 *     summary: Lista todos los medicamentos activos (solo ADMINISTRATOR)
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de medicamentos }
 */
router.post(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  crearMedicamentoValidator,
  validate,
  medicationController.crear,
);
router.get(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  medicationController.listar,
);

/**
 * @swagger
 * /medicamentos/{id}:
 *   get:
 *     summary: Obtiene un medicamento por id (solo ADMINISTRATOR)
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento encontrado }
 *   put:
 *     summary: Actualiza un medicamento (solo ADMINISTRATOR)
 *     tags: [Medicamentos]
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
 *             $ref: '#/components/schemas/Medicamento'
 *     responses:
 *       200: { description: Medicamento actualizado }
 *   delete:
 *     summary: Elimina logicamente un medicamento (solo ADMINISTRATOR)
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Medicamento eliminado }
 */
router.get(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  medicationController.obtener,
);
router.put(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  actualizarMedicamentoValidator,
  validate,
  medicationController.actualizar,
);
router.delete(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  medicationController.eliminar,
);

export default router;

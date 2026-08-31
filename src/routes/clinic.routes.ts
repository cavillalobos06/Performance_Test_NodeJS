import { Router } from 'express';
import * as clinicController from '../controllers/clinic.controller.js';
import {
  crearClinicaValidator,
  actualizarClinicaValidator,
} from '../validators/clinic.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Clinic:
 *       type: object
 *       properties:
 *         nombre: { type: string, example: "Clinica San Rafael" }
 *         nit: { type: string, example: "900123456-1" }
 *         responsable: { type: string, example: "Dr. Carlos Ramirez" }
 *         telefono: { type: string, example: "3001234567" }
 *         direccion: { type: string, example: "Calle 45 # 12-30" }
 */

/**
 * @swagger
 * /clinics:
 *   post:
 *     summary: Crea una clinica (solo ADMINISTRADOR)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clinica'
 *     responses:
 *       201: { description: Clinica creada }
 *       409: { description: NIT duplicado }
 *   get:
 *     summary: Lista todas las clinicas activas (solo ADMINISTRADOR)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de clinicas }
 */
router.post(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  crearClinicaValidator,
  validate,
  clinicController.crear,
);
router.get(
  '/',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  clinicController.listar,
);

/**
 * @swagger
 * /clinics/{id}:
 *   get:
 *     summary: Obtiene una clinica por id (solo ADMINISTRADOR)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clinica encontrada }
 *       404: { description: Clinica no encontrada }
 *   put:
 *     summary: Actualiza una clinica (solo ADMINISTRADOR)
 *     tags: [Clinics]
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
 *             $ref: '#/components/schemas/Clinica'
 *     responses:
 *       200: { description: Clinica actualizada }
 *   delete:
 *     summary: Elimina logicamente una clinica (solo ADMINISTRADOR)
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Clinica eliminada }
 */
router.get(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  clinicController.obtener,
);
router.put(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  actualizarClinicaValidator,
  validate,
  clinicController.actualizar,
);
router.delete(
  '/:id',
  authMiddleware,
  authorize('ADMINISTRATOR'),
  clinicController.eliminar,
);

export default router;

import { Router } from 'express';
import upload from '../config/multer.js';
import * as seedController from '../controllers/seed.controller.js';

const router = Router();

/**
 * @swagger
 * /seed/upload:
 *   post:
 *     summary: Puebla la base de datos a partir de un archivo JSON (actua como Seeder)
 *     description: >
 *       Recibe un archivo JSON (multipart/form-data) con las claves opcionales
 *       usuarios, clinicas, almacenes, medicamentos e inventario, y crea los
 *       registros correspondientes si no existen todavia.
 *     tags: [Seeders]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201: { description: Base de datos poblada correctamente }
 *       400: { description: Archivo faltante o JSON invalido }
 */
router.post('/upload', upload.single('archivo'), seedController.cargarSeed);

export default router;

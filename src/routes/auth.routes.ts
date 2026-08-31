import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import {
  registroValidator,
  loginValidator,
} from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un usuario (Administrador o Gestor). Endpoint sin restriccion de JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Ana Torres" }
 *               email: { type: string, example: "ana@riwimedicare.com" }
 *               password: { type: string, example: "clave123" }
 *               role: { type: string, enum: [ADMINISTRADOR, GESTOR_SOLICITUDES], example: "REQUEST_MANAGER" }
 *     responses:
 *       201: { description: Usuario registrado }
 *       409: { description: El email ya esta registrado }
 */
router.post('/register', registroValidator, validate, authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesion y devuelve un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "ana@riwimedicare.com" }
 *               password: { type: string, example: "clave123" }
 *     responses:
 *       200: { description: Login exitoso, devuelve token }
 *       401: { description: Credenciales incorrectas }
 */
router.post('/login', loginValidator, validate, authController.login);

export default router;

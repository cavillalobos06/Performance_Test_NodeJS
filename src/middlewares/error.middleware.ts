/**
 * Middleware central de manejo de errores.
 * Todo error lanzado en cualquier capa (via next(error)) termina aqui.
 */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ mensaje: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
}

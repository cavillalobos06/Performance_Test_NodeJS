/**
 * Middleware de validacion.
 * Se ejecuta despues de las reglas de express-validator en /validators.
 * Si alguna regla fallo, corta la peticion con un error 400.
 */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

export function validate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mensaje = errors
      .array()
      .map((e) => e.msg)
      .join(', ');
    return next(new ApiError(400, mensaje));
  }
  next();
}

/**
 * Middleware de autorizacion por rol.
 * Uso: authorize('ADMINISTRADOR')
 * Debe usarse siempre despues de authenticate.
 */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';
import { UserRole } from '../models/user.model.js';

/**
 * @param allowedRoles - roles que pueden acceder al endpoint
 * @throws ApiError 403 si el usuario autenticado no tiene el rol requerido
 */
export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, 'No tienes permisos para realizar esta accion'),
      );
    }
    next();
  };
}

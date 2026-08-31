/**
 * Extiende el tipo Request de Express para poder guardar los datos
 * del usuario autenticado (req.user) despues de validar el JWT.
 */
import { UserRole } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: UserRole;
      };
    }
  }
}

export {};

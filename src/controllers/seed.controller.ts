/**
 * Controlador del endpoint de Seeders via Multer.
 */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';
import seedService from '../services/seed.service.js';

export async function cargarSeed(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.file) {
      throw new ApiError(
        400,
        'Debes adjuntar un archivo JSON en el campo "archivo"',
      );
    }
    const resumen = await seedService.poblarBaseDeDatos(req.file.buffer);
    res
      .status(201)
      .json({ mensaje: 'Base de datos poblada correctamente', resumen });
  } catch (error) {
    next(error);
  }
}

import { Request, Response, NextFunction } from 'express';
import medicationService from '../services/medication.service.js';

export async function crear(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.status(201).json(await medicationService.crearMedicamento(req.body));
  } catch (error) {
    next(error);
  }
}

export async function listar(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(await medicationService.listarMedicamentos());
  } catch (error) {
    next(error);
  }
}

export async function obtener(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(
      await medicationService.obtenerMedicamento(Number(req.params.id)),
    );
  } catch (error) {
    next(error);
  }
}

export async function actualizar(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(
      await medicationService.actualizarMedicamento(
        Number(req.params.id),
        req.body,
      ),
    );
  } catch (error) {
    next(error);
  }
}

export async function eliminar(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await medicationService.eliminarMedicamento(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

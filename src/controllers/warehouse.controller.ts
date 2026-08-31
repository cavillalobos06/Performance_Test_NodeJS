import { Request, Response, NextFunction } from 'express';
import warehouseService from '../services/warehouse.service.js';

export async function crear(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.status(201).json(await warehouseService.crearAlmacen(req.body));
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
    res.json(await warehouseService.listarAlmacenes());
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
    res.json(await warehouseService.obtenerAlmacen(Number(req.params.id)));
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
      await warehouseService.actualizarAlmacen(Number(req.params.id), req.body),
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
    await warehouseService.eliminarAlmacen(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

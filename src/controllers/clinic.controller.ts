import { Request, Response, NextFunction } from 'express';
import clinicaService from '../services/clinic.service.js';

export async function crear(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.status(201).json(await clinicaService.crearClinica(req.body));
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
    res.json(await clinicaService.listClinics());
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
    res.json(await clinicaService.getClinic(Number(req.params.id)));
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
      await clinicaService.updateClinic(Number(req.params.id), req.body),
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
    await clinicaService.deleteClinic(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

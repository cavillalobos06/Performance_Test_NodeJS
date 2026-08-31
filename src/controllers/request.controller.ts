/**
 * Controlador de Solicitud.
 * gestorId sale siempre de req.user.id (el token), nunca del body.
 */
import { Request, Response, NextFunction } from 'express';
import requestService from '../services/request.service.js';

export async function crear(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const gestorId = req.user!.id;
    res
      .status(201)
      .json(await requestService.crearSolicitud(gestorId, req.body));
  } catch (error) {
    next(error);
  }
}

export async function listarActivas(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(await requestService.listarActivas());
  } catch (error) {
    next(error);
  }
}

export async function listarTodas(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(await requestService.listarTodas());
  } catch (error) {
    next(error);
  }
}

export async function historialPorClinica(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(
      await requestService.historialPorClinica(Number(req.params.clinicaId)),
    );
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
    res.json(await requestService.obtenerSolicitud(Number(req.params.id)));
  } catch (error) {
    next(error);
  }
}

export async function actualizarEstado(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.json(
      await requestService.actualizarEstado(
        Number(req.params.id),
        req.body.estado,
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
    await requestService.eliminarSolicitud(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

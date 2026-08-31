import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service.js';

export async function registrar(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const usuario = await authService.register(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login(email, password);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

/**
 * Logica de negocio para registro y login.
 * Segun el enunciado, el registro NO valida rol por JWT (endpoint abierto),
 * el propio usuario elige con que rol se registra.
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import userRepository from '../repositories/user.repository.js';
import { UserRole } from '../models/user.model.js';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * Registra un nuevo usuario con la contrasena hasheada.
 * @throws ApiError 409 si el email ya esta registrado
 */
async function register(data: RegisterInput) {
  const existente = await userRepository.findByEmail(data.email);
  if (existente) {
    throw new ApiError(409, 'El email ya esta registrado');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await userRepository.create({
    ...data,
    password: passwordHash,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

/**
 * Valida credenciales y devuelve un JWT si son correctas.
 * @throws ApiError 401 si el email no existe o la contrasena no coincide
 */
async function login(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Credenciales incorrectas');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new ApiError(401, 'Credenciales incorrectas');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' } as jwt.SignOptions,
  );

  return {
    token,
    usuario: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export default { register, login };

/**
 * Repositorio de User: unico lugar que consulta el modelo directamente.
 */
import User, { UserRole } from '../models/user.model.js';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const create = (data: CreateUserData) => User.create(data);
const findByEmail = (email: string) => User.findOne({ where: { email } });

export default { create, findByEmail };

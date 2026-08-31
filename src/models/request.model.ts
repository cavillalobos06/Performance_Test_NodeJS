import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export type RequestStatus =
  | 'PENDIENTE'
  | 'APROBADA'
  | 'RECHAZADA'
  | 'ENTREGADA';

interface RequestAttributes {
  id: number;
  clinicaId: number;
  medicamentoId: number;
  almacenId: number;
  gestorId: number;
  cantidadSolicitada: number;
  estado: RequestStatus;
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type RequestCreationAttributes = Optional<
  RequestAttributes,
  'id' | 'estado' | 'activo' | 'createdAt' | 'updatedAt'
>;

class Request
  extends Model<RequestAttributes, RequestCreationAttributes>
  implements RequestAttributes
{
  declare public id: number;
  declare public clinicaId: number;
  declare public medicamentoId: number;
  declare public almacenId: number;
  declare public gestorId: number;
  declare public cantidadSolicitada: number;
  declare public estado: RequestStatus;
  declare public activo: boolean;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

Request.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clinicaId: { type: DataTypes.INTEGER, allowNull: false },
    medicamentoId: { type: DataTypes.INTEGER, allowNull: false },
    almacenId: { type: DataTypes.INTEGER, allowNull: false },
    gestorId: { type: DataTypes.INTEGER, allowNull: false },
    cantidadSolicitada: { type: DataTypes.INTEGER, allowNull: false },
    estado: {
      type: DataTypes.ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA', 'ENTREGADA'),
      allowNull: false,
      defaultValue: 'PENDIENTE',
    },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: 'requests', timestamps: true },
);

export default Request;

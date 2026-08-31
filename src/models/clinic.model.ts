import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface ClinicAttributes {
  id: number;
  nombre: string;
  nit: string;
  responsable: string;
  telefono: string;
  direccion: string;
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type ClinicCreationAttributes = Optional<
  ClinicAttributes,
  'id' | 'activo' | 'createdAt' | 'updatedAt'
>;

class Clinic
  extends Model<ClinicAttributes, ClinicCreationAttributes>
  implements ClinicAttributes
{
  declare public id: number;
  declare public nombre: string;
  declare public nit: string;
  declare public responsable: string;
  declare public telefono: string;
  declare public direccion: string;
  declare public activo: boolean;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

Clinic.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    nit: { type: DataTypes.STRING, allowNull: false, unique: true },
    responsable: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: 'clinics', timestamps: true },
);

export default Clinic;

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface MedicationAttributes {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type MedicationCreationAttributes = Optional<
  MedicationAttributes,
  'id' | 'activo' | 'createdAt' | 'updatedAt'
>;

class Medication
  extends Model<MedicationAttributes, MedicationCreationAttributes>
  implements MedicationAttributes
{
  declare public id: number;
  declare public nombre: string;
  declare public descripcion: string;
  declare public activo: boolean;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

Medication.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: 'medications', timestamps: true },
);

export default Medication;

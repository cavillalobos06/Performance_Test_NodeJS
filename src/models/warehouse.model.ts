import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface WarehouseAttributes {
  id: number;
  nombre: string;
  ubicacion: string;
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type WarehouseCreationAttributes = Optional<
  WarehouseAttributes,
  'id' | 'activo' | 'createdAt' | 'updatedAt'
>;

class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  declare public id: number;
  declare public nombre: string;
  declare public ubicacion: string;
  declare public activo: boolean;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

Warehouse.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    ubicacion: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: 'warehouses', timestamps: true },
);

export default Warehouse;

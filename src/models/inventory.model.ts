import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface InventoryAttributes {
  id: number;
  almacenId: number;
  medicamentoId: number;
  cantidadDisponible: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type InventoryCreationAttributes = Optional<
  InventoryAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class Inventory
  extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes
{
  declare public id: number;
  declare public almacenId: number;
  declare public medicamentoId: number;
  declare public cantidadDisponible: number;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

Inventory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    almacenId: { type: DataTypes.INTEGER, allowNull: false },
    medicamentoId: { type: DataTypes.INTEGER, allowNull: false },
    cantidadDisponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize, tableName: 'inventory', timestamps: true },
);

export default Inventory;

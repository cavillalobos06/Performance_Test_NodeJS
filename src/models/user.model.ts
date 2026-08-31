import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export type UserRole = 'ADMINISTRATOR' | 'REQUEST_MANAGER';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare public id: number;
  declare public name: string;
  declare public email: string;
  declare public password: string;
  declare public role: UserRole;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('ADMIN', 'REQUEST_MANAGER'),
      allowNull: false
    },
  },
  { sequelize, tableName: 'users', timestamps: true },
);

export default User;

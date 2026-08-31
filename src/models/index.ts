import { sequelize } from '../config/database.js';
import User from './user.model.js';
import Clinic from './clinic.model.js';
import Warehouse from './warehouse.model.js';
import Medication from './medication.model.js';
import Inventory from './inventory.model.js';
import Request from './request.model.js';

// Un Almacen tiene muchos registros de Inventario, uno por cada medicamento que almacena
Warehouse.hasMany(Inventory, { foreignKey: 'warehouseId', as: 'inventories' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

// Un Medicamento puede estar en el inventario de muchos almacenes
Medication.hasMany(Inventory, {
  foreignKey: 'medicationId',
  as: 'inventories',
});
Inventory.belongsTo(Medication, {
  foreignKey: 'medicationId',
  as: 'medication',
});

// Una Clinica puede tener muchas Solicitudes
Clinic.hasMany(Request, { foreignKey: 'clinicId', as: 'Requests' });
Request.belongsTo(Clinic, { foreignKey: 'clinicId', as: 'clinic' });

// Un Medicamento puede aparecer en muchas Solicitudes
Medication.hasMany(Request, {
  foreignKey: 'medicationId',
  as: 'requests',
});
Request.belongsTo(Medication, {
  foreignKey: 'medicationId',
  as: 'medication',
});

// Un Almacen puede recibir muchas Solicitudes
Warehouse.hasMany(Request, { foreignKey: 'warehouseId', as: 'requests' });
Request.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

// Un Usuario (gestor) puede registrar muchas Solicitudes
User.hasMany(Request, {
  foreignKey: 'managerId',
  as: 'requestsProcessed',
});
Request.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });

export {
  sequelize,
  User,
  Clinic,
  Warehouse,
  Medication,
  Inventory,
  Request,
};

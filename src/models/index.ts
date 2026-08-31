import { sequelize } from '../config/database.js';
import User from './user.model.js';
import Clinic from './clinic.model.js';
import Warehouse from './warehouse.model.js';
import Medication from './medication.model.js';
import Inventory from './inventory.model.js';
import Request from './request.model.js';

// Un Almacen tiene muchos registros de Inventario, uno por cada medicamento que almacena
Warehouse.hasMany(Inventory, { foreignKey: 'almacenId', as: 'inventarios' });
Inventory.belongsTo(Warehouse, { foreignKey: 'almacenId', as: 'almacen' });

// Un Medicamento puede estar en el inventario de muchos almacenes
Medication.hasMany(Inventory, {
  foreignKey: 'medicamentoId',
  as: 'inventarios',
});
Inventory.belongsTo(Medication, {
  foreignKey: 'medicamentoId',
  as: 'medicamento',
});

// Una Clinica puede tener muchas Solicitudes
Clinic.hasMany(Request, { foreignKey: 'clinicaId', as: 'solicitudes' });
Request.belongsTo(Clinic, { foreignKey: 'clinicaId', as: 'clinica' });

// Un Medicamento puede aparecer en muchas Solicitudes
Medication.hasMany(Request, {
  foreignKey: 'medicamentoId',
  as: 'solicitudes',
});
Request.belongsTo(Medication, {
  foreignKey: 'medicamentoId',
  as: 'medicamento',
});

// Un Almacen puede recibir muchas Solicitudes
Warehouse.hasMany(Request, { foreignKey: 'almacenId', as: 'solicitudes' });
Request.belongsTo(Warehouse, { foreignKey: 'almacenId', as: 'almacen' });

// Un Usuario (gestor) puede registrar muchas Solicitudes
User.hasMany(Request, {
  foreignKey: 'gestorId',
  as: 'solicitudesProcesadas',
});
Request.belongsTo(User, { foreignKey: 'gestorId', as: 'gestor' });

export {
  sequelize,
  User,
  Clinic,
  Warehouse,
  Medication,
  Inventory,
  Request,
};

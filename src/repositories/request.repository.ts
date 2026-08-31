/**
 * Repositorio de Solicitud.
 */
import Request, { RequestStatus } from '../models/request.model.js';
import Clinic from '../models/clinic.model.js';
import Medication from '../models/medication.model.js';
import Warehouse from '../models/warehouse.model.js';
import User from '../models/user.model.js';

interface RequestData {
  clinicaId: number;
  medicamentoId: number;
  almacenId: number;
  gestorId: number;
  cantidadSolicitada: number;
}

const includeRelations = [
  { model: Clinic, as: 'clinica', attributes: ['id', 'nombre', 'nit'] },
  { model: Medication, as: 'medicamento', attributes: ['id', 'nombre'] },
  { model: Warehouse, as: 'almacen', attributes: ['id', 'nombre'] },
  { model: User, as: 'gestor', attributes: ['id', 'name', 'email'] },
];

const create = (data: RequestData) => Request.create(data);

const findById = (id: number) =>
  Request.findOne({ where: { id, activo: true }, include: includeRelations });

// Solicitudes activas: no eliminadas logicamente y en un estado que aun sigue "en curso"
const findActivas = () =>
  Request.findAll({
    where: { activo: true, estado: ['PENDIENTE', 'APROBADA'] },
    include: includeRelations,
  });

const findHistorialPorClinica = (clinicaId: number) =>
  Request.findAll({
    where: { clinicaId, activo: true },
    include: includeRelations,
  });

const findAll = () =>
  Request.findAll({ where: { activo: true }, include: includeRelations });

const updateEstado = (id: number, estado: RequestStatus) =>
  Request.update({ estado }, { where: { id } });

const softDelete = (id: number) =>
  Request.update({ activo: false }, { where: { id } });

export default {
  create,
  findById,
  findActivas,
  findHistorialPorClinica,
  findAll,
  updateEstado,
  softDelete,
};

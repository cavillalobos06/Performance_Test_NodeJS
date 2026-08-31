/**
 * Repositorio de Solicitud.
 */
import Solicitud, { RequestStatus } from '../models/request.model.js';
import Clinica from '../models/clinic.model.js';
import Medicamento from '../models/medication.model.js';
import Almacen from '../models/warehouse.model.js';
import User from '../models/user.model.js';

interface SolicitudData {
  clinicaId: number;
  medicamentoId: number;
  almacenId: number;
  gestorId: number;
  cantidadSolicitada: number;
}

const includeRelations = [
  { model: Clinica, as: 'clinica', attributes: ['id', 'nombre', 'nit'] },
  { model: Medicamento, as: 'medicamento', attributes: ['id', 'nombre'] },
  { model: Almacen, as: 'almacen', attributes: ['id', 'nombre'] },
  { model: User, as: 'gestor', attributes: ['id', 'name', 'email'] },
];

const create = (data: SolicitudData) => Solicitud.create(data);

const findById = (id: number) =>
  Solicitud.findOne({ where: { id, activo: true }, include: includeRelations });

// Solicitudes activas: no eliminadas logicamente y en un estado que aun sigue "en curso"
const findActivas = () =>
  Solicitud.findAll({
    where: { activo: true, estado: ['PENDIENTE', 'APROBADA'] },
    include: includeRelations,
  });

const findHistorialPorClinica = (clinicaId: number) =>
  Solicitud.findAll({
    where: { clinicaId, activo: true },
    include: includeRelations,
  });

const findAll = () =>
  Solicitud.findAll({ where: { activo: true }, include: includeRelations });

const updateEstado = (id: number, estado: RequestStatus) =>
  Solicitud.update({ estado }, { where: { id } });

const softDelete = (id: number) =>
  Solicitud.update({ activo: false }, { where: { id } });

export default {
  create,
  findById,
  findActivas,
  findHistorialPorClinica,
  findAll,
  updateEstado,
  softDelete,
};

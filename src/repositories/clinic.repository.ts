/**
 * Repositorio de Clinica.
 */
import Clinic from '../models/clinic.model.js';

interface ClinicData {
  nombre: string;
  nit: string;
  responsable: string;
  telefono: string;
  direccion: string;
}

const create = (data: ClinicData) => Clinic.create(data);

// Solo trae las activas (eliminacion logica)
const findAll = () => Clinic.findAll({ where: { activo: true } });

const findById = (id: number) =>
  Clinic.findOne({ where: { id, activo: true } });

const findByNit = (nit: string) => Clinic.findOne({ where: { nit } });

const update = (id: number, data: Partial<ClinicData>) =>
  Clinic.update(data, { where: { id } });

// Eliminacion logica: solo cambia el flag "activo", nunca borra la fila
const softDelete = (id: number) =>
  Clinic.update({ activo: false }, { where: { id } });

export default { create, findAll, findById, findByNit, update, softDelete };

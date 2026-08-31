/**
 * Repositorio de Medicamento.
 */
import Medication from '../models/medication.model.js';

interface MedicationData {
  nombre: string;
  descripcion: string;
}

const create = (data: MedicationData) => Medication.create(data);
const findAll = () => Medication.findAll({ where: { activo: true } });
const findById = (id: number) =>
  Medication.findOne({ where: { id, activo: true } });
const update = (id: number, data: Partial<MedicationData>) =>
  Medication.update(data, { where: { id } });
const softDelete = (id: number) =>
  Medication.update({ activo: false }, { where: { id } });

export default { create, findAll, findById, update, softDelete };

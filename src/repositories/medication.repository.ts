/**
 * Repositorio de Medicamento.
 */
import Medicamento from '../models/medicamento.model';

interface MedicamentoData {
  nombre: string;
  descripcion: string;
}

const create = (data: MedicamentoData) => Medicamento.create(data);
const findAll = () => Medicamento.findAll({ where: { activo: true } });
const findById = (id: number) =>
  Medicamento.findOne({ where: { id, activo: true } });
const update = (id: number, data: Partial<MedicamentoData>) =>
  Medicamento.update(data, { where: { id } });
const softDelete = (id: number) =>
  Medicamento.update({ activo: false }, { where: { id } });

export default { create, findAll, findById, update, softDelete };

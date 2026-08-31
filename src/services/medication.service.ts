/**
 * Logica de negocio para medicamentos.
 */
import ApiError from '../utils/ApiError.js';
import medicationRepository from '../repositories/medication.repository.js';

interface MedicationInput {
  nombre: string;
  descripcion: string;
}

const crearMedicamento = (data: MedicationInput) =>
  medicationRepository.create(data);
const listarMedicamentos = () => medicationRepository.findAll();

/**
 * @throws ApiError 404 si el medicamento no existe o esta eliminado
 */
async function obtenerMedicamento(id: number) {
  const medicamento = await medicationRepository.findById(id);
  if (!medicamento) {
    throw new ApiError(404, 'Medicamento no encontrado');
  }
  return medicamento;
}

async function actualizarMedicamento(
  id: number,
  data: Partial<MedicationInput>,
) {
  await obtenerMedicamento(id);
  await medicationRepository.update(id, data);
  return obtenerMedicamento(id);
}

async function eliminarMedicamento(id: number) {
  await obtenerMedicamento(id);
  return medicationRepository.softDelete(id);
}

export default {
  crearMedicamento,
  listarMedicamentos,
  obtenerMedicamento,
  actualizarMedicamento,
  eliminarMedicamento,
};

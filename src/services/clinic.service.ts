/**
 * Logica de negocio para clinicas.
 * Regla clave: no permitir NIT duplicado.
 */
import ApiError from '../utils/ApiError.js';
import clinicRepository from '../repositories/clinic.repository.js';

interface ClinicInput {
  nombre: string;
  nit: string;
  responsable: string;
  telefono: string;
  direccion: string;
}

/**
 * @throws ApiError 409 si ya existe una clinica con el mismo NIT
 */
async function crearClinica(data: ClinicInput) {
  const existente = await clinicRepository.findByNit(data.nit);
  if (existente) {
    throw new ApiError(409, 'Ya existe una clinica registrada con ese NIT');
  }
  return clinicRepository.create(data);
}

const listClinics = () => clinicRepository.findAll();

/**
 * @throws ApiError 404 si la clinica no existe o esta eliminada
 */
async function getClinic(id: number) {
  const clinic = await clinicRepository.findById(id);
  if (!clinic) {
    throw new ApiError(404, 'Clinica no encontrada');
  }
  return clinic;
}

async function updateClinic(id: number, data: Partial<ClinicInput>) {
  await getClinic(id);

  if (data.nit) {
    const existente = await clinicRepository.findByNit(data.nit);
    if (existente && existente.id !== id) {
      throw new ApiError(409, 'Ya existe otra clinica registrada con ese NIT');
    }
  }

  await clinicRepository.update(id, data);
  return getClinic(id);
}

async function deleteClinic(id: number) {
  await getClinic(id);
  return clinicRepository.softDelete(id);
}

export default {
  crearClinica,
  listClinics,
  getClinic,
  updateClinic,
  deleteClinic,
};

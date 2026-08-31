/**
 * Logica de negocio para almacenes.
 */
import ApiError from '../utils/ApiError.js';
import WarehouseRepository from '../repositories/warehouse.repository.js';

interface AlmacenInput {
  nombre: string;
  ubicacion: string;
}

const crearAlmacen = (data: AlmacenInput) => WarehouseRepository.create(data);
const listarAlmacenes = () => WarehouseRepository.findAll();

/**
 * @throws ApiError 404 si el almacen no existe o esta eliminado
 */
async function obtenerAlmacen(id: number) {
  const almacen = await WarehouseRepository.findById(id);
  if (!almacen) {
    throw new ApiError(404, 'Almacen no encontrado');
  }
  return almacen;
}

async function actualizarAlmacen(id: number, data: Partial<AlmacenInput>) {
  await obtenerAlmacen(id);
  await WarehouseRepository.update(id, data);
  return obtenerAlmacen(id);
}

async function eliminarAlmacen(id: number) {
  await obtenerAlmacen(id);
  return WarehouseRepository.softDelete(id);
}

export default {
  crearAlmacen,
  listarAlmacenes,
  obtenerAlmacen,
  actualizarAlmacen,
  eliminarAlmacen,
};

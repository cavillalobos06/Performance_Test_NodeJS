
/**
 * Logica de negocio para solicitudes de abastecimiento.
 * Aqui viven las reglas mas importantes del enunciado:
 * - Existencia de clinica, medicamento y almacen.
 * - Disponibilidad suficiente en el inventario del almacen.
 * - Transiciones de estado validas.
 */
import ApiError from '../utils/ApiError.js';
import requestRepository from '../repositories/request.repository.js';
import clinicRepository from '../repositories/clinic.repository.js';
import medicationepository from '../repositories/medication.repository.js';
import warehouseRepository from '../repositories/warehouse.repository.js';
import inventoryRepository from '../repositories/inventory.repository.js';
import { RequestStatus } from '../models/request.model.js';

interface CreateRequestInput {
  clinicaId: number;
  medicamentoId: number;
  almacenId: number;
  cantidadSolicitada: number;
}

// Transiciones de estado permitidas: la llave es el estado actual,
// el valor es la lista de estados a los que puede pasar desde ahi.
const TRANSICIONES_VALIDAS: Record<RequestStatus, RequestStatus[]> = {
  PENDIENTE: ['APROBADA', 'RECHAZADA'],
  APROBADA: ['ENTREGADA'],
  RECHAZADA: [],
  ENTREGADA: []
};

/**
 * Crea una solicitud de abastecimiento validando todas las reglas de negocio.
 * @param gestorId - id del usuario autenticado que crea la solicitud
 * @param data - datos de la solicitud
 * @throws ApiError 404 si la clinica, medicamento o almacen no existen
 * @throws ApiError 400 si no hay inventario suficiente en el almacen
 */
async function crearSolicitud(gestorId: number, data: CreateRequestInput) {
  const clinica = await clinicRepository.findById(data.clinicaId);
  if (!clinica) {
    throw new ApiError(404, 'La clinica indicada no existe');
  }

  const medicamento = await medicationepository.findById(data.medicamentoId);
  if (!medicamento) {
    throw new ApiError(404, 'El medicamento indicado no existe');
  }

  const almacen = await warehouseRepository.findById(data.almacenId);
  if (!almacen) {
    throw new ApiError(404, 'El almacen indicado no existe');
  }

  const inventario = await inventoryRepository.findByAlmacenYMedicamento(
    data.almacenId,
    data.medicamentoId
  );

  if (!inventario || inventario.cantidadDisponible < data.cantidadSolicitada) {
    throw new ApiError(400, 'El almacen no tiene inventario suficiente de ese medicamento');
  }

  // Se reserva el stock inmediatamente al crear la solicitud
  await inventoryRepository.descontarStock(inventario.id, data.cantidadSolicitada);

  return requestRepository.create({ ...data, gestorId });
}

const listarActivas = () => requestRepository.findActivas();
const listarTodas = () => requestRepository.findAll();
const historialPorClinica = (clinicaId: number) => requestRepository.findHistorialPorClinica(clinicaId);

/**
 * @throws ApiError 404 si la solicitud no existe
 */
async function obtenerSolicitud(id: number) {
  const solicitud = await requestRepository.findById(id);
  if (!solicitud) {
    throw new ApiError(404, 'Solicitud no encontrada');
  }
  return solicitud;
}

/**
 * Actualiza el estado de una solicitud, validando que la transicion sea valida.
 * @throws ApiError 400 si la transicion de estado no esta permitida
 */
async function actualizarEstado(id: number, nuevoEstado: RequestStatus) {
  const solicitud = await obtenerSolicitud(id);

  const estadosPermitidos = TRANSICIONES_VALIDAS[solicitud.estado];
  if (!estadosPermitidos.includes(nuevoEstado)) {
    throw new ApiError(
      400,
      `No se puede cambiar de estado "${solicitud.estado}" a "${nuevoEstado}"`
    );
  }

  await requestRepository.updateEstado(id, nuevoEstado);
  return obtenerSolicitud(id);
}

async function eliminarSolicitud(id: number) {
  await obtenerSolicitud(id);
  return requestRepository.softDelete(id);
}

export default {
  crearSolicitud,
  listarActivas,
  listarTodas,
  historialPorClinica,
  obtenerSolicitud,
  actualizarEstado,
  eliminarSolicitud
};
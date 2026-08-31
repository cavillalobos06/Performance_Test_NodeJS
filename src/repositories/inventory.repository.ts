/**
 * Repositorio de Inventario.
 * findByAlmacenYMedicamento es la consulta clave para validar
 * disponibilidad antes de crear una solicitud.
 */
import Inventory from '../models/inventory.model.js';

const findByAlmacenYMedicamento = (almacenId: number, medicamentoId: number) =>
  Inventory.findOne({ where: { almacenId, medicamentoId } });

const create = (
  almacenId: number,
  medicamentoId: number,
  cantidadDisponible: number,
) => Inventory.create({ almacenId, medicamentoId, cantidadDisponible });

const descontarStock = (id: number, cantidad: number) =>
  Inventory.increment('cantidadDisponible', { by: -cantidad, where: { id } });

export default { findByAlmacenYMedicamento, create, descontarStock };

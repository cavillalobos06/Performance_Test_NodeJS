/**
 * Repositorio de Inventario.
 * findByAlmacenYMedicamento es la consulta clave para validar
 * disponibilidad antes de crear una solicitud.
 */
import Inventario from '../models/inventario.model';

const findByAlmacenYMedicamento = (almacenId: number, medicamentoId: number) =>
  Inventario.findOne({ where: { almacenId, medicamentoId } });

const create = (
  almacenId: number,
  medicamentoId: number,
  cantidadDisponible: number,
) => Inventario.create({ almacenId, medicamentoId, cantidadDisponible });

const descontarStock = (id: number, cantidad: number) =>
  Inventario.increment('cantidadDisponible', { by: -cantidad, where: { id } });

export default { findByAlmacenYMedicamento, create, descontarStock };

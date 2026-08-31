/**
 * Repositorio de Almacen.
 */
import Warehouse from '../models/warehouse.model.js';

interface WarehouseData {
  nombre: string;
  ubicacion: string;
}

const create = (data: WarehouseData) => Warehouse.create(data);
const findAll = () => Warehouse.findAll({ where: { activo: true } });
const findById = (id: number) =>
  Warehouse.findOne({ where: { id, activo: true } });
const update = (id: number, data: Partial<WarehouseData>) =>
  Warehouse.update(data, { where: { id } });
const softDelete = (id: number) =>
  Warehouse.update({ activo: false }, { where: { id } });

export default { create, findAll, findById, update, softDelete };

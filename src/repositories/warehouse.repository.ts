/**
 * Repositorio de Almacen.
 */
import Almacen from '../models/warehouse.model.js';

interface AlmacenData {
  nombre: string;
  ubicacion: string;
}

const create = (data: AlmacenData) => Almacen.create(data);
const findAll = () => Almacen.findAll({ where: { activo: true } });
const findById = (id: number) =>
  Almacen.findOne({ where: { id, activo: true } });
const update = (id: number, data: Partial<AlmacenData>) =>
  Almacen.update(data, { where: { id } });
const softDelete = (id: number) =>
  Almacen.update({ activo: false }, { where: { id } });

export default { create, findAll, findById, update, softDelete };

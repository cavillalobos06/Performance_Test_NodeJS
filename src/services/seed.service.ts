/**
 * Logica para poblar la base de datos a partir de un archivo JSON
 * subido por el usuario via Multer. Actua como un "Seeder" manual:
 * en vez de correr un script en la terminal, se sube un archivo con
 * la data inicial (usuarios, clinicas, almacenes, medicamentos, inventario)
 * y este servicio la inserta usando findOrCreate para evitar duplicados
 * si el mismo archivo se sube mas de una vez.
 */
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import { User, Clinic, Warehouse, Medication, Inventory } from '../models/index.js';
import { UserRole } from '../models/user.model.js';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface SeedClinic {
  nombre: string;
  nit: string;
  responsable: string;
  telefono: string;
  direccion: string;
}

interface SeedWarehouse {
  nombre: string;
  ubicacion: string;
}

interface SeedMedication {
  nombre: string;
  descripcion: string;
}

interface SeedInventory {
  almacenNombre: string;
  medicamentoNombre: string;
  cantidadDisponible: number;
}

interface SeedData {
  usuarios?: SeedUser[];
  clinicas?: SeedClinic[];
  almacenes?: SeedWarehouse[];
  medicamentos?: SeedMedication[];
  inventario?: SeedInventory[];
}

interface ResumenSeed {
  usuariosCreados: number;
  clinicasCreadas: number;
  almacenesCreados: number;
  medicamentosCreados: number;
  inventarioCreado: number;
}

/**
 * Convierte el buffer del archivo subido en un objeto SeedData valido.
 * @throws ApiError 400 si el archivo no es un JSON valido
 */
function parsearArchivo(buffer: Buffer): SeedData {
  try {
    return JSON.parse(buffer.toString('utf-8')) as SeedData;
  } catch (error) {
    throw new ApiError(400, 'El archivo no contiene un JSON valido');
  }
}

/**
 * Puebla la base de datos con la data del archivo JSON recibido.
 * @param buffer - contenido crudo del archivo subido por Multer
 * @returns un resumen de cuantos registros se crearon por entidad
 */
async function poblarBaseDeDatos(buffer: Buffer): Promise<ResumenSeed> {
  const data = parsearArchivo(buffer);
  const resumen: ResumenSeed = {
    usuariosCreados: 0,
    clinicasCreadas: 0,
    almacenesCreados: 0,
    medicamentosCreados: 0,
    inventarioCreado: 0,
  };

  for (const usuario of data.usuarios ?? []) {
    const passwordHasheada = await bcrypt.hash(usuario.password, 10);
    const [, creado] = await User.findOrCreate({
      where: { email: usuario.email },
      defaults: { ...usuario, password: passwordHasheada },
    });
    if (creado) resumen.usuariosCreados++;
  }

  for (const clinica of data.clinicas ?? []) {
    const [, creado] = await Clinic.findOrCreate({
      where: { nit: clinica.nit },
      defaults: clinica,
    });
    if (creado) resumen.clinicasCreadas++;
  }

  for (const almacen of data.almacenes ?? []) {
    const [, creado] = await Warehouse.findOrCreate({
      where: { nombre: almacen.nombre },
      defaults: almacen,
    });
    if (creado) resumen.almacenesCreados++;
  }

  for (const medicamento of data.medicamentos ?? []) {
    const [, creado] = await Medication.findOrCreate({
      where: { nombre: medicamento.nombre },
      defaults: medicamento,
    });
    if (creado) resumen.medicamentosCreados++;
  }

  for (const item of data.inventario ?? []) {
    const almacen = await Warehouse.findOne({
      where: { nombre: item.almacenNombre },
    });
    const medicamento = await Medication.findOne({
      where: { nombre: item.medicamentoNombre },
    });

    if (!almacen || !medicamento) continue;

    const [, creado] = await Inventory.findOrCreate({
      where: { almacenId: almacen.id, medicamentoId: medicamento.id },
      defaults: {
        almacenId: almacen.id,
        medicamentoId: medicamento.id,
        cantidadDisponible: item.cantidadDisponible,
      },
    });
    if (creado) resumen.inventarioCreado++;
  }

  return resumen;
}

export default { poblarBaseDeDatos };

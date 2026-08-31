/**
 * Configuracion de Multer para el endpoint de carga de Seeders.
 * Se usa almacenamiento en memoria (memoryStorage) porque el archivo
 * JSON solo se necesita leer una vez para poblar la base de datos,
 * no se necesita guardar en disco de forma permanente.
 * Se restringe a archivos .json unicamente.
 */
import multer from 'multer';
import ApiError from '../utils/ApiError.js';

const storage = multer.memoryStorage();

function filtroArchivo(
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
): void {
  const esJson =
    file.mimetype === 'application/json' || file.originalname.endsWith('.json');
  if (!esJson) {
    callback(new ApiError(400, 'Solo se permiten archivos con formato JSON'));
    return;
  }
  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter: filtroArchivo,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB maximo
});

export default upload;

/**
 * Clase de error personalizada usada en toda la aplicacion.
 * Cada capa de servicio lanza un ApiError con el codigo HTTP correcto,
 * y el middleware de errores central lo convierte en la respuesta JSON final.
 */
class ApiError extends Error {
  public statusCode: number;

  /**
   * @param statusCode - codigo de estado HTTP a responder (400, 404, 409, etc.)
   * @param message - mensaje descriptivo del error para el cliente
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;

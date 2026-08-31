/**
 * Configuracion de Swagger/OpenAPI.
 * Lee los comentarios @swagger de src/routes/*.ts y genera la
 * documentacion interactiva disponible en /api-docs.
 */
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RiwiMediCare Plus',
      version: '1.0.0',
      description:
        'Gestion de solicitudes de abastecimiento de medicamentos entre clinicas y almacenes',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerJSDoc(options);

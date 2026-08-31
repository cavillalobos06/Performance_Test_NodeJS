import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { sequelize } from './models/index.js';
import { ensureDatabaseExists } from './config/createDatabase.js';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log('Conexión a postgres exitosa');

    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
}

start();

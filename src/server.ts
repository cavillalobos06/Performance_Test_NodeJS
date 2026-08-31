import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 3000;

async function start () {
    try {
      await sequelize.authenticate();
      console.log("Conexión a postgres exitosa");

      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("No se pudo iniciar el servidor:", error);
      process.exit(1);
    }
}

start();
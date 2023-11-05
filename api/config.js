import { config as dotenvConfig } from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenvConfig();

const config = {
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
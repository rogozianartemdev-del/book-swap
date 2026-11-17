import { env } from './config-env';

const databaseConfig = {
  dialect: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  seederStorage: 'sequelize',
};

export = {
  development: databaseConfig,
  production: databaseConfig,
};
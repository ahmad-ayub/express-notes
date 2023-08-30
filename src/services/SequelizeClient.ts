import { Sequelize } from 'sequelize-typescript';
import config from '../config/Config';

const connection = new Sequelize({
  dialect: 'mysql',
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  logging: true,
  models: [__dirname + '/../models/**.ts'],
});

export default connection;

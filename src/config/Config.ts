import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  redisURL: process.env.REDIS_URL,
};

export default config;

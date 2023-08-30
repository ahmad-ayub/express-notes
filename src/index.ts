import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { NotFoundError } from './utils/ApiError';
import ErrorHandler from './middlewares/ErrorHandler';
import Config from './config/Config';
import routes from './routes';
import http from 'http';
import cors from 'cors';
import { Sequelize } from 'sequelize/types';
import connection from './services/SequelizeClient';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './models/User';

const app: Application = express();
const PORT = Config.port || 4000;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      userId: number;
    }
  }
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/api/v1', routes);

app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));

app.use(ErrorHandler.handle());

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.jwtSecret, // Change this to your secret key
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.userId } });

        if (!user) {
          return done(null, false);
        }

        return done(null, { userId: user.id });
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

let server: http.Server;
let dbClient: Sequelize | undefined;
const startServer = async () => {
  try {
    dbClient = await connection.sync();
    server = app.listen(PORT, (): void => {
      console.log(`Connected successfully on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
  }
};

startServer();

ErrorHandler.initializeUnhandledException();

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (dbClient) dbClient.close();
  if (server) server.close();
});

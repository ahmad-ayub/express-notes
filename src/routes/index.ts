import express from 'express';
import authRoute from './AuthRoute';
import noteRoute from './NoteRoute';

const router = express.Router();

const allRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/note',
    route: noteRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

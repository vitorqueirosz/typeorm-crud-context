import { Router } from 'express';

import './database/connection';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/logon', UserController.store);
routes.post('/sessions', AuthController.authenticate);

routes.use(authMiddleware);

routes.get('/user/:id', UserController.index);

routes.put('/user', UserController.update);

routes.delete('/user', UserController.delete);



export default routes;
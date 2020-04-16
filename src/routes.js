import { Router } from 'express';

import UserController from './controllers/user-controller';
import SessionController from './controllers/session-controller';
import FileController from './controllers/FileController';

import auth from './middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.registerUser);
routes.post('/login', SessionController.generateToken);

routes.use(auth.verifyToken);

routes.put('/users', UserController.updateUser);
routes.post('/file', uploadFile.single('file'), FileController.store);

export default routes;

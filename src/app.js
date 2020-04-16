import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import exceptions from './exceptions'
import routes from './routes';
import './database';

class App {

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(morgan('dev'));
    this.express.use(cors());

    this.handleExceptions();
  }

  handleExceptions() {
    this.express.use(exceptions.registryValidation);
    this.express.use(exceptions.authValidation);
    this.express.use(exceptions.yupValidation);
  }

  routes() {
    this.express.use(routes);
  }

}

export default new App();

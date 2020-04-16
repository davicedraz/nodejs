require('dotenv').config();
require('express-async-errors');

import app from './src/app';

const server = app.express;
const context = {
  port: process.env.SERVER_PORT,
  env: process.env.NODE_ENV
};

server.listen(context.port, () => {
  console.log(`Server listen on port ${context.port}`);
});

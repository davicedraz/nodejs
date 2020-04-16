import HttpStatus from 'http-status-codes';

import { DuplicityException, AuthorizationException } from './errors';

function authValidation(error, req, res, next) {
  if (error instanceof AuthorizationException) {
    res.status(HttpStatus.UNAUTHORIZED);
    return res.send({
      httpStatus: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
  next(error);
}

function registryValidation(error, req, res, next) {
  if (error instanceof DuplicityException) {
    res.status(HttpStatus.BAD_REQUEST);
    return res.send({
      httpStatus: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  next(error);
}

function yupValidation(error, req, res, next) {
  if (error.name == "ValidationError") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({
        httpStatus: HttpStatus.BAD_REQUEST,
        messages: error.errors
      });
  }
  next(error);
}

//TODO: Add exception when the database connection is lost and its crash the application send 500 to user

module.exports = {
  registryValidation,
  authValidation,
  yupValidation
}

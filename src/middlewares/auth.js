import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import config from '../config/authentication';
import { AuthorizationException } from '../errors';

async function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) throw new AuthorizationException('Token not provided');
  token = token.split(' ')[1];

  try {
    const decodedToken = await promisify(jwt.verify)(token, config.secret);
    req.userId = decodedToken.id;
    return next();
  } catch (error) {
    throw new AuthorizationException('Invalid token provided');
  }
};

module.exports = {
  verifyToken
}

import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

import User from '../database/models/User';
import config from '../config/authentication';

import { AuthorizationException } from '../errors'
import { promisify } from 'util';

class SessionController {

  async generateToken(req, res) {
    const { email, password } = req.body;
    const registeredUser = await User.findOne({ where: { email } });

    if (!registeredUser) throw new AuthorizationException('No user found with given credentials');
    if (!(await registeredUser.checkPassword(password))) throw new AuthorizationException('wrong password');

    return res.status(HttpStatus.OK).json({
      user: {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email
      },
      token: jwt.sign({ id: registeredUser.id }, config.secret, {
        expiresIn: config.expiresIn
      })
    });
  }

  async verifyToken(req, res, next) {
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

}

export default new SessionController();

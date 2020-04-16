import * as yup from 'yup';
import User from '../database/models/User';
import HttpStatus from 'http-status-codes';

import { DuplicityException, AuthorizationException } from '../errors'

const expectedNewUser = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required().min(5)
});

const expectedUpdateUser = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  old_password: yup.string().min(5),
  password: yup.string().required().min(5)
    .when('old_password', (old_password, field) => old_password ? field.required() : field),
  confirm_password: yup.string()
    .when('password', (password, field) => password ? field.required().oneOf([yup.ref('password')]) : field)
});

class UserController {

  async registerUser(req, res) {
    await expectedNewUser.validate(req.body);
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) throw new DuplicityException('That email is already in use');

    const { id, name, email } = await User.create(req.body);
    return res.status(HttpStatus.CREATED).json({ id, name, email });
  }

  async updateUser(req, res) {
    await expectedUpdateUser.validate(req.body);
    const user = await User.findByPk(req.userId);

    if (req.body.email !== user.email) {
      const userExists = await User.findOne({ where: { email: req.body.email } });
      if (userExists) throw new DuplicityException('That email is already in use');
    }

    if (req.body.old_password && !(await user.checkPassword(req.body.old_password)))
      throw new AuthorizationException('Wrong old password passed by');

    const { id, name, email } = await user.update(req.body);
    return res.status(HttpStatus.OK).json({ id, name, email });
  }

}

export default new UserController();

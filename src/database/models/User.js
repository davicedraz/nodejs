import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {

  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    }, {
      sequelize
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 8);
    });

    this.addHook('beforeUpdate', async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

}

export default User;

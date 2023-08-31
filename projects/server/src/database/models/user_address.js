'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'id_user'
      })
    }
  }
  user_address.init({
    id_user: DataTypes.INTEGER,
    province: DataTypes.STRING,
    city_name: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    full_address: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_address',
  });
  return user_address;
};
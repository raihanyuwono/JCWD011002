'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse_admin extends Model {
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
      this.belongsTo(models.warehouse, {
        foreignKey: 'id_warehouse'
      })
    }
  }
  warehouse_admin.init({
    id_user: DataTypes.INTEGER,
    id_warehouse: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'warehouse_admin',
  });
  return warehouse_admin;
};
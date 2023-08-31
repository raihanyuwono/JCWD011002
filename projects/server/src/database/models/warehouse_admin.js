'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse_admin extends Model {
    static associate(models) {
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
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return warehouse_admin;
};
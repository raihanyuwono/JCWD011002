"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class warehouse extends Model {
    static associate(models) {
      this.hasMany(models.product_warehouse, { foreignKey: "id_warehouse" });
      this.hasMany(models.warehouse_admin, { foreignKey: "id_warehouse" });
      this.hasMany(models.stock_history, { foreignKey: "id_warehouse_from" });
      this.hasMany(models.stock_history, { foreignKey: "id_warehouse_to" });
    }
  }
  warehouse.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "warehouse",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return warehouse;
};

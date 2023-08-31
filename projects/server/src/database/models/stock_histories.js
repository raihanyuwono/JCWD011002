"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stock_histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.products, { foreignKey: "id_product" });
    }
  }
  stock_histories.init(
    {
      id_user: DataTypes.INTEGER,
      id_warehouse_from: DataTypes.INTEGER,
      id_warehouse_to: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      id_transaction: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      id_status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "stock_histories",
    }
  );
  return stock_histories;
};

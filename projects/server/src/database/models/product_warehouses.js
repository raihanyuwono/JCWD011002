"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_warehouses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.warehouses, { foreignKey: "id_warehouse" });
      this.belongsTo(models.products, { foreignKey: "id_product" });
    }
  }
  product_warehouses.init(
    {
      id_warehouse: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product_warehouses",
    }
  );
  return product_warehouses;
};

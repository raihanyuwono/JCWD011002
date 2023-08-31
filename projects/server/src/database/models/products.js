"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.stock_histories, { foreignKey: "id_product" });
      this.hasMany(models.cart_products, { foreignKey: "id_product" });
      this.hasMany(models.transaction_products, {
        foreignKey: "id_product",
      });
      this.hasMany(models.product_warehouses, { foreignKey: "id_product" });
      this.belongsTo(models.categories, { foreignKey: "id_category" });
    }
  }
  products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.BIGINT,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      id_category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      this.hasMany(models.product, { foreignKey: "id_category" });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return category;
};

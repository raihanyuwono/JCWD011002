"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      this.belongsTo(models["user"], { foreignKey: "id_user" });
      this.belongsTo(models["status"], { foreignKey: "id_status" });
      this.hasMany(models["transaction_product"], {
        foreignKey: "id_transaction",
      });
      this.hasMany(models["stock_history"], {
        foreignKey: "id_transaction",
      });
    }
  }
  transaction.init(
    {
      id_user: DataTypes.INTEGER,
      total: DataTypes.BIGINT,
      id_status: DataTypes.INTEGER,
      receipt: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_confirm: DataTypes.BOOLEAN,
      shipping_method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ unique: true, fields: ["receipt"] }],
    }
  );
  return transaction;
};

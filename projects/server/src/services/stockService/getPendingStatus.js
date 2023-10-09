const { Op } = require("sequelize");

const db = require("../../database/models");
const { messages } = require("../../helpers");
const StockHistory = db.stock_history;
const ProductWarehouse = db.product_warehouse;
const sequelize = db.sequelize;
const Warehouse = db.warehouse;
const Product = db.product;
const Admin = db.admin;
const Status = db.status;
const User = db.user;

const getAdmin = async (id) => {
  return Admin.findOne({
    where: {
      id_user: id
    }
  });
};

const getStockHistoryWithIncludes = async (options) => {
  return StockHistory.findAll({
    ...options,
    include: [
      {
        model: User,
        attributes: ["name"]
      },
      {
        model: Warehouse,
        as: "_warehouse_from",
        attributes: ["name"]
      },
      {
        model: Warehouse,
        as: "_warehouse_to",
        attributes: ["name"]
      },
      {
        model: Product,
        attributes: ["name"]
      },
      {
        model: Status,
        attributes: ["name"]
      }
    ],
    attributes: ["id", "id_status", "qty", "created_at", "updated_at"],
  });
};

const getPendingStatusWhTo = async (req, res) => {
  try {
    const { id } = req.account;
    const result = await getStockHistoryWithIncludes({
      where: {
        id_user: id,
        id_status: 7
      }
    });

    return res.status(200).json({
      message: "success",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed",
    });
  }
};

const getPendingStatusWhFrom = async (req, res) => {
  try {
    const { id } = req.account;
    const admin = await getAdmin(id);
    const result = await getStockHistoryWithIncludes({
      where: {
        id_status: 7,
        id_warehouse_from: admin.id_warehouse
      }
    });

    return res.status(200).json({
      message: "success",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed",
    });
  }
};

module.exports = { getPendingStatusWhFrom, getPendingStatusWhTo };

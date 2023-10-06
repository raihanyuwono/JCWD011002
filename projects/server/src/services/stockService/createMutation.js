const db = require("../../database/models");
const { messages } = require("../../helpers");
const stockHistory = db.stock_history;
const productWarehouse = db.product_warehouse;
const sequelize = db.sequelize;

const createMutation = async (req, res) => {
  try {
    const { id } = req.account;
    const { id_product, id_warehouse_from, id_warehouse_to, qty } = req.body;
    return await sequelize.transaction(async (t) => {
      const result = await stockHistory.create({
        id_user: id,
        id_product: id_product,
        id_warehouse_from: id_warehouse_from,
        id_warehouse_to: id_warehouse_to,
        qty: qty,
        id_status: 7
      }, {
        transaction: t
      })
  
      return res.status(200).json({
        message: "success",
        data: result
      })
    })
  } catch (error) {
    console.log(error) 
    res.status(500).json({
      message: "failed",
    })
  }
 
}

module.exports = createMutation;
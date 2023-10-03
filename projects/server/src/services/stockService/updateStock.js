const db = require("../../database/models");

const ProductWarehouse = db.product_warehouse;
const Admin = db.admin
const StockHistory = db.stock_history
const sequelize = db.sequelize;

const updateStock = async (req, res) => {
  try {
    const { id, role } = req.account
    const { addition, subtraction, warehouseId, productId } = req.body;
    await sequelize.transaction(async (t) => {
      if (role === "admin warehouse") {
        const admin = await Admin.findOne({
          where: { id_user: id },
        })
        const productWarehouses = await ProductWarehouse.findOne({
          where: { id_warehouse: admin.id_warehouse, id_product: productId }
        })
        if (!productWarehouses || productWarehouses.length === 0) {
          return res.status(404).json({ message: 'product warehouse not found' });
        }
        const stockHistory = await StockHistory.create({
          id_user: id,
          id_product: productId,
          id_warehouse_to: admin.id_warehouse,
          qty: addition ? addition : subtraction,
          id_status: addition ? 9 : 10
        })
        console.log("stock hystory", stockHistory)
        if (addition) {
          await productWarehouses.update(
            {
              stock: productWarehouses.stock + addition,
            }, {
            transaction: t
          }
          )
        } else {
          await productWarehouses.update(
            {
              stock: productWarehouses.stock - subtraction,
            }, {
            transaction: t
          }
          )
        }
      } else {
        const productWarehouses = await ProductWarehouse.findOne({
          where: { id_warehouse: warehouseId, id_product: productId }
        });
        if (!productWarehouses || productWarehouses.length === 0) {
          return res.status(404).json({ message: 'product warehouse not found' });
        }
        const stockHistory = await StockHistory.create({
          id_user: id,
          id_product: productId,
          id_warehouse_to: warehouseId,
          qty: addition ? addition : subtraction,
          id_status: addition ? 10 : 11
        })
        console.log("stock hystory", stockHistory)
        if (addition) {
          await productWarehouses.update(
            {
              stock: productWarehouses.stock + addition,
            }, {
            transaction: t
          }
          )
        } else {
          await productWarehouses.update(
            {
              stock: productWarehouses.stock - subtraction,
            }, {
            transaction: t
          }
          )
        }
      }
      return res.status(200).json({ message: 'successfully updated stock' });
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = updateStock;

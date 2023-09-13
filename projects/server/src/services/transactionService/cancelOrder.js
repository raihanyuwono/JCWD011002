const {
  transaction,
  transaction_product,
  stock_history,
  product_warehouse,
  sequelize,
} = require("../../database");
const { messages } = require("../../helpers");

async function cancelOrder(userId, transactionId) {
  const t = await sequelize.transaction();

  try {
    const transactionProducts = await transaction_product.findAll({
      where: { id_transaction: transactionId },
      transaction: t,
    });

    for (const product of transactionProducts) {
      const productId = product.id_product;
      const qty = product.qty;

      const stockHistories = await stock_history.findAll({
        where: { id_transaction: transactionId, id_product: productId },
        transaction: t,
      });

      for (const stockHistory of stockHistories) {
        await stock_history.create(
          {
            id_user: userId,
            id_warehouse_from: stockHistory.id_warehouse_from,
            id_warehouse_to: stockHistory.id_warehouse_from,
            id_product: productId,
            id_transaction: transactionId,
            qty: qty,
            id_status: stockHistory.id_status,
          },
          { transaction: t }
        );
      }

      const productWarehouse = await product_warehouse.findOne({
        where: {
          id_warehouse: stockHistories[0].id_warehouse_from,
          id_product: productId,
        },
        transaction: t,
      });

      if (productWarehouse) {
        productWarehouse.stock += qty;
        await productWarehouse.save({ transaction: t });
      }
    }

    await transaction.update(
      { id_status: 6 },
      { where: { id: transactionId }, transaction: t }
    );

    await t.commit(); 

    return messages.success("Order canceled successfully");
  } catch (error) {
    await t.rollback();
    console.error("Error canceling order:", error);
    return messages.error(500, error.message || "Internal server error");
  }
}

module.exports = cancelOrder;

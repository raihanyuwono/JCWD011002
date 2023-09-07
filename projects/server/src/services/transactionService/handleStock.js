const { product, product_warehouse, stock_history } = require("../../database");

const handleStock = async (cartProduct, userId, transactionId) => {
  const myLatitude = -7.417166656128915;
  const myLongitude = 112.75669259021905;
  try {
    for (const item of cartProduct) {
      const productInfo = await product.findOne({
        where: { id: item.id_product },
      });
      if (productInfo) {
        const productWarehouses = await product_warehouse.findAll({
          where: { id_product: item.id_product },
        });

        let qtyToReduce = item.qty;

        for (const warehouse of productWarehouses) {
          if (qtyToReduce > 0) {
            if (warehouse.stock >= qtyToReduce) {
              await warehouse.update({
                stock: warehouse.stock - qtyToReduce,
              });

              await stock_history.create({
                id_user: userId,
                id_warehouse_from: warehouse.id_warehouse,
                id_warehouse_to: null,
                id_product: item.id_product,
                id_transaction: transactionId,
                qty: qtyToReduce,
                id_status: 8,
              });
              qtyToReduce = 0;
            } else {
              await stock_history.create({
                id_user: userId,
                id_warehouse_from: warehouse.id_warehouse,
                id_warehouse_to: null,
                id_product: item.id_product,
                id_transaction: transactionId,
                qty: warehouse.stock,
                id_status: 8,
              });
              qtyToReduce -= warehouse.stock;
              await warehouse.update({ stock: 0 });
            }
          } else {
            break;
          }
        }

        if (qtyToReduce > 0) {
          console.error(
            `Insufficient stock for product ${item.id_product} (remaining: ${qtyToReduce})`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error decreasing product stock:", error);
  }
};

module.exports = handleStock;

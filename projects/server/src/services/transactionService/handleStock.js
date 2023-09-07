const { product, product_warehouse } = require("../../database");
const handleStock = async (cartProduct) => {
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
              qtyToReduce = 0;
            } else {
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

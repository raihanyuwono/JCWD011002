const {
  product,
  product_warehouse,
  stock_history,
  warehouse,
} = require("../../database");
const geolib = require("geolib");

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
        // let qtyToReduce = item.qty;
        let nearestWarehouse = null;
        let nearestDistance = Infinity;
        for (const warehouseData of productWarehouses) {
          const warehouseInfo = await warehouse.findByPk(
            warehouseData.id_warehouse
          );

          if (warehouseInfo) {
            // Calculate the distance between your location and the warehouse
            const distance = geolib.getDistance(
              { latitude: myLatitude, longitude: myLongitude },
              {
                latitude: parseFloat(warehouseInfo.latitude),
                longitude: parseFloat(warehouseInfo.longitude),
              }
            );

            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestWarehouse = warehouseInfo;
            }
          }
        }

        if (nearestWarehouse) {
          const { id: nearestWarehouseId, name: nearestWarehouseName } =
            nearestWarehouse;
          console.log("Gudang Terdekat", nearestWarehouseName);
          let qtyToReduce = item.qty;

          while (qtyToReduce > 0) {
            const productWarehouse = productWarehouses.find(
              (pw) => pw.id_warehouse === nearestWarehouseId
            );

            if (productWarehouse && productWarehouse.stock >= qtyToReduce) {
              await productWarehouse.update({
                stock: productWarehouse.stock - qtyToReduce,
              });

              await stock_history.create({
                id_user: userId,
                id_warehouse_from: nearestWarehouseId,
                id_warehouse_to: null,
                id_product: item.id_product,
                id_transaction: transactionId,
                qty: qtyToReduce,
                id_status: 8,
              });

              qtyToReduce = 0;
            } else if (productWarehouse) {
              await stock_history.create({
                id_user: userId,
                id_warehouse_from: nearestWarehouseId,
                id_warehouse_to: null,
                id_product: item.id_product,
                id_transaction: transactionId,
                qty: productWarehouse.stock,
                id_status: 8, //approve
              });

              qtyToReduce -= productWarehouse.stock;
              await productWarehouse.update({ stock: 0 });
            }
          }
        } else {
          console.error(
            `No suitable warehouse found for product ${item.id_product}`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error decreasing product stock:", error);
  }
};

module.exports = handleStock;

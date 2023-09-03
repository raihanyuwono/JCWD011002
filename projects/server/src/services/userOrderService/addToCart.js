const db = require("../../database");
// db.sequelize.sync({ alter: true });
const product = db["product"];
const product_warehouse = db["product_warehouse"];
const cart_product = db["cart_product"];
const { messages } = require("../../helpers");

const addToCart = async (userId, productId, quantity) => {
  try {
    const productInfo = await product.findOne({
      where: { id: productId },
      include: [{ model: product_warehouse, as: "product_warehouses" }],
    });

    if (!productInfo) {
      return messages.error(404, "Product not found.");
    }

    let totalStock = 0;
    for (const warehouse of productInfo.product_warehouses) {
      totalStock += warehouse.stock;
    }

    if (quantity > totalStock) {
      return messages.error(400, "Insufficient stock for this product.");
    }

    const existingCartItem = await cart_product.findOne({
      where: { id_cart: userId, id_product: productId },
    });

    if (existingCartItem) {
      const totalQuantityInCart = await cart_product.sum("qty", {
        where: { id_cart: userId, id_product: productId },
      });

      if (totalQuantityInCart + quantity > totalStock) {
        return messages.error(400, "Insufficient stock for this product.");
      }

      existingCartItem.qty += quantity;
      await existingCartItem.save();
    } else {
      await cart_product.create({
        id_cart: userId,
        id_product: productId,
        qty: quantity,
      });
    }

    return messages.success("Product added to cart successfully");
  } catch (error) {
    return messages.error(500, error.message || "Internal server error.");
  }
};

module.exports = addToCart;

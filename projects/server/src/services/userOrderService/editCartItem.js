const { cart_product, product, product_warehouse } = require("../../database");
const { messages } = require("../../helpers");

const editCartItem = async (userId, productId, quantity) => {
  try {
    const cartItem = await cart_product.findOne({
      where: { id_cart: userId, id_product: productId },
    });

    if (!cartItem) {
      return messages.error(404, "Cart item not found.");
    }

    const existingQuantity = cartItem.qty;

    // Check if new qty exceeds the stock
    const isStockSufficient = await checkStock(
      productId,
      existingQuantity + quantity
    );

    if (!isStockSufficient) {
      return messages.error(400, "Insufficient stock for this product.");
    }
    cartItem.qty += quantity;

    if (cartItem.qty <= 0) {
      // If quantity zero or negative, remove
      await cartItem.destroy();
      return messages.success("Cart item removed from the cart.");
    }

    await cartItem.save();
    return messages.success("Cart item updated successfully");
  } catch (error) {
    console.error("Error editing cart item:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

const checkStock = async (productId, requestedQuantity) => {
  const productInfo = await getProductInfo(productId);

  if (!productInfo) {
    return false;
  }

  const totalStock = productInfo.product_warehouses.reduce(
    (sum, warehouse) => sum + warehouse.stock,
    0
  );

  return totalStock >= requestedQuantity;
};

const getProductInfo = async (productId) => {
  return product.findOne({
    where: { id: productId },
    include: [{ model: product_warehouse, as: "product_warehouses" }],
  });
};

module.exports = editCartItem;

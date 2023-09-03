const db = require("../../database");
const cart_product = db["cart_product"];
const { messages } = require("../../helpers");

const removeFromCart = async (userId, productId) => {
  try {
    const cartItem = await cart_product.findOne({
      where: { id_cart: userId, id_product: productId },
    });

    if (!cartItem) {
      return messages.error(404, "Cart item not found.");
    }
    await cartItem.destroy();
    return messages.success("Product removed from the cart successfully");
  } catch (error) {
    console.error("Error removing from cart:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

module.exports = removeFromCart;

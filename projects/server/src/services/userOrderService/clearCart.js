const { cart_product } = require("../../database");
const { messages } = require("../../helpers");

const clearCart = async (userId) => {
  try {
    await cart_product.destroy({
      where: { id_cart: userId },
    });

    return messages.success("Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

module.exports = clearCart;

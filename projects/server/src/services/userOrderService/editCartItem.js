const db = require("../../database");
const cart_product = db["cart_product"];
const { messages } = require("../../helpers");

const editCartItem = async (userId, productId, quantity) => {
  try { 
    const cartItem = await cart_product.findOne({
      where: { id_cart: userId, id_product: productId },
    });

    if (!cartItem) {
      return messages.error(404, "Cart item not found.");
    }

    if (quantity < 0) {
      if (cartItem.qty + quantity <= 0) {
        await cartItem.destroy();
        return messages.success("Cart item removed from the cart.");
      } else {
        cartItem.qty += quantity;
      }
    } else if (quantity === 0) {
      await cartItem.destroy();
      return messages.success("Cart item removed from the cart.");
    } else {
      cartItem.qty += quantity;
    }

    await cartItem.save();
    return messages.success("Cart item updated successfully");
  } catch (error) {
    console.error("Error editing cart item:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

module.exports = editCartItem;

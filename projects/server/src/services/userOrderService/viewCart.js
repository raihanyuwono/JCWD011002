const { cart_product, product } = require("../../database");

const viewCart = async (userId) => {
  try {
    const cartItems = await cart_product.findAll({
      where: { id_cart: userId },
      include: [{ model: product, attributes: ["name", "price", "image"] }],
    });

    const cartData = cartItems.map((cartItem) => {
      const { name, price, image } = cartItem.product;
      const subtotal = price * cartItem.qty;

      return {
        name,
        price,
        image,
        quantity: cartItem.qty,
        subtotal,
      };
    });

    return { status: 200, data: cartData };
  } catch (error) {
    console.error("Error viewing cart:", error);
    return { status: 500, message: "Internal server error" };
  }
};

module.exports = viewCart;

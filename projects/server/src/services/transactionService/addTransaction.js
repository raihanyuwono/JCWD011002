const {
  transaction,
  transaction_product,
  transaction_payment,
  cart_product,
  product,
} = require("../../database");

const addTransaction = async (userId, payment, shipping) => {
  try {
    const cartItems = await cart_product.findAll({
      where: { id_cart: userId },
      include: [{ model: product }],
    });
    const total = calculateTotal(cartItems);
    const newTransaction = await transaction.create({
      id_user: userId,
      total,
      id_status: 1,
      is_confirm: false,
      shipping_method: shipping,
    });

    const transactionProducts = cartItems.map((cartItem) => ({
      id_transaction: newTransaction.id,
      id_product: cartItem.id_product,
      qty: cartItem.qty,
      price: cartItem.product.price,
    }));
    await transaction_product.bulkCreate(transactionProducts);

    await transaction_payment.create({
      id_transaction: newTransaction.id,
      id_payment_method: payment,
      shipping_method: shipping,
      id_status: 1,
    });
    return {
      success: true, 
      status: 200,
      data: {
        transactionId: newTransaction.id,
      },
    };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return {
      success: false,
      message: "Failed to add the transaction.",
    };
  }
};

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.qty * cartItem.product.price;
  }, 0);
};

module.exports = addTransaction;

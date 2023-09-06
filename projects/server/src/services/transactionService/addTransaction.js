const {
  transaction,
  transaction_product,
  transaction_payment,
  cart_product,
  product,
} = require("../../database");
const axios = require("axios");

const addTransaction = async (userId, payment, shipping) => {
  try {
    const total = await getTotal(userId);
    const cartItems = await cart_product.findAll({
      where: { id_cart: userId },
      include: [{ model: product }],
    });

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
      id_status: 1, // Default status ("Menunggu Pembayaran")
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

const getTotal = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/order/${userId}`
    );
    const total = response.data.data.total;
    console.log(total);
    return total;
  } catch (error) {
    console.error("Error get total from API:", error);
  }
};

module.exports = addTransaction;

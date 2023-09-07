const {
  transaction,
  transaction_product,
  transaction_payment,
  cart_product,
  product,
} = require("../../database");
const axios = require("axios");
const handleStock = require("./handleStock");

const addTransaction = async (userId, payment, shipping) => {
  const myLatitude = -7.417166656128915;
  const myLongitude = 112.75669259021905;
  try {
    const total = await getTotal(userId);

    const cartProduct = await cart_product.findAll({
      where: { id_cart: userId },
      include: [{ model: product }],
    });

    if (cartProduct.length === 0) {
      return {
        success: false,
        status: 404,
        message: "Cart is empty.",
      };
    }

    const newTransaction = await transaction.create({
      id_user: userId,
      total,
      id_status: 1,
      is_confirm: false,
      shipping_method: shipping,
    });

    const transactionProducts = cartProduct.map((item) => ({
      id_transaction: newTransaction.id,
      id_product: item.id_product,
      qty: item.qty,
      price: item.product.price,
    }));
    await transaction_product.bulkCreate(transactionProducts);

    await handleStock(cartProduct, userId, newTransaction.id);

    await transaction_payment.create({
      id_transaction: newTransaction.id,
      id_payment_method: payment,
      shipping_method: shipping,
      id_status: 7,
    });

    await cart_product.destroy({
      where: { id_cart: userId },
    });

    return {
      success: true,
      status: 200,
      data: {
        id_transaction: newTransaction.id,
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
    console.error("Error fetching total from API:", error);
    throw error;
  }
};

module.exports = addTransaction;

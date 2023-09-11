// const fs = require("fs").promises;
const { transaction, transaction_payment } = require("../../database");
const { messages } = require("../../helpers");

async function uploadReceipt(transactionId, file) {
  try {
    const { path } = file;
    await transaction_payment.update(
      { receipt: path },
      { where: { id_transaction: transactionId } }
    );

    await transaction.update(
      { id_status: 2 },
      { where: { id: transactionId } }
    );

    return messages.success("Receipt uploaded!");
  } catch (error) {
    throw messages.error(500, error.message);
  }
}

module.exports = uploadReceipt;

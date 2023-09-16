const {
  transaction,
  transaction_payment,
  sequelize,
} = require("../../database");
const { messages } = require("../../helpers");

async function uploadReceipt(transactionId, file) {
  const t = await sequelize.transaction();

  try {
    const { path } = file;

    await transaction_payment.update(
      { receipt: path },
      { where: { id_transaction: transactionId }, transaction: t }
    );

    await transaction.update(
      { id_status: 2 },
      { where: { id: transactionId }, transaction: t }
    );

    await t.commit(); // Commit the transaction
    return messages.success("Receipt uploaded!");
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of an error
    throw messages.error(500, error.message);
  }
}

module.exports = uploadReceipt;

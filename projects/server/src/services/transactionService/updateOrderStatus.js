const db = require("../../database");
const messages = require("../../helpers/messages");
const cronJob = require("../../helpers/cronJob");

const transactions = db["transaction"];

async function updateOrderStatus(id, status) {
  return await db.sequelize.transaction(async function (t) {
    await transactions.update(
      { id_status: status },
      { where: { id }, transaction: t }
    );
    console.log("CRON JOB", cronJob);
    if (status === 4) cronJob.startCronJob();
    return messages.success("Status successfully updated");
  });
}

module.exports = updateOrderStatus;

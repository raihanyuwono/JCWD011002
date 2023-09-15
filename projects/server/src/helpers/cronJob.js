const cron = require("node-cron");
const { transaction } = require("../database");

let scheduled;

const cronJob = async (userId) => {
  try {
    const transactions = await transaction.findAll({
      where: {
        id_status: 1,
        id_user: userId,
      },
    });

    for (const txn of transactions) {
      const expired = new Date(new Date() - 10 * 60 * 1000); // 10 minutes

      if (txn.created_at <= expired) {
        await txn.update({ id_status: 6 });
        console.log(`Updated transaction ID ${txn.id}.`);
        scheduled.stop();
        console.log("Cron job stopped.");
      } else {
        console.log(
          `TXN ${txn.id} with User ${txn.id_user} is not yet eligible for update.`
        );
      }
    }

    if (transactions.length === 0) {
      console.log("No transactions with id_status = 1 found, checking...");
    }
  } catch (error) {
    console.error("Error updating transactions:", error);
  }
};

module.exports = {
  startCronJob: (userId) => {
    scheduled = cron.schedule("*/30 * * * * *", () => {
      cronJob(userId);
    });
    console.log("Cron job running");
  },
};

// cron schedule
// "* * * * * *" 1 detik
// "*/15 * * * * *" 15 detik
// "*/30 * * * * *" 30 detik
// "* * * * *" 1 menit
// "*/5 * * * *" 5 menit
// "*/10 * * * *" 10 menit

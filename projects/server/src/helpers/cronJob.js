const cron = require("node-cron");
const { transaction } = require("../database");

const cronJob = async () => {
  try {
    const transactions = await transaction.findAll({
      where: {
        id_status: 1,
      },
    });

    for (const txn of transactions) {
      const expired = new Date(new Date() - 5 * 60 * 1000); // 5 menit

      if (txn.created_at <= expired) {
        await txn.update({ id_status: 6 });
        console.log(`Updated transaction ID ${txn.id}.`);
      } else {
        console.log(`Transaction ID ${txn.id} is not yet eligible for update.`);
      }
    }

    if (transactions.length === 0) {
      console.log("No transactions with id_status = 1 found, checking...");
    }
  } catch (error) {
    console.error("Error checking and updating transactions:", error);
  }
};

module.exports = {
  startCronJob: () => {
    cron.schedule("* * * * * *", () => {
      cronJob();
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

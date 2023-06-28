const cron = require("cron");

const start = () => {
  const job = new cron.CronJob("*/15 * * * * *", () => {
    console.log("Cron job executed!");
  });
  job.start();
};

module.exports = { start };

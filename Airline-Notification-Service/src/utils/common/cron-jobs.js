const cron = require("node-cron");
const { BookingService } = require("../../services/index");
function scheduleCron() {
  cron.schedule("*/30 * * * *", async () => {
    console.log("cron job");
    await BookingService.cancelOldBookings();
  });
}

module.exports = scheduleCron;

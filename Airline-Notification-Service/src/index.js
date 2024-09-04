const { ServerConfig, Logger } = require("./config/index");
const express = require("express");
const apiRoutes = require("./routes/index");
const app = express();
const Cron = require("./utils/common/cron-jobs");
const mailsender = require("./config/email-config");
const amqplib = require("amqplib");
const { EmailService } = require("./services/index");
async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    channel.consume("noti-queue", async (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);
      // const object = JSON.parse(Buffer.from(data).toString());
      const response = await EmailService.sendEmail(
        "airlinenotification09@gmail.com",
        object.recepientEmail,
        object.subject,
        object.text
      );
      console.log("send email to the booking user");
      channel.ack(data);
    });
  } catch (error) {}
}

app.use(express.json());
// to help express read json body
app.use(express.urlencoded({ extended: true }));
// to read url encodeed stuff
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server Listening on port ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server");
  await connectQueue();
  console.log("Connected to the queue");

  // try {
  //   console.log("hi");
  //   const response = await mailsender.sendMail({
  //     from: ServerConfig.GMAIL_EMAIL,
  //     to: "ishanmoorjmalani009@gmail.com",
  //     subject: "Service Test Working",
  //     text: "Airline Service Testing",
  //   });
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
});

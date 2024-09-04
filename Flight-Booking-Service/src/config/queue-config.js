const amqplib = require("amqplib");

let channel, connection;
async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data) {
  try {
    await channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(data)));
    console.log("Message sent to the queue successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendData,
  connectQueue,
};

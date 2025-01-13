const amqp = require("amqplib");

const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      console.log(`Received job with content ${message.content.toString()}`);
    });

    console.log("Waiting for messages...");
  } catch (error) {
    console.error(error);
  }
};

connect();

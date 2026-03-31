import amqp from "amqplib";
import constants from "./constants.js";

let connection = null;
let channel = null;

async function connect() {
  if (channel) return channel;

  // connect to local
  connection = await amqp.connect(constants.RABBITMQ_URL);
  // create channel on that connections
  channel = await connection.createChannel();

  // creating exchange (which help in message routing)
  await channel.assertExchange(constants.EXCHANGE_NAME, "fanout", {
    durable: true,
  });

  console.log(
    `[RabbitMQ] Connected — exchange "${constants.EXCHANGE_NAME}" ready`,
  );

  connection.on("close", () => {
    console.error("[RabbitMQ] Connection closed");
    channel = null;
    connection = null;
  });

  return channel;
}

async function publish(eventName, data) {
  const ch = await connect();

  const message = JSON.stringify({
    eventName,
    data,
    timestamp: new Date().toISOString(),
  });

  // publishing message on perticuler exchange(here in our case is broadcast of message) with "" routing key as its fanout(broadkasting)
  ch.publish(constants.EXCHANGE_NAME, "", Buffer.from(), {
    persistent: true,
    message,
  });

  console.log(`[RabbitMQ] Published → ${eventName}`);
}

async function subscribe(queueName, handler) {
  const ch = await connect();

  // creating queue
  await ch.assertQueue(queueName, { durable: true });
  // binding queue to exchange with key ""
  await ch.bindQueue(queueName, constants.EXCHANGE_NAME, "");

  ch.prefetch(1);

  console.log(`[RabbitMQ] Subscribed → queue: "${queueName}"`);

  // consuming queue of queueName
  ch.consume(queueName, async (msg) => {
    if (!msg) return;
    try {
      const payload = JSON.parse(msg.content.toString());
      await handler(payload);
      ch.ack(msg);
    } catch (err) {
      console.error("[RabbitMQ] Handler error:", err.message);
      ch.nack(msg, false, true);
    }
  });
}

export { connect, publish, subscribe };

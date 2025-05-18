import amqp from "amqplib";
import { sendEmailNotification } from "./resendMailer.js";
import { sendSmsNotification } from "./sendSmsNotification.js";

const rabbitMqUrl = process.env.RABBITMQ_URL;
const queueName = process.env.QUEUE_NAME;

export async function processNotifications() {
  let connection;
  try {
    connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    console.log("Waiting for messages in %s", queueName);
    channel.consume(
      queueName,
      async (message) => {
        if (message !== null) {
          const notificationData = JSON.parse(message.content.toString());
          const { type, messageText, email, phoneNumber } = notificationData;

          try {
            if (type === "email" && email) {
              await sendEmailNotification({
                to: email,
                subject: "You've got a new notification!",
                text: messageText,
              });
            } else if (type === "sms" && phoneNumber) {
              await sendSmsNotification(phoneNumber, messageText);
            }

            channel.ack(message);
          } catch (error) {
            console.error("Error sending notification:", error);
            channel.nack(message, false, true);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to process notifications:", error);
    if (connection) connection.close();
  }
}

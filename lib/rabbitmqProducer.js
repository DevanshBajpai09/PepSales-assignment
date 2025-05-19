import amqp from "amqplib"; 

const RABBITMQ_URL = process.env.RABBITMQ_URL;  
const QUEUE_NAME = process.env.QUEUE_NAME 


export async function sendNotificationToQueue(notificationData) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL); 
    const channel = await connection.createChannel(); 

    
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notificationData)), {
      persistent: true, 
    });

    console.log("Notification enqueued successfully!");

   
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Failed to enqueue notification:", error);
    throw new Error("Failed to enqueue notification");
  }
}

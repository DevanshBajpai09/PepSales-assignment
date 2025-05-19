
import twilio from 'twilio';


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
);


export const sendSmsNotification = async (phoneNumber, message) => {
  try {
    const messageResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: phoneNumber,
    });
    return messageResponse;
  } catch (error) {
    throw new Error('Failed to send SMS notification: ' + error.message);
  }
};

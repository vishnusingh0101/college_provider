const axios = require('axios');
require('dotenv').config();

async function sendWhatsAppMessage(phoneNumber, messageText) {
  const apiKey = process.env.INTERACT_API; 

  const payload = {
    phoneNumber: phoneNumber,
    callbackData: 'custom_message',
    type: 'text',
    text: {
      body: messageText
    }
  };

  try {
    const response = await axios.post(
      'https://api.interakt.ai/v1/public/message/',
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending message:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };
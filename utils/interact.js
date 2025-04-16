const axios = require('axios');
require('dotenv').config();

async function sendWhatsAppMessage(phoneNumber, name1, name2, time, duration, template, meetLink) {
  const apiKey = process.env.INTERACT_API;

  const payload = {
    countryCode: '91',
    phoneNumber: phoneNumber,
    callbackData: 'order-123',
    type: 'Template',
    template: {
      name: template,
      languageCode: 'en_US',
      headerValues: [],
      bodyValues: [name1, name2, time, duration, meetLink] 
    }
  };

  try {
    const response = await axios.post(
      'https://api.interakt.ai/v1/public/message/',
      payload,
      {
        headers: {
          Authorization: `Basic ${apiKey}`, 
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };
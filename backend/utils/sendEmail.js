const axios = require('axios');
require('dotenv').config();

async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.SENDINBLUE_API_KEY;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
      <h2 style="color: #2E86C1;">${subject}</h2>
      ${html.replace(/\n/g, '<br>')}
      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #999;">This is an automated message from College Connect.</p>
    </div>
  `;

  const payload = {
    sender: { name: "College Provider", email: "providerteam.in@gmail.com" },
    to: [{ email: to }],
    subject,
    htmlContent,
  };

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('📧 Email sent:', response.data.messageId || response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendEmail };
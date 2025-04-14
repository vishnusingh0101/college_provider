const axios = require('axios');
require('dotenv').config();

async function sendEmail(to, subject, content) {
  const apiKey = process.env.SENDINBLUE_API_KEY;

  // Wrap plain text content into basic HTML template
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
      <h2 style="color: #2E86C1;">${subject}</h2>
      <p>${content.replace(/\n/g, '<br>')}</p>
      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #999;">This is an automated message from College Connect.</p>
    </div>
  `;

  const payload = {
    sender: { name: "College Connect", email: "noreply@yourdomain.com" },
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
    console.error('❌ Error sending email:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendEmail };
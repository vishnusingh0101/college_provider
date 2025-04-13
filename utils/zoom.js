const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
const ZOOM_USER_ID = process.env.ZOOM_USER_ID; // Usually your Zoom email

// Create JWT token
const generateZoomToken = () => {
  const payload = {
    iss: ZOOM_API_KEY,
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
  };
  return jwt.sign(payload, ZOOM_API_SECRET);
};

const createZoomMeeting = async ({ topic, startTime, duration }) => {
  const token = generateZoomToken();

  const meetingConfig = {
    topic,
    type: 2, 
    start_time: new Date(startTime).toISOString(),
    duration, 
    timezone: 'Asia/Kolkata',
    settings: {
      host_video: true,
      participant_video: true,
      waiting_room: true,
      join_before_host: false,
    },
  };

  const response = await axios.post(
    `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`,
    meetingConfig,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.join_url;
};

module.exports = { createZoomMeeting };
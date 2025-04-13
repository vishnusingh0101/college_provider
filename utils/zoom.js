const axios = require('axios');
require('dotenv').config();

const {
    ZOOM_CLIENT_ID,
    ZOOM_CLIENT_SECRET,
    ZOOM_ACCOUNT_ID,
    ZOOM_USER_ID,
} = process.env;

const getAccessToken = async () => {
    const response = await axios.post(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
        {},
        {
            headers: {
                Authorization:
                    'Basic ' +
                    Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64'),
            },
        }
    );
    return response.data.access_token;
};

const createZoomMeeting = async ({ topic, startTime, duration }) => {
    const accessToken = await getAccessToken();

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
            approval_type: 0,
        },
    };

    const response = await axios.post(
        `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`,
        meetingConfig,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.join_url;
};

module.exports = { createZoomMeeting };
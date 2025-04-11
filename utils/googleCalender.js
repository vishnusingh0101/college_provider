const { google } = require('googleapis');
const moment = require('moment');
const path = require('path');
require('dotenv').config();

const keyPath = path.join(__dirname, '../config/service-account.json');
const credentials = require(keyPath);

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/calendar'],
  process.env.GOOGLE_IMPERSONATE_EMAIL // this should be a real Workspace user
);

const createGoogleMeet = async ({ startTime, endTime, title = 'Scheduled Call' }) => {
  await auth.authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: title,
    description: 'This is a scheduled open meeting.',
    start: {
      dateTime: moment(startTime).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: moment(endTime).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    // attendees: [] // ← remove or leave it out completely
  };

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
};

module.exports = { createGoogleMeet };
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
  ['https://www.googleapis.com/auth/calendar']
);

const createGoogleMeet = async ({ startTime, endTime, user, participant }) => {
  await auth.authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: 'Scheduled Call',
    description: `Call between ${user.name} and ${participant.name}`,
    start: {
      dateTime: moment(startTime).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: moment(endTime).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: user.email },
      { email: participant.email }
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
};

module.exports = { createGoogleMeet };
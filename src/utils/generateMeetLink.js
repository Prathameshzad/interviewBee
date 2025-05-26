// utils/generateMeetLink.js

export async function generateMeetLink(accessToken) {
  const event = {
    summary: 'Meeting via Google Meet',
    start: {
      dateTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: new Date(Date.now() + 35 * 60 * 1000).toISOString(), // 30-minute duration
      timeZone: 'Asia/Kolkata',
    },
    conferenceData: {
      createRequest: {
        requestId: String(Date.now()),
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error('Google Calendar API Error:', data);
    throw new Error(data.error?.message || 'Failed to create event');
  }

  return data.conferenceData?.entryPoints?.[0]?.uri;
}

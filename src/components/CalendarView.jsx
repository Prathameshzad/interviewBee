'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import './CalendarCustom.css'; // custom overrides

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scheduledMeetings = useSelector((state) => state.meeting.scheduledMeetings);

  const formattedSelected = format(selectedDate, 'yyyy-MM-dd');
  const meetingsForDate = scheduledMeetings.filter(m => m.date === formattedSelected);

  return (
    <div className="p-4 mt-6 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Scheduled Meetings Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) =>
          view === 'month' ? 'calendar-tile' : null
        }
        className="rounded-lg shadow-md bg-white text-black"
      />

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Meetings on {formattedSelected}:</h3>
        {meetingsForDate.length > 0 ? (
          meetingsForDate.map((m, idx) => (
            <p key={idx}><a href={m.link} target="_blank" className="text-blue-600 underline">{m.link}</a></p>
          ))
        ) : (
          <p>No meetings scheduled.</p>
        )}
      </div>
    </div>
  );
}

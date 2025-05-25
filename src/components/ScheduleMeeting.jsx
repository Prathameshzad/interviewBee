'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScheduledMeeting } from '../redux/meetingSlice';
import generateMeetLink from '../utils/generateMeetLink';
import { format } from 'date-fns';

export default function ScheduleMeeting() {
  const dispatch = useDispatch();

  const [generatedLink, setGeneratedLink] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateLink = () => {
    const link = generateMeetLink();
    setGeneratedLink(link);
    setMessage('✅ Link generated! Now select date & time to schedule.');
  };

  const handleSchedule = () => {
    if (!generatedLink) {
      setMessage('⚠️ Please generate a link first.');
      return;
    }
    if (!date || !time) {
      setMessage('⚠️ Please select both date and time.');
      return;
    }

    // Convert date & time to local Date object
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const localDateTime = new Date(year, month - 1, day, hours, minutes);

    const now = new Date();
    if (localDateTime < now) {
      setMessage('⚠️ Cannot schedule a meeting in the past.');
      return;
    }

    const formattedDate = format(localDateTime, 'yyyy-MM-dd');
    dispatch(addScheduledMeeting({ date: formattedDate, link: generatedLink }));

    setMessage(`✅ Meeting scheduled for ${formattedDate}`);
    setDate('');
    setTime('');
    setGeneratedLink(null);
  };

  return (
    <div className="bg-black text-yellow-400 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 border-b border-yellow-500 pb-2">
        📅 Schedule a Meeting
      </h2>

      <button
        className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-300 transition duration-300 mb-4"
        onClick={handleGenerateLink}
      >
        🔗 Generate Meet Link
      </button>

      {generatedLink && (
        <p className="mb-4 text-yellow-300 break-words">
          Generated Link:{' '}
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-yellow-500 hover:text-yellow-300"
          >
            {generatedLink}
          </a>
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="date"
          className="bg-gray-900 border border-yellow-500 text-yellow-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="bg-gray-900 border border-yellow-500 text-yellow-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            generatedLink
              ? 'bg-yellow-400 text-black hover:bg-yellow-300'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          } transition duration-300`}
          onClick={handleSchedule}
          disabled={!generatedLink}
        >
          📌 Schedule
        </button>
      </div>

      {message && (
        <p className="text-sm text-yellow-300 italic mt-2">{message}</p>
      )}
    </div>
  );
}

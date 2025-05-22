'use client';

import { useSession, signOut } from 'next-auth/react';
import ScheduleMeeting from '../../components/ScheduleMeeting';
import CalendarView from '../../components/CalendarView';

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-yellow-400">
        <p className="text-lg font-semibold">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👋 Welcome, {session.user.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition duration-300"
        >
          🚪 Sign out
        </button>
      </div>

      <div className="space-y-8">
        <ScheduleMeeting />
        <CalendarView />
      </div>
    </div>
  );
}

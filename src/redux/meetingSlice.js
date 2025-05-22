// src/redux/meetingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  instantLink: null,
  scheduledMeetings: [], // [{ date: 'YYYY-MM-DD', link: '...' }]
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setInstantLink: (state, action) => {
      state.instantLink = action.payload;
    },
    addScheduledMeeting: (state, action) => {
      state.scheduledMeetings.push(action.payload); // { date, link }
    },
  },
});

export const { setInstantLink, addScheduledMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;

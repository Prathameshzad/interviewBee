'use client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import meetingReducer from './meetingSlice';

const store = configureStore({
  reducer: {
    meeting: meetingReducer,
  },
});

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

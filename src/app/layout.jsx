// src/app/layout.jsx
import './globals.css';
import { ReduxProvider } from '../redux/store';
import SessionProvider from '../utils/SessionProvider';

export const metadata = {
  title: 'Meeting Scheduler',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-yellow-400">
        <SessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

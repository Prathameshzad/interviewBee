import './globals.css';
import { ReduxProvider } from '../redux/store';
import { getServerSession } from 'next-auth';
import SessionProvider from '../utils/SessionProvider';

export const metadata = {
  title: 'Meeting Scheduler',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ReduxProvider>{children}</ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import './globals.css';
import { MyProvider } from './context/contex';

export const metadata = {
  title: 'FullParty Reservaciones',
  description: 'Reservaciones, eventos y mucho mas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <MyProvider>
          <div className='w-full'>{children}</div>
        </MyProvider>
      </body>
    </html>
  );
}

import Sidebar from '@/components/Sidebar';

// export const metadata = {
//   title: 'dashboard',
//   description: 'Agendar eventos y mucho mas',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <Sidebar />
      </div>
      <div className='grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
    </div>
  );
}

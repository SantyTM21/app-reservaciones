import { auth } from '@/auth';
import { NuevaReservacion } from '@/components/button';
import Admin from '@/components/reservaciones/Admin';
import User from '@/components/reservaciones/User';

export default async function page() {
  const session = await auth();
  // console.log(session);
  const email = session?.user?.email;
  return (
    <>
      {email === 'admin@gmail.com' ? (
        <div>
          <h2 className='col-span-2 text-2xl font-bold mb-4'>Todas las reservaciones</h2>
          <Admin />
        </div>
      ) : (
        <div className='relative'>
          <h2 className='col-span-2 text-2xl font-bold mb-4'>Mis reservaciones</h2>
          <User />
          <div className='hidden fixed top-4 right-4 z-10 md:block'>
            <NuevaReservacion />
          </div>
          <div className='block fixed bottom-4 right-4 z-10 md:hidden'>
            <NuevaReservacion />
          </div>
        </div>
      )}
    </>
  );
}

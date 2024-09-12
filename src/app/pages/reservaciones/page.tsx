import { auth } from '@/auth';
import Admin from '@/components/reservaciones/Admin';
import User from '@/components/reservaciones/User';

export default async function page() {
  const session = await auth();
  const email = session?.user?.email;
  return (
    <>
      Reservaciones
      {email === 'admin@gmail.com' ? <Admin /> : <User />}
    </>
  );
}

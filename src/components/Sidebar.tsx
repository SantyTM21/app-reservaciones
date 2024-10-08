import Link from 'next/link';
import { auth, signOut } from '../auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import { ButtonLogo } from './button';
import NavLinks from './nav-links';

export default async function Sidebar() {
  const session = await auth();
  const email = session?.user?.email;
  const isEmailAdmin = email === 'admin@gmail.com';
  return (
    <>
      <div className='flex h-full flex-col px-3 py-4 md:px-2'>
        <Link
          className='mb-2 flex h-20  items-center justify-center rounded-md bg-indigo-400 p-4 md:h-40'
          href='/'
        >
          <div className='w-32 text-white md:w-40'>
            <ButtonLogo />
          </div>
        </Link>
        <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
          <NavLinks email={isEmailAdmin} />
          <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
              <PowerIcon className='w-6' />
              <div className='hidden md:block bg-transparent'>Cerrar sesión</div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

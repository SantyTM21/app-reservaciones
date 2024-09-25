import {
  ArrowRightCircleIcon,
  ArrowRightEndOnRectangleIcon,
  PlusIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { UrlObject } from 'url';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-indigo-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}

export function NuevoServicio() {
  return (
    <Link
      href='/pages/reservaciones/nueva-res'
      className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <span className='hidden md:block'>Nueva Reservación</span>{' '}
      <PlusIcon className='h-5 md:ml-4' />
    </Link>
  );
}

export function NuevaReservacion() {
  return (
    <Link href={`/pages/reservaciones/nueva-res`}>
      <span className='flex gap-1 bg-indigo-500 text-white px-2 py-1 rounded-lg'>
        <PlusIcon className='sh-5 w-5 fond-bold' /> Nueva Reservación
      </span>
    </Link>
  );
}
export function ActualizarReservacion({ id }: { id: number }) {
  return (
    <Link href={`/pages/reservaciones/${id}/edit`} className='w-40'>
      <ArrowRightCircleIcon className='sh-5 w-5 text-white fond-bold' />
    </Link>
  );
}

export function ButtonLogin() {
  return (
    <Link href='/login' className='flex items-center gap-2' prefetch={false}>
      <ArrowRightEndOnRectangleIcon className='h-5 w-5' />
      Iniciar Sesión
    </Link>
  );
}

export function ButtonRegister() {
  return (
    <Link href='/registro' className='flex items-center gap-2' prefetch={false}>
      <UserPlusIcon className='h-5 w-5' />
      Crear Cuenta
    </Link>
  );
}

export function ButtonLogo() {
  return <Image src='/img/logo.png' alt='logo' width={300} height={100} />;
}

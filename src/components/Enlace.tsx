'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UrlObject } from 'url';

export default function Enlace(props: {
  href: string | UrlObject;
  path: string | undefined;
  nombre: string | undefined;
}) {
  const path = usePathname();

  return (
    <Link
      href={props.href}
      className={`${
        path === props.href
          ? 'bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none'
          : ''
      } flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50`}
    >
      <div className='grid place-items-center mr-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          aria-hidden='true'
          className='h-5 w-5'
        >
          <path fillRule='evenodd' d={props.path} clipRule='evenodd' />
        </svg>
      </div>
      {props.nombre}
    </Link>
  );
}

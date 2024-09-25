'use client';

import {
  UserGroupIcon,
  BanknotesIcon,
  InboxStackIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

const links = [
  { name: 'Servicios', href: '/pages/configuracion/servicios', icon: InboxStackIcon },
  {
    name: 'Tipo de Alquiler',
    href: '/pages/configuracion/tipo-alquiler',
    icon: BanknotesIcon,
  },
  { name: 'Administrar Usuarios', href: '/pages/configuracion/usuarios', icon: UserGroupIcon },
  { name: 'Respaldar BD', href: '#', icon: ShieldCheckIcon },
];

export default function NavLinksConfig() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-indigo-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
            )}
          >
            <LinkIcon className='w-6' />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

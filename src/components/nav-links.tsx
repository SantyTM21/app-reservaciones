'use client';

import {
  UserCircleIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const linksAdmin = [
  { name: 'Inicio', href: '/pages', icon: HomeIcon },
  { name: 'Reservaciones', href: '/pages/reservaciones', icon: BuildingStorefrontIcon },
  {
    name: 'Configuración',
    href: '/pages/configuracion',
    icon: WrenchScrewdriverIcon,
  },
  { name: 'Perfil', href: '/pages/perfil', icon: UserCircleIcon },
];
const linksUsers = [
  { name: 'Inicio', href: '/pages', icon: HomeIcon },
  { name: 'Reservaciones', href: '/pages/reservaciones', icon: BuildingStorefrontIcon },
  { name: 'Perfil', href: '/pages/perfil', icon: UserCircleIcon },
];

export default function NavLinks(email: any) {
  const pathname = usePathname();
  // console.log('email', email);
  const links = email.email === true ? linksAdmin : linksUsers;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-indigo-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-indigo-200 text-blue-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Button } from '../button';
import { editarPerfil } from '@/app/lib/actions';

export default function PerfilForm(usuario: any) {
  const user = usuario;
  return (
    <form className='space-y-3' autoComplete='off' action={editarPerfil}>
      <div className='flex-1 rounded-lg px-6 pb-4 pt-8 font-medium'>
        <h1 className={`mb-3 text-2xl`}>Edita tu perfil </h1>
        <div className='w-full'>
          <div>
            <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='email'>
              Nombre
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                id='nombre'
                type='text'
                name='nombre'
                required
                defaultValue={user.nombre}
              />
            </div>
          </div>
          <div>
            <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='email'>
              Apellido
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                id='apellido'
                type='text'
                name='apellido'
                required
                defaultValue={user.apellido}
              />
            </div>
          </div>

          <div>
            <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='email'>
              Email
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                id='email'
                type='email'
                name='email'
                required
                value={user.email}
              />
            </div>
          </div>
          <div>
            <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='email'>
              telefono
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                id='telefono'
                type='text'
                name='telefono'
                required
                defaultValue={user.telefono}
              />
            </div>
          </div>
        </div>
        <Button className='mt-4 w-full'>
          Actualiza tu perfil
          <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
        </Button>
      </div>
    </form>
  );
}

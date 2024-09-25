import { fetchAllUsers } from '@/app/lib/data';
import { formatoFecha } from '@/app/lib/utils';

import { CheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
export default async function page() {
  const usuarios = await fetchAllUsers();
  const users = Object.values(usuarios);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>Administrar usuarios:</h1>
      <table className='table-auto w-full border-collapse'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='px-4 py-2'>Nombre</th>
            <th className='px-4 py-2'>Apellido</th>
            <th className='px-4 py-2'>Teléfono</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Fecha Registro</th>
            <th className='px-4 py-2'>Estado</th>
            <th className='px-4 py-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='border-b even:bg-gray-50 hover:bg-gray-100'>
              <td className='px-4 py-2'>{user.nombre}</td>
              <td className='px-4 py-2'>{user.apellido}</td>
              <td className='px-4 py-2'>{user.telefono}</td>
              <td className='px-4 py-2'>{user.email}</td>
              <td className='px-4 py-2'>{formatoFecha(user.fecha_registro)}</td>
              <td className='px-4 py-2'>
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    user.rol_id === 2 ? 'bg-green-100 text-blue-800' : 'bg-blue-100 text-red-800'
                  }`}
                >
                  {user.rol_id === 2 ? 'Libre' : 'Bloqueado'}
                </span>
              </td>
              <td className='px-4 py-2'>
                <button className='flex justify-center items-center gap-2'>
                  {user.rol_id === 2 ? (
                    <CheckIcon className='h-5 w-5 text-green-500' />
                  ) : (
                    <NoSymbolIcon className='h-5 w-5 text-red-500' />
                  )}
                  <span className='sr-only'>
                    {user.rol_id === 2 ? 'Bloquear' : 'Desbloquear'} usuario
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

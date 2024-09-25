'use client';

import { usuarios } from '@/app/lib/placeholder-data';

export default function UsersTable({ usuarios: [] }) {
  const users = usuarios;
  function toggleUserStatus(id: number): void {}

  function toggleUserrol_id(id: number): void {}

  return (
    <div>
      <table className='table-auto w-full border-collapse'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='px-4 py-2'>Nombre</th>
            <th className='px-4 py-2'>Apellido</th>
            <th className='px-4 py-2'>Teléfono</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Fecha Registro</th>
            <th className='px-4 py-2'>Rol</th>
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
              <td className='px-4 py-2'>{user.fecha_registro}</td>
              <td className='px-4 py-2'>
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    user.rol_id === 1 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.rol_id === 1 ? 'Admin' : 'User'}
                </span>
              </td>
              <td className='px-4 py-2'>
                <button
                  className='ghost icon-button bg-transparent hover:bg-gray-200 p-1 rounded'
                  onClick={() => toggleUserrol_id(user.id)}
                >
                  {user.rol_id === 2 ? (
                    <svg className='h-4 w-4 fill-current text-red-500'>
                      {/* Icono de bloqueo cerrado */}
                      <path d='...' />
                    </svg>
                  ) : (
                    <svg className='h-4 w-4 fill-current text-green-500'>
                      {/* Icono de bloqueo abierto */}
                      <path d='...' />
                    </svg>
                  )}
                  <span className='sr-only'>
                    {user.rol_id === 1 ? 'Bloquear' : 'Desbloquear'} usuario
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

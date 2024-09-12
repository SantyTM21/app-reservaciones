import { Suspense } from 'react';
import { fetchUsuarioByMail } from '../lib/data';
import { Carousel } from 'flowbite-react';
export default async function page() {
  const usuario = await fetchUsuarioByMail();
  return (
    <div>
      <h1 className='text-3xl'>FullParty reservaciones</h1>
      <h1 className='text-2xl'>
        Bienvenido {usuario.nombre} {usuario.apellido}
      </h1>
      <div className='w-800 h-96'>
        <Carousel />
      </div>
      {/* ver reservas */}
      {/* {usuario?.map((user) => (
        <div key={user.id}>
          <p>{user.email}</p>
          <p>{user.password}</p>
          <p>{user.rol_id}</p>
          <p>{user.id}</p>
          <p>{user.nombre}</p>
          <p>{user.apellido}</p>
        </div>
      ))} */}
    </div>
  );
}

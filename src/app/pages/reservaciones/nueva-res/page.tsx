// import { fetchServicios } from '../../lib/data';

import NuevaReservacion from '@/components/reservaciones/NuevaReservacion';
import { fetchAlquileres, fetchServicios } from '@/app/lib/data';
export default async function page() {
  const [servicios, alquileres] = await Promise.all([fetchServicios(), fetchAlquileres()]);
  // console.log(alquileres);
  // console.log('servicios', servicios);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className='max-w-2xl mx-auto'>
      {' '}
      <h2 className='text-2xl font-semibold'>Nueva Reservación</h2>
      <NuevaReservacion servicios={servicios} alquileres={alquileres} />
    </div>
  );
}

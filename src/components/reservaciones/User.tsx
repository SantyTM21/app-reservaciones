import { fetchReservacionesUser } from '@/app/lib/data';
import { ActualizarReservacion } from '../button';

export default async function User() {
  const reservaciones = await fetchReservacionesUser();
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {reservaciones?.map((reservacion) => (
        <div key={reservacion.id} className='bg-white shadow-md rounded-lg overflow-hidden p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-4'>
            {/* Primera columna */}
            <div>
              <h3 className='text-lg font-semibold mb-2'>Reservación N: {reservacion.id}</h3>
              <p>
                <span className='text-gray-500 mb-4'>Estado: </span>
                <span
                  className={`${
                    reservacion.estado === 'Cancelada'
                      ? 'text-red-500'
                      : reservacion.estado === 'Aprobada'
                      ? 'text-green-500'
                      : 'text-gray-500'
                  } font-semibold`}
                >
                  {reservacion.estado}
                </span>
              </p>
              <p>
                <span className='text-gray-500 mb-4'>Usuario: </span>
                {reservacion.usuario}
              </p>
            </div>

            {/* Segunda columna */}
            <div>
              <p>
                <span className='text-primary font-semibold mb-2'>Fecha inicio: </span>
                {new Date(reservacion.fecha_inicio).toLocaleDateString()}
              </p>
              <p>
                <span className='text-primary font-semibold mb-2'>Fecha fin: </span>
                {new Date(reservacion.fecha_fin).toLocaleDateString()}
              </p>
              <p>
                <span className='text-primary font-semibold mb-2'>Tipo alquiler: </span>
                {reservacion.alquiler}
              </p>
            </div>

            <div className='flex justify-center items-center'>
              <div className='bg-indigo-400 rounded-lg p-1 w-full'>
                <ActualizarReservacion id={reservacion.id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

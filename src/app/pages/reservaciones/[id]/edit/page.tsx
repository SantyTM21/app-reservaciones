import { fetchReservacionById, fetchServiciosByReservacion } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { formatoFecha, formatoMoneda } from '@/app/lib/utils';
import BotonCancelar from '@/components/reservaciones/BotonCancelar';
import { auth } from '@/auth';
import BotonAprobar from '@/components/reservaciones/BotonAprobar';

export const metadata: Metadata = {
  title: 'Aprobar reservación',
};

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const session = await auth();
  const email = session?.user?.email;

  const [reservacion, servicios] = await Promise.all([
    fetchReservacionById(id),
    fetchServiciosByReservacion(id),
  ]);
  console.log(reservacion);
  console.log(servicios);

  if (!reservacion) {
    notFound();
  }

  return (
    <main>
      <h1 className='text-3xl font-bold'>Reservación N° {reservacion.id}</h1>
      <h2 className='text-2xl font-semibold'>Resumen</h2>
      <p>
        <b>Fecha y hora de inicio: </b>
        {formatoFecha(reservacion?.fecha_inicio)} {reservacion.hora_inicio}
      </p>
      <p>
        <b>Fecha y hora de fin: </b>
        {formatoFecha(reservacion?.fecha_fin)} {reservacion.hora_fin}
      </p>
      <p>
        <b>Tipo de alquiler: </b> {reservacion.alquiler}
      </p>
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
      Detalle de los servicios:
      <table className='hidden min-w-full text-gray-900 md:table'>
        <thead className='rounded-lg text-left text-sm font-normal'>
          <tr>
            {/* <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
              Imagen
            </th> */}
            <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
              Nombre
            </th>
            <th scope='col' className='px-3 py-5 font-medium'>
              Precio
            </th>
            <th scope='col' className='px-3 py-5 font-medium'>
              Cantidad
            </th>
            <th scope='col' className='px-3 py-5 font-medium'>
              Total
            </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {servicios?.map((servicio) => (
            <tr
              key={servicio.id}
              className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
            >
              <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                <p>{servicio.nombre}</p>
              </td>
              <td className='whitespace-nowrap px-3 py-3'>{formatoMoneda(servicio.precio)}</td>
              <td className='whitespace-nowrap px-3 py-3'>{servicio.cantidad}</td>
              <td className='whitespace-nowrap px-3 py-3'>{formatoMoneda(servicio.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <b>Total: {formatoMoneda(reservacion.total)}</b>
      </p>
      <div className='flex justify-center gap-2'>
        <BotonCancelar id={reservacion.id} disable={reservacion.estado == 'Cancelada'} />
        {email === 'admin@gmail.com' && (
          <BotonAprobar id={reservacion.id} disable={reservacion.estado == 'Aprobada'} />
        )}
      </div>
    </main>
  );
}

/* eslint-disable @next/next/no-img-element */
import NuevoServicio from '@/components/configuracion/servicio/NuevoServicio';
import EditarServicio from '@/components/configuracion/servicio/EditarServicio';

import { fetchServicios } from '../../../lib/data';
import { TrashIcon } from '@heroicons/react/24/outline';
export default async function page() {
  const serviciosDesordenados = await fetchServicios();
  const servicios = serviciosDesordenados.sort((a, b) => a.id - b.id);
  return (
    <div className='relative container mx-auto px-4 py-8 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {servicios.map((servicio) => (
          <div key={servicio.id} className='bg-white shadow-md rounded-lg overflow-hidden'>
            <div className='p-4'>
              <img
                src={servicio.urlimg}
                alt={servicio.nombre}
                className='w-full h-40 object-cover mb-4'
              />
              <h3 className='text-lg font-semibold mb-2'>{servicio.nombre}</h3>
              <p className='text-gray-500 mb-4'>{servicio.detalle}</p>
              <div className='flex justify-between items-center'>
                <span className='text-primary font-semibold'>${servicio.precio}</span>
                <span className='text-gray-500'>En stock: {servicio.stock}</span>
              </div>
            </div>
            <div className='border-t px-4 py-3 flex justify-end gap-2'>
              <EditarServicio {...servicio} />
              <button>
                <TrashIcon className='h-5 w-5 text-gray-500' />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='fixed top-4 right-4 z-10'>
        <NuevoServicio />
      </div>
    </div>

    // <div className='relative'>
    //   <h1 className='text-3xl font-bold'>Servicio</h1>

    //   <div className='py-3'>
    //     {servicios.map((servicio) => (
    //       <div className='text-2xl' key={servicio.id}>
    //         <span className='font-semibold'>Nombre: </span> {servicio.nombre}{' '}
    //         <span className='font-semibold'>Detalle: </span> {servicio.detalle}{' '}
    //         <span className='font-semibold'>Precio:</span> ${servicio.precio}
    //         <span className='font-semibold'>Stock:</span> ${servicio.stock}
    //         <img src={servicio.urlimg} alt={servicio.urlimg} width={100} height={100} />
    //       </div>
    //     ))}
    //   </div>
    //   <div className='absolute bottom-4 right-4'>
    //     <NuevoServicio />
    //   </div>
    // </div>
  );
}

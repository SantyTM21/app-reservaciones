import NuevoAlquiler from '@/components/configuracion/alquiler/NuevoAlquiler';
import { fetchAlquileres } from '../../../lib/data';
import { Button } from '@/components/button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import EditarServicio from '@/components/configuracion/alquiler/EditarAlquiler';
export default async function page() {
  const alquileresDesordenados = await fetchAlquileres();
  const alquileres = alquileresDesordenados.sort((a, b) => a.id - b.id);
  return (
    <div className='container mx-auto px-4 py-8 relative'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {alquileres.map((alquiler) => (
          <div
            key={alquiler.id}
            className='bg-white rounded-lg shadow-md p-4 flex justify-between items-center'
          >
            <div>
              <h3 className='text-lg font-medium'>{alquiler.nombre}</h3>
              <p className='text-gray-500'>${alquiler.precio}</p>
            </div>
            <div className='flex gap-2'>
              <EditarServicio {...alquiler} />
              {/* <button className='text-blue-500'>
                <PencilIcon className='h-5 w-5' />
                <span className='sr-only'>Edit</span>
              </button> */}
              <button className='text-red-500'>
                <TrashIcon className='h-5 w-5' />
                <span className='sr-only'>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='fixed top-4 right-4 z-10'>
        {/* <PlusIcon className="h-6 w-6" /> */}
        <NuevoAlquiler />
        {/* <span className='sr-only'>New alquiler</span> */}
      </div>
    </div>
  );
}

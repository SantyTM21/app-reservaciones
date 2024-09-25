'use client';

import { nuevoAlquiler } from '@/app/lib/actions';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function NuevoServicio() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Para indicar el estado de carga

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar que se recargue la página
    setLoading(true); // Mostrar indicador de carga

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      // Llamar a la función para enviar los datos
      await nuevoAlquiler(formData);

      // Cerrar el modal si se envía exitosamente
      setOpenModal(false);
    } catch (error) {
      console.error('Error al guardar el alquiler:', error);
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='flex items-center gap-2 p-3 rounded-full shadow-md font-bold text-white bg-indigo-500 transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 active:bg-indigo-600'
      >
        <PlusIcon className='h-5 w-5' /> Nuevo Alquiler
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Nuevo Alquiler</Modal.Header>
        <Modal.Body>
          <form className='space-y-3' autoComplete='off' onSubmit={handleSubmit}>
            <div className='flex-1 rounded-lg px-6 pb-4 pt-8 font-medium'>
              <h1 className={`mb-3 text-2xl`}>Crea un nuevo alquiler </h1>
              <div className='w-full'>
                <div>
                  <label className='mb-2 mt-5 block  font-medium text-gray-900' htmlFor='nombre'>
                    Nombre del Alquiler
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='nombre'
                      type='text'
                      name='nombre'
                      required
                      placeholder='Ingresa el nombre del alquiler'
                    />
                  </div>
                </div>
                <div>
                  <label className='mb-2 mt-5 block  font-medium text-gray-900' htmlFor='precio'>
                    Precio del Alquiler
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='precio'
                      type='number'
                      step={'.01'}
                      name='precio'
                      required
                      placeholder='Ingresa el precio del alquiler'
                    />
                  </div>
                </div>
              </div>
              <div className='flex rounded-lg gap-2 content-center justify-center px-6 pb-4 pt-8 font-medium'>
                <Button type='submit' className='mt-4 w-[40%]' disabled={loading} color='indigo'>
                  {loading ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button className='mt-4 w-[40%]' color='slate' onClick={() => setOpenModal(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

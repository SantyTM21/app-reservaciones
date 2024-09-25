'use client';

import { editarAlquiler } from '@/app/lib/actions';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function EditarServicio(alquiler: any) {
  const alq = alquiler;

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Para indicar el estado de carga

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar que se recargue la página
    setLoading(true); // Mostrar indicador de carga

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      // Llamar a la función para enviar los datos
      await editarAlquiler(formData);

      // Cerrar el modal si se envía exitosamente
      setOpenModal(false);
    } catch (error) {
      console.error('Error al editar el alquiler:', error);
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className='text-blue-500'>
        <PencilIcon className='h-5 w-5' />
        <span className='sr-only'>Edit</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Nuevo Alquiler</Modal.Header>
        <Modal.Body>
          <form className='space-y-3' autoComplete='off' onSubmit={handleSubmit}>
            <div className='flex-1 rounded-lg px-6 pb-4 pt-8 font-medium'>
              <h1 className={`mb-3 text-2xl`}>Crea un nuevo alquiler </h1>
              <div className='w-full'>
                <input type='text' name='id' hidden value={alq.id} />
                <div>
                  <label
                    className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                    htmlFor='nombre'
                  >
                    Nombre del Alquiler
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='nombre'
                      type='text'
                      name='nombre'
                      required
                      defaultValue={alq.nombre}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                    htmlFor='precio'
                  >
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
                      defaultValue={alq.precio}
                    />
                  </div>
                </div>
              </div>
              <div className='flex rounded-lg gap-2 content-center justify-center px-6 pb-4 pt-8 font-medium'>
                <button
                  type='submit'
                  className='mt-4 w-[40%] bg-indigo-500 rounded py-2 text-white'
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <Button className='mt-4 w-[40%]' color='gray' onClick={() => setOpenModal(false)}>
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

'use client';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { nuevoServicio } from '@/app/lib/actions';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from 'flowbite-react';

export default function NuevoServicio() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Para indicar el estado de carga

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar recarga de la página
    setLoading(true); // Mostrar indicador de carga

    if (!inputFileRef.current?.files) {
      console.error('No se seleccionó ningún archivo');
      setLoading(false);
      return;
    }

    const file = inputFileRef.current.files[0];

    const formData = new FormData(event.target as HTMLFormElement);
    try {
      // Intentar cargar la imagen
      const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      // Verificar si la subida fue exitosa
      if (!response.ok) {
        throw new Error('Error al cargar la imagen');
      }

      // Obtener el resultado de la subida de imagen
      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
      formData.append('urlImg', newBlob.url);

      // Si la imagen se subió correctamente, proceder con el envío del formulario

      // Intentar enviar los datos del formulario
      try {
        await nuevoServicio(formData);
        setOpenModal(false); // Cerrar el modal tras el éxito
      } catch (error) {
        console.error('Error al guardar el nuevo servicio:', error);
      }
    } catch (error) {
      console.error('Error durante la carga del archivo:', error);
    } finally {
      setLoading(false); // Finalizar estado de carga sin importar el resultado
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='flex items-center gap-2 p-3 rounded-full shadow-md font-bold text-white bg-indigo-500 transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 active:bg-indigo-600'
      >
        <PlusIcon className='h-5 w-5' /> Nuevo Servicio
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Nuevo Servicio</Modal.Header>
        <Modal.Body>
          <form className='space-y-3' autoComplete='off' onSubmit={handleSubmit}>
            <div className='flex-1 rounded-lg px-6 pb-4 pt-8 font-medium'>
              <h1 className={`mb-3 text-2xl`}>Crea un nuevo servicio </h1>
              <div className='w-full'>
                <div>
                  <label className='mb-3 mt-5 block font-medium text-gray-900' htmlFor='nombre'>
                    Nombre del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='nombre'
                      type='text'
                      name='nombre'
                      required
                      placeholder='Ingresa el nombre del servicio'
                    />
                  </div>
                </div>
                <div>
                  <label className='mb-3 mt-5 block font-medium text-gray-900' htmlFor='detalle'>
                    Detalle del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='detalle'
                      type='text'
                      name='detalle'
                      required
                      placeholder='Ingresa el detalle del servicio'
                    />
                  </div>
                </div>
                <div>
                  <label className='mb-3 mt-5 block font-medium text-gray-900' htmlFor='precio'>
                    Precio del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='precio'
                      type='number'
                      step={'.01'}
                      name='precio'
                      required
                      placeholder='Ingresa precio'
                    />
                  </div>
                </div>
                <div>
                  <label className='mb-3 mt-5 block font-medium text-gray-900' htmlFor='stock'>
                    Stock del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                      id='stock'
                      type='number'
                      name='stock'
                      required
                      placeholder='Ingresa el stock'
                    />
                  </div>
                </div>
              </div>
              <div>
                <input ref={inputFileRef} type='file' accept='image/*' required />
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

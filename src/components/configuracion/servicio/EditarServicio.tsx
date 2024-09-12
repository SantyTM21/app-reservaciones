/* eslint-disable @next/next/no-img-element */
'use client';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { editarServicio } from '@/app/lib/actions';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from 'flowbite-react';
import { set } from 'zod';

export default function EditarServicio(servicio: any) {
  const srv = servicio;
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Para indicar el estado de carga

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar recarga de la página
    setLoading(true); // Mostrar indicador de carga

    if (!inputFileRef.current?.files) {
      console.error('No se seleccionó ningún archivo');
      setLoading(false);
      return;
    }

    const file = inputFileRef.current.files[0];

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

      // Si la imagen se subió correctamente, proceder con el envío del formulario
      const formData = new FormData(event.target as HTMLFormElement);

      // Intentar enviar los datos del formulario
      try {
        await editarServicio(formData);
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
      <button onClick={() => setOpenModal(true)} className='text-blue-500'>
        <PencilIcon className='h-5 w-5' />
        <span className='sr-only'>Edit</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Editar Servicio</Modal.Header>
        <Modal.Body>
          <form className='space-y-3' autoComplete='off' onSubmit={handleSubmit}>
            <div className='flex-1 rounded-lg bg-green-400 px-6 pb-4 pt-8 font-medium'>
              <h1 className={`mb-3 text-2xl`}>Crea un nuevo servicio </h1>
              <input type='text' name='id' hidden defaultValue={srv.id} />
              <div className='w-full'>
                <div>
                  <label
                    className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                    htmlFor='nombre'
                  >
                    Nombre del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 defaultValue={srv.nombre}'
                      id='nombre'
                      type='text'
                      name='nombre'
                      required
                      defaultValue={srv.nombre}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                    htmlFor='detalle'
                  >
                    Detalle del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 defaultValue={srv.nombre}'
                      id='detalle'
                      type='text'
                      name='detalle'
                      required
                      defaultValue={srv.detalle}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                    htmlFor='precio'
                  >
                    Precio del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 defaultValue={srv.nombre}'
                      id='precio'
                      type='number'
                      step={'.01'}
                      name='precio'
                      required
                      defaultValue={srv.precio}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                    htmlFor='stock'
                  >
                    Stock del Servicio
                  </label>
                  <div className='relative'>
                    <input
                      className='peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 defaultValue={srv.nombre}'
                      id='stock'
                      type='number'
                      name='stock'
                      required
                      defaultValue={srv.stock}
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <img src={srv.urlimg} alt='servicio' className='w-32 h-32 py-3' />
                <div>
                  <input ref={inputFileRef} type='file' accept='image/*' />
                  <input type='text' name='urlimg' id='urlimg' hidden value={blob?.url} />
                </div>
              </div>
              <div className='flex rounded-lg gap-2 content-center justify-center bg-green-400 px-6 pb-4 pt-8 font-medium'>
                <Button type='submit' className='mt-4 w-[40%]' disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar'}
                </Button>
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

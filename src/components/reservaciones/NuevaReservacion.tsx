'use client';
import { formatoMoneda } from '@/app/lib/utils';
import { nuevaReservacion } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import { set } from 'zod';

export default function NuevaReservacion(props: any) {
  const { alquileres, servicios } = props;
  // console.log('servicios', servicios, 'alquileres', alquileres);
  // const [dia, setDia] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<any[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [precioAlquiler, setPrecioAlquiler] = useState(0);
  const [total, setTotal] = useState(0);

  const fechaMin = new Date().toISOString().split('T')[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      formData.append('total', JSON.stringify(total)); // Usa el total calculado
      formData.append('servicios', JSON.stringify(serviciosSeleccionados)); // Añade los servicios
      await nuevaReservacion(formData); // Envía la reserva
    } catch (error) {
      console.error('Error al registrar la reservación:', error);
    }
  };

  function handleSelectService(event: any) {
    const servicioId = parseInt(event.target.value, 10);

    // Buscar el servicio seleccionado por su ID
    const servicioSeleccionado = servicios.find((servicio: any) => servicio.id === servicioId);

    // Verifica que el servicio no esté ya en el array de seleccionados
    if (servicioSeleccionado && !serviciosSeleccionados.includes(servicioSeleccionado)) {
      setServiciosSeleccionados([...serviciosSeleccionados, servicioSeleccionado ?? {}]);
    }
  }
  const eliminarServicio = (id: number) => {
    // Filtra los servicios seleccionados para eliminar el que coincida con el id
    setServiciosSeleccionados(serviciosSeleccionados.filter((servicio) => servicio.id !== id));
  };

  const handleCantidadChange = (id: number, value: number) => {
    setCantidades((prev) => ({ ...prev, [id]: value }));

    setServiciosSeleccionados((prevServicios) =>
      prevServicios.map((servicio) => {
        if (servicio.id === id) {
          return { ...servicio, cantidad: value };
        }
        return servicio;
      })
    );
  };

  function calcularTotal() {
    setTotal(calcularTotalServicios() + precioAlquiler);
  }

  function handleAlquilerChange(event: any) {
    const alquilerId = parseInt(event.target.value, 10);
    // Busca el alquiler seleccionado para obtener su precio
    const alquilerSeleccionado = alquileres.find((alquiler: any) => alquiler.id === alquilerId);

    // Actualiza el precio del alquiler
    if (alquilerSeleccionado) {
      setPrecioAlquiler(alquilerSeleccionado.precio);
    }
  }

  const calcularTotalServicios = () => {
    const total = serviciosSeleccionados.reduce((suma, servicio) => {
      const cantidad = servicio.cantidad ? servicio.cantidad : 1; // Si no tiene cantidad, usa 1
      return suma + servicio.precio * cantidad;
    }, 0); // Inicializamos la suma en 0
    return total;
  };

  useEffect(() => {
    calcularTotal(); // Llama a calcularTotal cada vez que serviciosSeleccionados cambia
  }, [serviciosSeleccionados, precioAlquiler]); // Escucha los cambios en serviciosSeleccionados

  return (
    <>
      <form className='space-y-3' autoComplete='off' onSubmit={handleSubmit}>
        <div className='flex-1 rounded-lg px-6 pb-4 pt-8 font-medium'>
          <div className='w-full'>
            <div className='grid grid-cols-3 gap-4'>
              <label className='mb-2 mt-5 block font-medium text-gray-900' htmlFor='fecha'>
                Fecha de Inicio:
              </label>
              <div className='relative'>
                <input
                  className='px-3 peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                  id='detalle'
                  type='date'
                  min={fechaMin}
                  name='fechaInicio'
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <label className='mb-2 mt-5 block font-medium text-gray-900' htmlFor='fecha'>
                Fecha fin:
              </label>
              <div className='relative'>
                <input
                  className='px-3 peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                  id='detalle'
                  type='date'
                  min={fechaInicio}
                  name='fechaFin'
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className='mb-2 mt-5 block font-medium text-gray-900' htmlFor='precio'>
                Tipo de Alquiler
              </label>
              <div className='relative'>
                <select
                  name='alquiler'
                  id='alquiler'
                  className='px-3 peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                  onChange={handleAlquilerChange}
                >
                  <option value={''}>Seleccione el tipo de alquiler</option>
                  {alquileres?.map((alquiler: any) => (
                    <option key={alquiler.id} value={alquiler.id}>
                      {alquiler.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className='mb-2 mt-5 block font-medium text-gray-900' htmlFor='detalle'>
                Agregar Servicios:
              </label>
              <div className='relative'>
                <div>
                  <select
                    onChange={handleSelectService}
                    value=''
                    className='px-3 peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500'
                  >
                    <option value={''}>Seleccione Servicio</option>
                    {servicios?.map((servicio: any) => (
                      <option key={servicio.id} value={servicio.id}>
                        {servicio.nombre} ({servicio.precio})
                      </option>
                    ))}
                  </select>

                  {serviciosSeleccionados.length > 0 && (
                    <>
                      <h3>Servicios seleccionados:</h3>
                      <table className=' min-w-full text-gray-900 md:table'>
                        <thead className='rounded-lg text-left text-sm font-normal'>
                          <tr>
                            <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                              Nombre
                            </th>
                            <th scope='col' className='px-3 py-5 font-medium'>
                              Precio
                            </th>
                            <th scope='col' className='px-1 py-1 font-medium'>
                              Cantidad
                            </th>
                            <th scope='col' className='px-3 py-5 font-medium text-center'>
                              Total
                            </th>
                            <th scope='col' className='px-1 py-1 font-medium text-center'>
                              Eliminar
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white'>
                          {serviciosSeleccionados
                            .slice()
                            .reverse()
                            .map((servicio) => (
                              <tr
                                key={servicio.id}
                                className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                              >
                                <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                                  <p>{servicio.nombre}</p>
                                </td>
                                <td className='whitespace-nowrap px-3 py-3'>
                                  {formatoMoneda(servicio.precio)}
                                </td>
                                <td className='whitespace-nowrap px-1 py-3'>
                                  <input
                                    type='number'
                                    className='w-16 rounded border border-gray-200 p-1 text-center text-sm'
                                    min={1}
                                    max={Number(servicio.stock)}
                                    defaultValue={1}
                                    onChange={(e) =>
                                      handleCantidadChange(servicio.id, Number(e.target.value))
                                    }
                                  />
                                </td>
                                <td className='whitespace-nowrap px-3 py-3 text-right'>
                                  {formatoMoneda((cantidades[servicio.id] || 1) * servicio.precio)}
                                </td>
                                <td className='whitespace-nowrap px-3 py-1 text-center'>
                                  <button
                                    className='text-red-500 bg-transparent'
                                    onClick={() => eliminarServicio(servicio.id)}
                                  >
                                    ✕
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
                <div className='mt-2 text-sm font-bold'>Total: {formatoMoneda(total)}</div>
              </div>
            </div>
          </div>
          <div className='flex rounded-lg gap-2 content-center justify-center px-6 pb-4 pt-8 font-medium'>
            <button type='submit' className='mt-4 w-[40%] bg-indigo-500 rounded py-2 text-white'>
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

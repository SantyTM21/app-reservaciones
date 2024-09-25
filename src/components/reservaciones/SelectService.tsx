'use server';
import { fetchServicios } from '@/app/lib/data';

export default async function SelectService() {
  const servicios = await fetchServicios();
  return (
    <div>
      <select>
        <option disabled value={'Seleccione servicios'}>
          Seleccione Servicios
        </option>
        {servicios.map((servicio) => (
          <option key={servicio.id} value={servicio.id}>
            {servicio.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

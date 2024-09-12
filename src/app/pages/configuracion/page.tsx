import Enlace from '@/components/Enlace';

export default function Page() {
  return (
    <div>
      <h1>Configuración</h1>
      <Enlace
        href='/pages/configuracion/servicios'
        path='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
        nombre='Servicios'
      />
      <Enlace
        href='/pages/configuracion/tipo-alquiler'
        path='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
        nombre='Tipo de alquiler'
      />
      <Enlace
        href='/pages/configuracion/respaldar'
        path='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
        nombre='Respaldar base de datos'
      />
    </div>
  );
}

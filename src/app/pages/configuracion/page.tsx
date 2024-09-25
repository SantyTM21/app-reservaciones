import NavLinksConfig from '@/components/configuracion/nav-links';

export default function Page() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>Configuración</h1>
      <div className='flex flex-col justify-between space-y-2 md:flex-col md:space-x-0 '>
        <NavLinksConfig />
      </div>
    </div>
  );
}

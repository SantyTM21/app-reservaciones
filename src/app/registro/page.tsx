import RegistroForm from '@/components/registro/RegistroForm';

export default async function Component() {
  return (
    <div className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36'>
          <div className='w-32 text-white md:w-36'>Logo</div>
        </div>
        <h1 className='text-3xl'>Formulario de Registro</h1>
        <RegistroForm />
      </div>
    </div>
  );
}

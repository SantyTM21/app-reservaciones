import { ButtonLogo } from '@/components/button';
import RegistroForm from '@/components/registro/RegistroForm';

export default async function Component() {
  return (
    <div className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 w-full rounded-lg bg-indigo-400 p-3 md:h-36 items-center justify-center'>
          <div className='w-32 text-white md:w-36 '>
            <ButtonLogo />
          </div>
        </div>
        <RegistroForm />
      </div>
    </div>
  );
}

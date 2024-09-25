import { ButtonLogin, ButtonLogo, ButtonRegister } from '@/components/button';
import Carousel from '@/components/Carousel';

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-3xl font-bold py-5 px-10'>
        <ButtonLogo />
      </div>
      <div className='w-[600px] h-[400px]'>
        <Carousel />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='p-2 rounded-lg bg-indigo-500 text-slate-300'>
          <ButtonLogin />
        </div>
        <div className='p-2 rounded-lg bg-sky-600 opacity-80 text-slate-300'>
          <ButtonRegister />
        </div>
      </div>
    </div>
  );
}

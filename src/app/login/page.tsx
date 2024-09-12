import { ButtonLogo } from '@/components/button';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 w-full rounded-lg bg-blue-500 p-3 md:h-36 items-center justify-center'>
          <div className='w-72  md:w-36'>
            <ButtonLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

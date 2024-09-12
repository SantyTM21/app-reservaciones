import Carousel from '@/components/Carousel';

export default function page() {
  return (
    <div className='text-3xl'>
      {' '}
      FullParty reservaciones
      <div className='w-800'>
        <Carousel />
        <div>Login</div>
        <div>Registro</div>
      </div>
    </div>
  );
}

import { fetchUsuarioByMail } from '../lib/data';
import { Carousel } from 'flowbite-react';
export default async function page() {
  const usuario = await fetchUsuarioByMail();
  return (
    <div>
      <h1 className='text-3xl'>FullParty reservaciones</h1>
      <h1 className='text-2xl'>
        Bienvenido {usuario.nombre} {usuario.apellido}
      </h1>
      <div className='w-800 h-96'>
        <div>
          <Carousel />
          <img
            src='https://scontent.fuio19-1.fna.fbcdn.net/v/t39.30808-6/448145916_965438388920317_1170891274051616639_n.png?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IxQ-CX0V-TMQ7kNvgHgAzn1&_nc_ht=scontent.fuio19-1.fna&_nc_gid=AAoMAPASrk2s3Xzg_1kU77B&oh=00_AYD5NQqNM8w17johBwZ2ZyLekfwFa7TcU5gwNSfgu-IQEg&oe=66F9636B'
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

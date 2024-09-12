import PerfilForm from '@/components/perfil/PerfilForm';

import { fetchUsuarioByMail } from '../../lib/data';

export default async function Component() {
  const user = await fetchUsuarioByMail();
  return (
    <div>
      <h1 className='text-3xl'>Perfil de </h1>
      <PerfilForm {...user} />
    </div>
  );
}

import PerfilForm from '@/components/perfil/PerfilForm';

import { fetchUsuarioByMail } from '../../lib/data';

export default async function Component() {
  const user = await fetchUsuarioByMail();
  return (
    <div className='max-w-2xl mx-auto'>
      <PerfilForm {...user} />
    </div>
  );
}

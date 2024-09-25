'use client';

import { cancelarReservacionById } from '@/app/lib/actions';

export default function BotonCancelar(props: any) {
  const { id, disable } = props;

  return (
    <div>
      <form action={cancelarReservacionById}>
        <button
          className={`rounded-md px-4 py-2 text-sm text-white transition-colors ${
            disable ? 'bg-red-500 opacity-50 cursor-not-allowed' : 'bg-red-500 hover:bg-red-400'
          }`}
          disabled={disable} // Deshabilita el botón cuando disable es true
        >
          Cancelar reservación
        </button>

        <input hidden name='id' type='text' defaultValue={id} />
      </form>
    </div>
  );
}

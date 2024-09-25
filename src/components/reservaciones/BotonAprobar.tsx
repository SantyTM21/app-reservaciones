'use client';

import { aprobarReservacionById } from '@/app/lib/actions';

export default function BotonAprobar(props: any) {
  const { id, disable } = props;

  return (
    <div>
      <form action={aprobarReservacionById}>
        <button
          className={`rounded-md px-4 py-2 text-sm text-white transition-colors ${
            disable
              ? 'bg-green-400 opacity-50 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-400'
          }`}
          disabled={disable} // Deshabilita el botón cuando disable es true
        >
          Aprobar reservación
        </button>

        <input hidden name='id' type='text' defaultValue={id} />
      </form>
    </div>
  );
}

import { Link, useLocalSearchParams } from 'expo-router';

import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

const MINUTOS_POR_PEDIDO = 3;

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const turno = Number(numero);
  const { enEspera, atendidos } = useComedor();

  const posicion = enEspera.findIndex((p) => p.numero === turno);
  const fueAtendido = atendidos.some((p) => p.numero === turno);

  let contenido;
  if (!Number.isInteger(turno) || (posicion === -1 && !fueAtendido)) {
    contenido = <Mensaje>{`No existe el turno "${numero}".`}</Mensaje>;
  } else if (fueAtendido) {
    contenido = <Mensaje>Tu pedido ya fue atendido. ¡Buen provecho!</Mensaje>;
  } else {
    contenido = (
      <>
        <Mensaje>
          {posicion === 0
            ? 'Sos el próximo: tu pedido es el siguiente en prepararse.'
            : `Hay ${posicion} pedido${posicion === 1 ? '' : 's'} adelante tuyo.`}
        </Mensaje>
        <Mensaje>{`Espera estimada: ${posicion * MINUTOS_POR_PEDIDO} minutos.`}</Mensaje>
      </>
    );
  }

  return (
    <Pantalla>
      <Titulo>{`Turno N° ${numero}`}</Titulo>
      {contenido}
      <Link href="/menu">Volver al menú</Link>
    </Pantalla>
  );
}

import { Link, useRouter } from 'expo-router';
import { Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function Confirmar() {
  const router = useRouter();
  const { carrito, total, nota, confirmarPedido } = useComedor();

  function confirmar() {
    const numero = confirmarPedido();
    if (numero === null) return;
    // replace (no push): reemplaza el modal de confirmación por el turno, así "atrás"
    // desde el turno NO vuelve a la confirmación (el pedido ya está hecho).
    router.replace({ pathname: '/turno/[numero]', params: { numero } });
  }

  if (carrito.length === 0) {
    return (
      <Pantalla>
        <Titulo>No hay nada para confirmar</Titulo>
        <Link href="/menu" replace>
          Ir al menú
        </Link>
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Titulo>Resumen del pedido</Titulo>
      {carrito.map((linea) => (
        <Text key={linea.uid}>
          {linea.plato.nombre} — {formatearPrecio(linea.plato.precio)}
        </Text>
      ))}
      {nota !== '' && <Mensaje>{`Nota: ${nota}`}</Mensaje>}
      <Titulo>{`Total: ${formatearPrecio(total)}`}</Titulo>
      <Boton titulo="Confirmar" onPress={confirmar} />
      <Boton titulo="Cancelar" secundario onPress={() => router.back()} />
    </Pantalla>
  );
}

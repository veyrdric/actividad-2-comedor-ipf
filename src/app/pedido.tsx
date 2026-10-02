import { Redirect } from 'expo-router';

/** URL vieja de la versión anterior: reemplaza (no apila) hacia /carrito. */
export default function PedidoViejo() {
  return <Redirect href="/carrito" />;
}

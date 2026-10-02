import { Link } from 'expo-router';
import { Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function Cocina() {
  const { frente, enEspera, atenderSiguiente } = useComedor();

  return (
    <Pantalla>
      <Titulo>Pedido del frente de la cola</Titulo>
      {frente ? (
        <>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Turno N° {frente.numero}</Text>
          {frente.lineas.map((l) => (
            <Text key={l.uid}>• {l.plato.nombre}</Text>
          ))}
          {frente.nota !== '' && <Mensaje>{`Nota: ${frente.nota}`}</Mensaje>}
          <Text>Total: {formatearPrecio(frente.total)}</Text>
        </>
      ) : (
        <Mensaje>No hay pedidos en espera.</Mensaje>
      )}
      <Mensaje>{`Pedidos en espera: ${enEspera.length}`}</Mensaje>
      <Boton titulo="Atender siguiente" deshabilitado={!frente} onPress={atenderSiguiente} />
      <Link href="/cocina/atendidos">Ver atendidos</Link>
      <Link href="/">Volver al inicio</Link>
    </Pantalla>
  );
}

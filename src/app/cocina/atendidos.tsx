import { Text } from 'react-native';

import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function Atendidos() {
  const { atendidos } = useComedor();

  return (
    <Pantalla>
      <Titulo>Pedidos atendidos</Titulo>
      <Mensaje>Del más reciente al más antiguo.</Mensaje>
      {atendidos.length === 0 && <Mensaje>Todavía no se atendió ningún pedido.</Mensaje>}
      {atendidos.map((p) => (
        <Text key={p.numero}>
          Turno N° {p.numero} — {p.lineas.length} ítem(s) — {formatearPrecio(p.total)}
        </Text>
      ))}
    </Pantalla>
  );
}

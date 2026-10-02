import { Link } from 'expo-router';

import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';

export default function Ayuda() {
  return (
    <Pantalla>
      <Titulo>Centro de ayuda</Titulo>
      <Mensaje>Elegí un tema:</Mensaje>
      <Link href="/ayuda/horarios">Horarios</Link>
      <Link href="/ayuda/pagos/efectivo">Pagos: efectivo</Link>
      <Link href="/ayuda/pagos/tarjeta">Pagos: tarjeta</Link>
      <Link href="/ayuda/pedidos/turnos">Cómo funcionan los turnos</Link>
    </Pantalla>
  );
}

import { Link, Stack, usePathname } from 'expo-router';

import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';

export default function NoEncontrada() {
  const pathname = usePathname();
  return (
    <>
      <Stack.Screen options={{ title: 'No encontrada' }} />
      <Pantalla>
        <Titulo>404 · Pantalla inexistente</Titulo>
        <Mensaje>{`La dirección "${pathname}" no existe en el comedor.`}</Mensaje>
        <Link href="/" replace>
          Ir al inicio
        </Link>
      </Pantalla>
    </>
  );
}

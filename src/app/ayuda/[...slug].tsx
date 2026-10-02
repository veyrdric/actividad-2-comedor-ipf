import { Stack, useLocalSearchParams } from 'expo-router';

import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { ARTICULOS } from '@/data/ayuda';

export default function ArticuloAyuda() {
  // slug es un array con cada segmento: /ayuda/pagos/efectivo → ['pagos', 'efectivo']
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const clave = (slug ?? []).join('/');
  const articulo = ARTICULOS[clave];

  return (
    <Pantalla>
      <Stack.Screen options={{ title: articulo?.titulo ?? 'Ayuda' }} />
      {articulo ? (
        <>
          <Titulo>{articulo.titulo}</Titulo>
          <Mensaje>{articulo.texto}</Mensaje>
        </>
      ) : (
        <>
          <Titulo>Artículo no encontrado</Titulo>
          <Mensaje>{`No hay un artículo de ayuda en "/ayuda/${clave}".`}</Mensaje>
        </>
      )}
    </Pantalla>
  );
}

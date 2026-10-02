import { Link, Stack, useLocalSearchParams } from 'expo-router';

import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { CATEGORIAS, esCategoria, platosDeCategoria, tituloCategoria } from '@/data/platos';

export default function Categoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  if (!esCategoria(categoria)) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Categoría inexistente' }} />
        <Titulo>No existe la categoría</Titulo>
        <Mensaje>{`"${categoria}" no es una categoría válida. Probá con:`}</Mensaje>
        {CATEGORIAS.map((c) => (
          <Link key={c.clave} href={{ pathname: '/categorias/[categoria]', params: { categoria: c.clave } }}>
            {c.titulo}
          </Link>
        ))}
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: tituloCategoria(categoria) }} />
      {platosDeCategoria(categoria).map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
    </Pantalla>
  );
}

import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Pantalla } from '@/components/Pantalla';
import { Seccion } from '@/components/Seccion';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { colores } from '@/constants/tema';
import { CATEGORIAS, platosDeCategoria } from '@/data/platos';

export default function Menu() {
  return (
    <Pantalla>
      {CATEGORIAS.map((categoria) => (
        <View key={categoria.clave} style={estilos.seccion}>
          <Seccion
            titulo={categoria.titulo}
            color={categoria.color}
            icono={categoria.icono}
            derecha={
              <Link href={{ pathname: '/categorias/[categoria]', params: { categoria: categoria.clave } }}>
                <Text style={estilos.verTodo}>Ver todo ›</Text>
              </Link>
            }
          />
          {platosDeCategoria(categoria.clave).map((plato) => (
            <TarjetaPlato key={plato.id} plato={plato} />
          ))}
        </View>
      ))}
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  seccion: { gap: 8, marginBottom: 8 },
  verTodo: { fontSize: 13, fontWeight: '600', color: colores.primario },
});

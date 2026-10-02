import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, radio, sombra } from '@/constants/tema';
import { formatearPrecio, infoCategoria, type Plato } from '@/data/platos';

/** Tarjeta de un plato, con aspecto de work item: acento lateral, id y etiqueta. */
export function TarjetaPlato({ plato }: { plato: Plato }) {
  const cat = infoCategoria(plato.categoria);
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: plato.id } }} asChild>
      <Pressable style={StyleSheet.flatten([estilos.tarjeta, { borderLeftColor: cat.color }])}>
        <View style={estilos.info}>
          <Text style={estilos.id}>#{plato.id}</Text>
          <Text style={estilos.nombre}>{plato.nombre}</Text>
          <View style={estilos.etiqueta}>
            <Ionicons name={cat.icono} size={12} color={colores.suave} />
            <Text style={estilos.etiquetaTexto}>{cat.titulo}</Text>
          </View>
        </View>
        <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: radio,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderLeftWidth: 4,
    ...sombra,
  },
  info: { flex: 1, gap: 3 },
  id: { fontSize: 12, color: colores.suave },
  nombre: { fontSize: 15, fontWeight: '600', color: colores.texto },
  etiqueta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  etiquetaTexto: { fontSize: 12, color: colores.suave },
  precio: { fontSize: 15, fontWeight: '600', color: colores.primario },
});

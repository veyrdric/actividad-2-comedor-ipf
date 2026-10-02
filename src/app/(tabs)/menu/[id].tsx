import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { Mensaje, Titulo } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { colores, radio, sombra } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { buscarPlato, formatearPrecio, infoCategoria } from '@/data/platos';

export default function DetallePlato() {
  // Los parámetros de ruta llegan como texto: hay que convertir y validar.
  const { id } = useLocalSearchParams<{ id: string }>();
  const numero = Number(id);
  const plato = Number.isInteger(numero) ? buscarPlato(numero) : undefined;
  const { agregarAlCarrito } = useComedor();

  if (!plato) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Plato inexistente' }} />
        <Titulo>No existe el plato</Titulo>
        <Mensaje>{`No hay ningún plato con el código "${id}".`}</Mensaje>
      </Pantalla>
    );
  }

  const cat = infoCategoria(plato.categoria);

  return (
    <Pantalla>
      <Stack.Screen options={{ title: plato.nombre }} />
      <View style={[estilos.tarjeta, { borderTopColor: cat.color }]}>
        <Text style={estilos.id}>PLATO #{plato.id}</Text>
        <Titulo>{plato.nombre}</Titulo>
        <View style={estilos.etiqueta}>
          <Ionicons name={cat.icono} size={14} color={colores.suave} />
          <Text style={estilos.etiquetaTexto}>{cat.titulo}</Text>
        </View>
        <Mensaje>{plato.descripcion}</Mensaje>
        <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      </View>
      <Boton titulo="Agregar al carrito" onPress={() => agregarAlCarrito(plato)} />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    gap: 8,
    padding: 16,
    borderRadius: radio,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderTopWidth: 4,
    ...sombra,
  },
  id: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, color: colores.suave },
  etiqueta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  etiquetaTexto: { fontSize: 13, color: colores.suave },
  precio: { fontSize: 28, fontWeight: '600', color: colores.primario },
});

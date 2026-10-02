import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colores } from '@/constants/tema';

type Props = {
  titulo: string;
  color?: string;
  icono?: keyof typeof Ionicons.glyphMap;
  derecha?: ReactNode;
};

/** Encabezado de sección, como el de una columna del tablero. */
export function Seccion({ titulo, color = colores.primario, icono, derecha }: Props) {
  return (
    <View style={[estilos.fila, { borderBottomColor: color }]}>
      {icono && <Ionicons name={icono} size={16} color={color} />}
      <Text style={estilos.titulo}>{titulo.toUpperCase()}</Text>
      <View style={estilos.derecha}>{derecha}</View>
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingBottom: 6, borderBottomWidth: 2 },
  titulo: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, color: colores.suave },
  derecha: { marginLeft: 'auto' },
});

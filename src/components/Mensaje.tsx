import { StyleSheet, Text } from 'react-native';

import { colores } from '@/constants/tema';

export function Mensaje({ children }: { children: string }) {
  return <Text style={estilos.texto}>{children}</Text>;
}

export function Titulo({ children }: { children: string }) {
  return <Text style={estilos.titulo}>{children}</Text>;
}

const estilos = StyleSheet.create({
  texto: { fontSize: 14, lineHeight: 20, color: colores.suave },
  titulo: { fontSize: 20, fontWeight: '600', color: colores.texto },
});

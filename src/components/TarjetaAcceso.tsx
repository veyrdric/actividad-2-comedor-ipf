import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, radio, sombra } from '@/constants/tema';

type Props = {
  titulo: string;
  detalle: string;
  href: Href;
  icono: keyof typeof Ionicons.glyphMap;
};

/** Mosaico de acceso rápido (como los de un dashboard). */
export function TarjetaAcceso({ titulo, detalle, href, icono }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable style={estilos.tarjeta}>
        <View style={estilos.icono}>
          <Ionicons name={icono} size={22} color={colores.primario} />
        </View>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.detalle}>{detalle}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flex: 1,
    minWidth: 150,
    padding: 14,
    borderRadius: radio,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: 4,
    ...sombra,
  },
  icono: {
    width: 40,
    height: 40,
    borderRadius: radio,
    backgroundColor: colores.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  titulo: { fontSize: 16, fontWeight: '600', color: colores.texto },
  detalle: { fontSize: 13, color: colores.suave },
});

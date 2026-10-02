import { Pressable, StyleSheet, Text } from 'react-native';

import { colores, radio } from '@/constants/tema';

type Props = {
  titulo: string;
  onPress: () => void;
  deshabilitado?: boolean;
  secundario?: boolean;
};

export function Boton({ titulo, onPress, deshabilitado = false, secundario = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: deshabilitado }}
      disabled={deshabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.base,
        secundario ? estilos.secundario : estilos.primario,
        pressed && (secundario ? estilos.secundarioPresionado : estilos.primarioPresionado),
        deshabilitado && estilos.deshabilitado,
      ]}>
      <Text style={[estilos.texto, secundario && estilos.textoSecundario]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: { minHeight: 40, paddingVertical: 9, paddingHorizontal: 20, borderRadius: radio, alignItems: 'center', justifyContent: 'center' },
  primario: { backgroundColor: colores.primario },
  primarioPresionado: { backgroundColor: colores.primarioOscuro },
  secundario: { backgroundColor: colores.tarjeta, borderWidth: 1, borderColor: colores.bordeFuerte },
  secundarioPresionado: { backgroundColor: colores.fondo },
  deshabilitado: { opacity: 0.4 },
  texto: { color: '#fff', fontWeight: '600', fontSize: 15 },
  textoSecundario: { color: colores.texto },
});

import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

/**
 * Cierra la sesión. No hace falta llamar a router.back(): al pasar `guard` a false,
 * Stack.Protected quita la sección de cocina y la navegación vuelve sola.
 */
export function BotonCerrarSesion() {
  const { cerrarSesion } = useComedor();
  return (
    <Pressable onPress={cerrarSesion} accessibilityRole="button" style={estilos.boton}>
      <Text style={estilos.texto}>Cerrar sesión</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: { paddingHorizontal: 12, paddingVertical: 6 },
  texto: { color: '#fff', fontWeight: '600' },
});

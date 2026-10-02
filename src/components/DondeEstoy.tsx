import { useGlobalSearchParams, useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colores, radio } from '@/constants/tema';

/** Poné en false para ocultar el panel de depuración en todas las pantallas. */
const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();
  const globales = useGlobalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>usePathname(): {pathname}</Text>
      <Text style={estilos.linea}>useSegments(): {JSON.stringify(segments)}</Text>
      <Text style={estilos.linea}>useLocalSearchParams(): {JSON.stringify(params)}</Text>
      <Text style={estilos.linea}>useGlobalSearchParams(): {JSON.stringify(globales)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    marginTop: 24,
    padding: 10,
    borderRadius: radio,
    borderWidth: 1,
    borderColor: colores.bordeFuerte,
    borderStyle: 'dashed',
    backgroundColor: colores.tarjeta,
  },
  titulo: { fontWeight: '600', color: colores.suave, marginBottom: 4, fontSize: 12 },
  linea: { fontSize: 11, color: colores.suave, fontFamily: 'monospace' },
});

import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { colores } from '@/constants/tema';

/** Contenedor común de pantallas: scroll, margen y el panel "¿Dónde estoy?" al final. */
export function Pantalla({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      style={estilos.fondo}
      contentContainerStyle={estilos.contenido}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic">
      {children}
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  fondo: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, gap: 12 },
});

import { Drawer } from 'expo-router/drawer';

import { BotonCerrarSesion } from '@/components/BotonCerrarSesion';
import { colores, opcionesHeader } from '@/constants/tema';

export default function LayoutCocina() {
  return (
    <Drawer
      screenOptions={{
        ...opcionesHeader,
        headerRight: () => <BotonCerrarSesion />,
        drawerActiveTintColor: colores.primario,
        drawerActiveBackgroundColor: colores.primarioSuave,
      }}>
      <Drawer.Screen name="index" options={{ title: 'Cocina', drawerLabel: 'Pedidos' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos', drawerLabel: 'Atendidos' }} />
    </Drawer>
  );
}

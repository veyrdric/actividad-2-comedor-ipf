import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { colores, opcionesHeader } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

export default function LayoutTabs() {
  const { carrito } = useComedor();

  return (
    <Tabs
      screenOptions={{
        ...opcionesHeader,
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.suave,
        tabBarStyle: { borderTopColor: colores.borde },
        tabBarLabelStyle: { fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false, // el Stack interno pone su propio header
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarBadge: carrito.length > 0 ? carrito.length : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

import { Stack } from 'expo-router';
import { opcionesHeader } from '@/constants/tema';

export default function LayoutMenu() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal', ...opcionesHeader }}>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      <Stack.Screen name="[id]" options={{ title: 'Plato' }} />
    </Stack>
  );
}

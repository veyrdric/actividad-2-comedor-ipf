import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ComedorProvider, useComedor } from '@/context/ComedorContext';
import { opcionesHeader } from '@/constants/tema';

SplashScreen.preventAutoHideAsync().catch(() => {});

// Si se abre un deep link directo (ej. /categorias/bebidas), (tabs) queda debajo en la pila.
export const unstable_settings = { anchor: '(tabs)' };

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  // Al iniciar sesión, el login desaparece solo (guard) y se abre la cocina.
  const sesionAnterior = useRef(usuario);
  useEffect(() => {
    if (sesionAnterior.current === null && usuario !== null) router.push('/cocina');
    sesionAnterior.current = usuario;
  }, [usuario, router]);

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal', ...opcionesHeader }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', animation: 'slide_from_bottom', title: 'Confirmar pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Ayuda' }} />

      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal', animation: 'slide_from_bottom', title: 'Ingreso de cocina' }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <ComedorProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavegacionRaiz />
      </GestureHandlerRootView>
    </ComedorProvider>
  );
}

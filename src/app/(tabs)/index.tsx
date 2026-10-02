import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaAcceso } from '@/components/TarjetaAcceso';
import { colores, radio } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

export default function Inicio() {
  const router = useRouter();
  const { usuario, cerrarSesion, enEspera } = useComedor();

  return (
    <Pantalla>
      <View style={estilos.banner}>
        <Text style={estilos.bannerTitulo}>Comedor IPF</Text>
        <Text style={estilos.bannerTexto}>Pedí desde el celular y retirá cuando te toque el turno.</Text>
        <Text style={estilos.bannerDato}>{enEspera.length} pedido(s) en espera</Text>
      </View>

      <View style={estilos.grilla}>
        <TarjetaAcceso icono="restaurant" titulo="Menú" detalle="Platos por categoría" href="/menu" />
        <TarjetaAcceso icono="search" titulo="Buscar" detalle="Por nombre o categoría" href="/buscar" />
        <TarjetaAcceso icono="help-circle" titulo="Ayuda" detalle="Pagos, horarios, turnos" href="/ayuda" />
        <TarjetaAcceso
          icono="flame"
          titulo="Cocina"
          detalle={usuario ? 'Atender pedidos' : 'Ingreso del personal'}
          href={usuario ? '/cocina' : '/login'}
        />
      </View>

      {usuario ? (
        <Boton titulo="Cerrar sesión" secundario onPress={cerrarSesion} />
      ) : (
        <Boton titulo="Iniciar sesión (personal de cocina)" onPress={() => router.push('/login')} />
      )}
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  banner: { backgroundColor: colores.primario, borderRadius: radio, padding: 20, gap: 6 },
  bannerTitulo: { color: '#fff', fontSize: 26, fontWeight: '700' },
  bannerTexto: { color: '#DEECF9', fontSize: 14, lineHeight: 20 },
  bannerDato: { color: '#fff', fontSize: 12, fontWeight: '600', marginTop: 6 },
  grilla: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});

import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { Mensaje } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { Seccion } from '@/components/Seccion';
import { colores, radio, sombra } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio, infoCategoria } from '@/data/platos';

export default function Carrito() {
  const router = useRouter();
  const { carrito, total, nota, puedeDeshacer, deshacerUltimo } = useComedor();

  return (
    <Pantalla>
      <Seccion titulo={`Tu carrito (${carrito.length})`} icono="cart" />

      {carrito.length === 0 ? (
        <Mensaje>Todavía no agregaste nada. Mirá el menú y elegí tus platos.</Mensaje>
      ) : (
        carrito.map((linea) => (
          <View
            key={linea.uid}
            style={[estilos.fila, { borderLeftColor: infoCategoria(linea.plato.categoria).color }]}>
            <Text style={estilos.nombre}>{linea.plato.nombre}</Text>
            <Text style={estilos.precio}>{formatearPrecio(linea.plato.precio)}</Text>
          </View>
        ))
      )}

      <View style={estilos.resumen}>
        <Text style={estilos.totalEtiqueta}>TOTAL</Text>
        <Text style={estilos.total}>{formatearPrecio(total)}</Text>
      </View>
      {nota !== '' && <Mensaje>{`Nota: ${nota}`}</Mensaje>}

      <Link href="/carrito/nota" style={estilos.link}>
        {nota === '' ? 'Agregar nota para la cocina' : 'Editar nota'}
      </Link>

      <Boton titulo="Deshacer último" secundario deshabilitado={!puedeDeshacer} onPress={deshacerUltimo} />
      <Boton
        titulo="Confirmar pedido"
        deshabilitado={carrito.length === 0}
        onPress={() => router.push('/confirmar')}
      />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: radio,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderLeftWidth: 4,
    ...sombra,
  },
  nombre: { fontSize: 15, color: colores.texto },
  precio: { fontSize: 15, fontWeight: '600', color: colores.primario },
  resumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 12,
    borderRadius: radio,
    backgroundColor: colores.primarioSuave,
  },
  totalEtiqueta: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, color: colores.suave },
  total: { fontSize: 22, fontWeight: '600', color: colores.primarioOscuro },
  link: { color: colores.primario, fontWeight: '600' },
});

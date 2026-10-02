import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Mensaje } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { colores } from '@/constants/tema';
import { CATEGORIAS, esCategoria, PLATOS } from '@/data/platos';

const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Buscar() {
  const router = useRouter();
  // La búsqueda vive en la URL: /buscar?q=mate&categoria=kiosco
  const { q = '', categoria } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  const categoriaInvalida = categoria !== undefined && categoria !== '' && !esCategoria(categoria);
  const filtroCategoria = esCategoria(categoria) ? categoria : undefined;

  const resultados = PLATOS.filter(
    (p) =>
      normalizar(p.nombre).includes(normalizar(q)) &&
      (filtroCategoria === undefined || p.categoria === filtroCategoria),
  );

  return (
    <Pantalla>
      <TextInput
        value={q}
        // setParams actualiza la URL de ESTA pantalla sin apilar otra por cada letra
        onChangeText={(texto) => router.setParams({ q: texto })}
        placeholder="¿Qué querés comer?"
        autoCapitalize="none"
        style={estilos.input}
      />

      <View style={estilos.chips}>
        {CATEGORIAS.map((c) => {
          const activa = filtroCategoria === c.clave;
          return (
            <Pressable
              key={c.clave}
              onPress={() => router.setParams({ categoria: activa ? undefined : c.clave })}
              style={[estilos.chip, activa && estilos.chipActivo]}>
              <Text style={activa ? estilos.chipTextoActivo : estilos.chipTexto}>{c.titulo}</Text>
            </Pressable>
          );
        })}
      </View>

      {categoriaInvalida && <Mensaje>{`La categoría "${categoria}" no existe; se muestran todas.`}</Mensaje>}
      {resultados.length === 0 && <Mensaje>No hay platos que coincidan con la búsqueda.</Mensaje>}
      {resultados.map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colores.bordeFuerte,
    backgroundColor: colores.tarjeta,
    color: colores.texto,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colores.primario,
  },
  chipActivo: { backgroundColor: colores.primario },
  chipTexto: { color: colores.primario },
  chipTextoActivo: { color: '#fff' },
});

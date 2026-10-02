import { useRouter } from 'expo-router';
import { StyleSheet, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { Mensaje } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { colores } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

export default function Nota() {
  const router = useRouter();
  const { nota, setNota } = useComedor();

  return (
    <Pantalla>
      <Mensaje>Aclaración para la cocina (por ejemplo: "sin sal").</Mensaje>
      <TextInput
        value={nota}
        onChangeText={setNota}
        placeholder="Escribí tu nota"
        multiline
        style={estilos.input}
      />
      <Boton titulo="Listo" onPress={() => router.back()} />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  input: {
    minHeight: 80,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colores.bordeFuerte,
    backgroundColor: colores.tarjeta,
    color: colores.texto,
    textAlignVertical: 'top',
  },
});

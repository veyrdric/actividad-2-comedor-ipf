import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { Mensaje } from '@/components/Mensaje';
import { Pantalla } from '@/components/Pantalla';
import { colores } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

export default function Login() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    // Si es correcto no navegamos: al cambiar la sesión, Stack.Protected quita
    // esta pantalla y el layout raíz abre la cocina.
    if (!iniciarSesion(usuario, clave)) setError('Usuario o clave incorrectos.');
  }

  return (
    <Pantalla>
      <Mensaje>Ingreso del personal de cocina.</Mensaje>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        autoCapitalize="none"
        style={estilos.input}
      />
      <TextInput value={clave} onChangeText={setClave} placeholder="Clave" secureTextEntry style={estilos.input} />
      {error !== '' && <Mensaje>{error}</Mensaje>}
      <Boton titulo="Ingresar" onPress={ingresar} />
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
});

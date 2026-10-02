import { createContext, useContext, useState, type ReactNode } from 'react';

import type { Plato } from '@/data/platos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = 'ipf2024';

export type LineaCarrito = { uid: number; plato: Plato };
type Accion = { tipo: 'agregar'; uid: number };

export type Pedido = {
  numero: number;
  lineas: LineaCarrito[];
  total: number;
  nota: string;
};

type ComedorValor = {
  // sesión
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  // carrito + pila de deshacer
  carrito: LineaCarrito[];
  total: number;
  nota: string;
  setNota: (texto: string) => void;
  puedeDeshacer: boolean;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  // cola de pedidos + pila de atendidos
  enEspera: Pedido[];
  frente: Pedido | undefined;
  atendidos: Pedido[];
  confirmarPedido: () => number | null;
  atenderSiguiente: () => void;
};

const ComedorContext = createContext<ComedorValor | null>(null);

export function ComedorProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);

  const [carrito, setCarrito] = useState<LineaCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [siguienteUid, setSiguienteUid] = useState(1);
  const [siguienteTurno, setSiguienteTurno] = useState(1);

  // Estructuras de datos propias (mutables). Se crean una sola vez y, tras cada
  // cambio, se copia su contenido a un estado para que React vuelva a renderizar.
  const [acciones] = useState(() => new Pila<Accion>());
  const [cola] = useState(() => new Cola<Pedido>());
  const [pilaAtendidos] = useState(() => new Pila<Pedido>());

  const [puedeDeshacer, setPuedeDeshacer] = useState(false);
  const [enEspera, setEnEspera] = useState<Pedido[]>([]);
  const [frente, setFrente] = useState<Pedido | undefined>(undefined);
  const [atendidos, setAtendidos] = useState<Pedido[]>([]);

  const total = carrito.reduce((suma, l) => suma + l.plato.precio, 0);

  function iniciarSesion(u: string, clave: string) {
    if (u.trim() === USUARIO_COCINA && clave === CLAVE_COCINA) {
      setUsuario(u.trim());
      return true;
    }
    return false;
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  function agregarAlCarrito(plato: Plato) {
    const uid = siguienteUid;
    setSiguienteUid(uid + 1);
    acciones.push({ tipo: 'agregar', uid }); // push en la pila de acciones
    setCarrito((actual) => [...actual, { uid, plato }]);
    setPuedeDeshacer(true);
  }

  function deshacerUltimo() {
    const accion = acciones.pop(); // pop: la última acción hecha
    if (!accion) return;
    setCarrito((actual) => actual.filter((l) => l.uid !== accion.uid));
    setPuedeDeshacer(!acciones.vacia);
  }

  function confirmarPedido() {
    if (carrito.length === 0) return null;
    const numero = siguienteTurno;
    setSiguienteTurno(numero + 1);

    cola.encolar({ numero, lineas: carrito, total, nota });
    setEnEspera(cola.aArray());
    setFrente(cola.frente());

    // el pedido confirmado ya no se puede deshacer
    while (!acciones.vacia) acciones.pop();
    setPuedeDeshacer(false);
    setCarrito([]);
    setNota('');
    return numero;
  }

  function atenderSiguiente() {
    const pedido = cola.desencolar();
    if (!pedido) return;
    pilaAtendidos.push(pedido);
    setEnEspera(cola.aArray());
    setFrente(cola.frente());
    setAtendidos(pilaAtendidos.aArray().reverse()); // del más reciente al más antiguo
  }

  return (
    <ComedorContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        total,
        nota,
        setNota,
        puedeDeshacer,
        agregarAlCarrito,
        deshacerUltimo,
        enEspera,
        frente,
        atendidos,
        confirmarPedido,
        atenderSiguiente,
      }}>
      {children}
    </ComedorContext.Provider>
  );
}

export function useComedor(): ComedorValor {
  const valor = useContext(ComedorContext);
  if (!valor) throw new Error('useComedor debe usarse dentro de <ComedorProvider>');
  return valor;
}

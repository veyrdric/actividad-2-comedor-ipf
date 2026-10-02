// Paleta inspirada en Azure DevOps / Fluent UI.
export const colores = {
  primario: '#0078D4',
  primarioOscuro: '#106EBE',
  primarioSuave: '#DEECF9',
  fondo: '#F3F2F1',
  tarjeta: '#FFFFFF',
  texto: '#323130',
  suave: '#605E5C',
  borde: '#EDEBE9',
  bordeFuerte: '#C8C6C4',
  ok: '#107C10',
  peligro: '#A4262C',
};

export const radio = 4;

export const sombra = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 1 },
  elevation: 1,
};

/** Opciones de header compartidas por todos los navegadores (barra azul). */
export const opcionesHeader = {
  headerStyle: { backgroundColor: colores.primario },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '600' as const },
};

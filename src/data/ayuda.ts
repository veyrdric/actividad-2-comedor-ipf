export type Articulo = { titulo: string; texto: string };

/** Artículos de ayuda; la clave es la ruta después de /ayuda/. */
export const ARTICULOS: Record<string, Articulo> = {
  'pagos/efectivo': { titulo: 'Pagar en efectivo', texto: 'Abonás en la caja del comedor al retirar tu pedido.' },
  'pagos/tarjeta': { titulo: 'Pagar con tarjeta', texto: 'Aceptamos débito y crédito en la caja del comedor.' },
  horarios: { titulo: 'Horarios', texto: 'Lunes a viernes de 7:30 a 21:00.' },
  'pedidos/turnos': { titulo: 'Cómo funcionan los turnos', texto: 'Los pedidos se atienden en orden de llegada. Tu número de turno te dice cuántos pedidos hay adelante.' },
};

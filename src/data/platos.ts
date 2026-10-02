export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

export type InfoCategoria = {
  clave: Categoria;
  titulo: string;
  color: string; // color de acento (como los tipos de work item)
  icono: 'cafe' | 'restaurant' | 'water' | 'fast-food';
};

export const CATEGORIAS: InfoCategoria[] = [
  { clave: 'desayuno', titulo: 'Desayuno', color: '#F2CB1D', icono: 'cafe' },
  { clave: 'almuerzo', titulo: 'Almuerzo', color: '#009CCC', icono: 'restaurant' },
  { clave: 'bebidas', titulo: 'Bebidas', color: '#773B93', icono: 'water' },
  { clave: 'kiosco', titulo: 'Kiosco', color: '#FF7B00', icono: 'fast-food' },
];

export function infoCategoria(c: Categoria): InfoCategoria {
  return CATEGORIAS.find((x) => x.clave === c) ?? CATEGORIAS[0];
}

export const PLATOS: Plato[] = [
  { id: 1, nombre: 'Café con leche', precio: 1500, descripcion: 'Café recién hecho con leche caliente.', categoria: 'desayuno' },
  { id: 2, nombre: 'Tostado de jamón y queso', precio: 3200, descripcion: 'Pan de miga tostado con jamón cocido y queso.', categoria: 'desayuno' },
  { id: 3, nombre: 'Medialunas x3', precio: 2400, descripcion: 'Tres medialunas de manteca.', categoria: 'desayuno' },
  { id: 4, nombre: 'Milanesa con puré', precio: 6500, descripcion: 'Milanesa de carne con puré de papas.', categoria: 'almuerzo' },
  { id: 5, nombre: 'Tarta de verdura', precio: 4800, descripcion: 'Porción de tarta de acelga y queso con ensalada.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Fideos con tuco', precio: 5200, descripcion: 'Spaghetti con salsa de tomate casera.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Agua mineral', precio: 1200, descripcion: 'Botella de 500 ml, sin gas.', categoria: 'bebidas' },
  { id: 8, nombre: 'Jugo de naranja', precio: 1800, descripcion: 'Exprimido en el momento.', categoria: 'bebidas' },
  { id: 9, nombre: 'Gaseosa', precio: 1700, descripcion: 'Lata de 354 ml, a elección.', categoria: 'bebidas' },
  { id: 10, nombre: 'Alfajor', precio: 900, descripcion: 'Alfajor de dulce de leche.', categoria: 'kiosco' },
  { id: 11, nombre: 'Papas fritas', precio: 1600, descripcion: 'Bolsita de papas fritas clásicas.', categoria: 'kiosco' },
  { id: 12, nombre: 'Yerba y mate cocido', precio: 1000, descripcion: 'Mate cocido en saquito con una galletita.', categoria: 'kiosco' },
];

export function esCategoria(valor: unknown): valor is Categoria {
  return CATEGORIAS.some((c) => c.clave === valor);
}

export function tituloCategoria(c: Categoria): string {
  return CATEGORIAS.find((x) => x.clave === c)?.titulo ?? c;
}

export function buscarPlato(id: number): Plato | undefined {
  return PLATOS.find((p) => p.id === id);
}

export function platosDeCategoria(c: Categoria): Plato[] {
  return PLATOS.filter((p) => p.categoria === c);
}

export function formatearPrecio(n: number): string {
  return `$${n.toLocaleString('es-AR')}`;
}

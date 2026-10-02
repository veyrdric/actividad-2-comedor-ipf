/** Pila (LIFO): el último en entrar es el primero en salir. */
export class Pila<T> {
  #items: T[] = [];

  push(x: T): void {
    this.#items.push(x);
  }

  pop(): T | undefined {
    return this.#items.pop();
  }

  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }

  get tamanio(): number {
    return this.#items.length;
  }

  /** Copia del contenido, de la base al tope. */
  aArray(): T[] {
    return [...this.#items];
  }
}

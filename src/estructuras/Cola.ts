/**
 * Cola (FIFO): el primero en entrar es el primero en salir.
 * No usa shift(): guarda el índice del frente (desencolar es O(1) amortizado).
 */
export class Cola<T> {
  #items: (T | undefined)[] = [];
  #frente = 0;

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const x = this.#items[this.#frente];
    this.#items[this.#frente] = undefined; // libera la referencia
    this.#frente++;

    // Compactación ocasional para no acumular huecos al inicio.
    if (this.#frente > 32 && this.#frente * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }
    return x;
  }

  frente(): T | undefined {
    return this.vacia ? undefined : this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  /** Copia del contenido, del frente al final. */
  aArray(): T[] {
    return this.#items.slice(this.#frente) as T[];
  }
}

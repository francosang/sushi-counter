/** Textos que comparten el núcleo y la interfaz. */

/** El restaurante del Catálogo (v1: uno solo). */
export const RESTAURANTE = 'Kayi Sushi Barcelona'

/** "pieza" o "piezas", según la cantidad. */
export function palabraPiezas(cantidad: number): string {
  return cantidad === 1 ? 'pieza' : 'piezas'
}

/** "1 pieza", "8 piezas". */
export function textoDePiezas(cantidad: number): string {
  return `${cantidad} ${palabraPiezas(cantidad)}`
}

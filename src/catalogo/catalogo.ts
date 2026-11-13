import datos from './catalogo.json'

/** Una entrada de comida de la Carta. */
export interface Plato {
  /**
   * Id fijo del Plato, tal cual lo imprime la Carta ("045", "158", "G150", "P1"),
   * ceros a la izquierda incluidos. No se reutiliza ni se cambia.
   */
  numero: string
  nombre: string
  /** Entero ≥ 1; 1 si la Carta no indica cantidad. */
  piezas: number
  categoria: string
}

/**
 * El Catálogo publicado, en el orden de la Carta.
 * Los datos viven en `catalogo.json`; para actualizar la Carta se reemplaza ese archivo.
 */
export const catalogo: readonly Plato[] = datos

export function validarCatalogo(platos: readonly Plato[]): string[] {
  const errores: string[] = []
  const vistos = new Set<string>()
  for (const plato of platos) {
    if (!plato.numero.trim()) errores.push(`Plato "${plato.numero}": número vacío`)
    else if (vistos.has(plato.numero)) errores.push(`Plato ${plato.numero}: número repetido`)
    vistos.add(plato.numero)
    if (!Number.isInteger(plato.piezas) || plato.piezas < 1)
      errores.push(`Plato ${plato.numero}: piezas debe ser un entero ≥ 1`)
    if (!plato.nombre.trim()) errores.push(`Plato ${plato.numero}: nombre vacío`)
    if (!plato.categoria.trim()) errores.push(`Plato ${plato.numero}: categoría vacía`)
  }
  return errores
}

export interface GrupoDeCategoria {
  categoria: string
  platos: Plato[]
}

/** Agrupa los Platos por categoría; los grupos y los Platos de cada grupo siguen el orden de la Carta. */
export function agruparPorCategoria(platos: readonly Plato[]): GrupoDeCategoria[] {
  const grupos = new Map<string, Plato[]>()
  for (const plato of platos) {
    const grupo = grupos.get(plato.categoria)
    if (grupo) grupo.push(plato)
    else grupos.set(plato.categoria, [plato])
  }
  return [...grupos].map(([categoria, platos]) => ({ categoria, platos }))
}

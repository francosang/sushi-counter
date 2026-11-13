/**
 * El formato guardado del núcleo, en un único lugar.
 *
 * Las Piezas no se guardan: siempre se calculan con el Catálogo actual.
 * Cuando cambie la forma de `Guardado`, subir `VERSION_ACTUAL` y agregar
 * la migración desde la versión anterior en `leerGuardado`.
 */
import type { NumeroDePlato } from '../catalogo/catalogo'
import type { Almacenamiento } from './almacenamiento'

const CLAVE = 'sushi-counter'
const VERSION_ACTUAL = 1

/** Número de Plato → veces que se tomó. */
export type Veces = Record<NumeroDePlato, number>

interface VisitaActiva {
  /** Milisegundos desde epoch. */
  inicio: number
  /** Milisegundos desde epoch. */
  ultimaActividad: number
  veces: Veces
}

export interface VisitaTerminada extends VisitaActiva {
  /** Milisegundos desde epoch. */
  fin: number
}

export interface Guardado {
  version: typeof VERSION_ACTUAL
  visitaActiva: VisitaActiva | null
  visitasTerminadas: VisitaTerminada[]
  apodo: string | null
  /** Si ya se preguntó el Apodo (aunque se haya salteado). Opcional: falta en lo guardado antes de existir. */
  apodoPreguntado?: boolean
}

function guardadoVacio(): Guardado {
  return { version: VERSION_ACTUAL, visitaActiva: null, visitasTerminadas: [], apodo: null }
}

/** Lee lo guardado; si no hay nada, o no se entiende, empieza de cero. */
export function leerGuardado(almacenamiento: Almacenamiento): Guardado {
  const texto = almacenamiento.get(CLAVE)
  if (texto === null) return guardadoVacio()
  try {
    const datos: unknown = JSON.parse(texto)
    if (esGuardadoV1(datos)) return datos
  } catch {
    // JSON roto: se descarta.
  }
  return guardadoVacio()
}

export function escribirGuardado(almacenamiento: Almacenamiento, guardado: Guardado): void {
  almacenamiento.set(CLAVE, JSON.stringify(guardado))
}

function esGuardadoV1(datos: unknown): datos is Guardado {
  if (typeof datos !== 'object' || datos === null) return false
  const g = datos as Partial<Guardado>
  return (
    g.version === 1 &&
    (g.visitaActiva === null || esVisita(g.visitaActiva)) &&
    Array.isArray(g.visitasTerminadas) &&
    g.visitasTerminadas.every((v) => esVisita(v) && typeof v.fin === 'number') &&
    (g.apodo === null || typeof g.apodo === 'string') &&
    (g.apodoPreguntado === undefined || typeof g.apodoPreguntado === 'boolean')
  )
}

function esVisita(v: unknown): v is VisitaActiva {
  if (typeof v !== 'object' || v === null) return false
  const visita = v as Partial<VisitaActiva>
  return (
    typeof visita.inicio === 'number' &&
    typeof visita.ultimaActividad === 'number' &&
    typeof visita.veces === 'object' &&
    visita.veces !== null &&
    Object.values(visita.veces).every((n) => Number.isInteger(n) && n > 0)
  )
}

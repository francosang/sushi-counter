/**
 * El núcleo de lógica: todo lo que la app sabe hacer, independiente de React.
 * Se construye con el Catálogo, un almacenamiento y un reloj inyectables.
 */
import type { Plato } from '../catalogo/catalogo'
import type { Almacenamiento } from './almacenamiento'
import { escribirGuardado, leerGuardado, type Guardado, type Veces } from './formato'

export interface DependenciasDelNucleo {
  catalogo: readonly Plato[]
  almacenamiento: Almacenamiento
  /** Devuelve "ahora". */
  reloj: () => Date
}

export interface Consumo {
  /** Número de Plato → veces que se tomó en la Visita activa. Solo Platos del Catálogo actual. */
  veces: Readonly<Veces>
  /** Suma de veces × Piezas del Catálogo actual. */
  totalPiezas: number
  /** Las líneas del detalle: una por Plato tomado, de más a menos Piezas; a igual Piezas, en el orden de la Carta. */
  lineas: readonly LineaDeConsumo[]
}

/** Una línea del detalle de Consumo. */
export interface LineaDeConsumo {
  plato: Plato
  veces: number
  /** veces × Piezas del Plato. */
  piezas: number
}

export interface Nucleo {
  /** Suma un Plato al Consumo de la Visita activa; crea la Visita si no hay ninguna. */
  tomar(numero: string): void
  /** Resta un Plato entero. Si ese Plato no se había tomado, no hace nada. */
  devolver(numero: string): void
  /** El Consumo de la Visita activa. Devuelve el mismo objeto mientras nada cambie. */
  consumo(): Consumo
  /** Avisa de cada cambio. Devuelve la función para dejar de escuchar. */
  suscribir(alCambiar: () => void): () => void
}

export function crearNucleo({ catalogo, almacenamiento, reloj }: DependenciasDelNucleo): Nucleo {
  const platos = new Map(catalogo.map((plato) => [plato.numero, plato]))
  const oyentes = new Set<() => void>()
  let guardado: Guardado = leerGuardado(almacenamiento)
  let consumoCalculado: Consumo | null = null

  function cambiar(modificar: (guardado: Guardado, ahora: number) => Guardado | null) {
    const nuevo = modificar(guardado, reloj().getTime())
    if (nuevo === null) return
    guardado = nuevo
    consumoCalculado = null
    escribirGuardado(almacenamiento, guardado)
    for (const alCambiar of oyentes) alCambiar()
  }

  function calcularConsumo(): Consumo {
    const veces: Veces = {}
    let totalPiezas = 0
    for (const [numero, n] of Object.entries(guardado.visitaActiva?.veces ?? {})) {
      const plato = platos.get(numero)
      if (!plato) continue // Un Plato que ya no está en el Catálogo se ignora.
      veces[numero] = n
      totalPiezas += n * plato.piezas
    }
    return { veces, totalPiezas, lineas: lineasDelDetalle(veces) }
  }

  function lineasDelDetalle(veces: Veces): LineaDeConsumo[] {
    // Se recorre el Catálogo para que, a igual Piezas, quede el orden de la Carta (sort es estable).
    return catalogo
      .filter((plato) => veces[plato.numero])
      .map((plato) => ({ plato, veces: veces[plato.numero], piezas: veces[plato.numero] * plato.piezas }))
      .sort((a, b) => b.piezas - a.piezas)
  }

  return {
    tomar(numero) {
      if (!platos.has(numero)) return
      cambiar((g, ahora) => {
        const visita = g.visitaActiva ?? { inicio: ahora, ultimaActividad: ahora, veces: {} }
        return {
          ...g,
          visitaActiva: {
            ...visita,
            ultimaActividad: ahora,
            veces: { ...visita.veces, [numero]: (visita.veces[numero] ?? 0) + 1 },
          },
        }
      })
    },

    devolver(numero) {
      cambiar((g, ahora) => {
        const visita = g.visitaActiva
        const actuales = visita?.veces[numero] ?? 0
        if (!visita || actuales === 0) return null
        const { [numero]: _, ...resto } = visita.veces
        const veces = actuales > 1 ? { ...resto, [numero]: actuales - 1 } : resto
        return { ...g, visitaActiva: { ...visita, ultimaActividad: ahora, veces } }
      })
    },

    consumo() {
      consumoCalculado ??= calcularConsumo()
      return consumoCalculado
    },

    suscribir(alCambiar) {
      oyentes.add(alCambiar)
      return () => oyentes.delete(alCambiar)
    },
  }
}

/**
 * El núcleo de lógica: todo lo que la app sabe hacer, independiente de React.
 * Se construye con el Catálogo, un almacenamiento y un reloj inyectables.
 */
import { agruparPorCategoria, type GrupoDeCategoria, type NumeroDePlato, type Plato } from '../catalogo/catalogo'
import type { Almacenamiento } from './almacenamiento'
import { escribirGuardado, leerGuardado, type Guardado, type Veces, type VisitaTerminada } from './formato'
import { RESTAURANTE, textoDePiezas } from './textos'

export type { Veces }

/** Pasado este tiempo sin actividad (estrictamente más), se pregunta si sigue la misma Visita. */
const INACTIVIDAD_PARA_CONFIRMAR = 6 * 60 * 60 * 1000

/** Cuántas líneas del detalle entran en el texto para compartir. */
const PLATOS_PRINCIPALES = 3

/** Un Apodo vacío o en blanco cuenta como sin Apodo. */
function limpiarApodo(apodo: string | null | undefined): string | null {
  const limpio = apodo?.trim() ?? ''
  return limpio === '' ? null : limpio
}

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
  /**
   * Los Platos que coinciden con el texto, en el orden de la Carta. Busca pedazos del
   * nombre y la categoría sin importar tildes ni mayúsculas. Un texto numérico busca desde el
   * principio de los dígitos del número, sin ceros a la izquierda ("45" → "045", "150" → "G150");
   * el Plato con exactamente ese número va primero.
   */
  buscar(texto: string): readonly Plato[]
  /** El Catálogo agrupado por categoría; los grupos y sus Platos, en el orden de la Carta. Siempre el mismo objeto. */
  platosPorCategoria(): readonly GrupoDeCategoria[]
  /** Suma un Plato al Consumo de la Visita activa; crea la Visita si no hay ninguna. */
  tomar(numero: NumeroDePlato): void
  /** Resta un Plato entero. Si ese Plato no se había tomado, no hace nada. */
  devolver(numero: NumeroDePlato): void
  /** El Consumo de la Visita activa. Devuelve el mismo objeto mientras nada cambie. */
  consumo(): Consumo
  /**
   * El resumen en texto para mandar a los amigos: total de Piezas, el restaurante y los
   * 3 Platos principales (las primeras líneas del detalle). Sin argumento usa el Apodo
   * guardado; `null`, vacío o en blanco = sin Apodo (texto genérico).
   */
  textoParaCompartir(apodo?: string | null): string
  /** El Apodo guardado, o `null` si no hay. */
  apodo(): string | null
  /** Si ya se le preguntó el Apodo (aunque lo haya salteado). */
  apodoPreguntado(): boolean
  /** Guarda el Apodo y lo marca como preguntado. `null`, vacío o en blanco = saltear (sin Apodo). */
  guardarApodo(apodo: string | null): void
  /** Pasa la Visita activa al historial con su fecha de fin. El Consumo queda vacío. Sin Visita activa, no hace nada. */
  terminarVisita(): void
  /** Registra actividad en la Visita activa sin tocar el Consumo ("Seguir" en el diálogo). Sin Visita activa, no hace nada. */
  seguirVisita(): void
  /**
   * Si hay una Visita activa: empieza con el primer `tomar` y dura hasta `terminarVisita`,
   * aunque su Consumo quede vacío (Platos devueltos o que ya no están en el Catálogo).
   */
  hayVisitaActiva(): boolean
  /** Verdadero si hay una Visita activa y la última actividad fue hace más de 6 horas. */
  necesitaConfirmarVisita(): boolean
  /** Las Visitas terminadas guardadas en el celular, de la más vieja a la más nueva. */
  visitasTerminadas(): readonly VisitaTerminada[]
  /** Avisa de cada cambio. Devuelve la función para dejar de escuchar. */
  suscribir(alCambiar: () => void): () => void
}

export function crearNucleo({ catalogo, almacenamiento, reloj }: DependenciasDelNucleo): Nucleo {
  const platos = new Map(catalogo.map((plato) => [plato.numero, plato]))
  const oyentes = new Set<() => void>()
  let guardado: Guardado = leerGuardado(almacenamiento)
  let consumoCalculado: Consumo | null = null
  const grupos = agruparPorCategoria(catalogo)

  function cambiar(modificar: (guardado: Guardado, ahora: number) => Guardado | null) {
    const nuevo = modificar(guardado, reloj().getTime())
    if (nuevo === null) return
    guardado = nuevo
    consumoCalculado = null
    escribirGuardado(almacenamiento, guardado)
    for (const alCambiar of oyentes) alCambiar()
  }

  function consumo(): Consumo {
    consumoCalculado ??= calcularConsumo()
    return consumoCalculado
  }

  function calcularConsumo(): Consumo {
    const veces: Veces = {}
    let totalPiezas = 0
    for (const [numero, vecesTomado] of Object.entries(guardado.visitaActiva?.veces ?? {})) {
      const plato = platos.get(numero)
      if (!plato) continue // Un Plato que ya no está en el Catálogo se ignora.
      veces[numero] = vecesTomado
      totalPiezas += vecesTomado * plato.piezas
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
    buscar(texto) {
      const buscado = normalizar(texto)
      const esNumero = /^\d+$/.test(buscado)
      // Un texto numérico busca desde el principio de los dígitos del Plato ("45" → "045", "150" → "G150");
      // si no, cualquier pedazo del número ("p1" → "P1", "P10").
      const coincideElNumero = (plato: Plato) =>
        esNumero
          ? sinCeros(soloDigitos(plato.numero)).startsWith(sinCeros(buscado))
          : normalizar(plato.numero).includes(buscado)
      const encontrados = catalogo.filter(
        (plato) =>
          normalizar(plato.nombre).includes(buscado) ||
          normalizar(plato.categoria).includes(buscado) ||
          coincideElNumero(plato),
      )
      // El Plato con exactamente ese número va primero; el resto, en el orden de la Carta.
      const esExacto = (plato: Plato) => sinCeros(normalizar(plato.numero)) === sinCeros(buscado)
      return [...encontrados.filter(esExacto), ...encontrados.filter((p) => !esExacto(p))]
    },

    platosPorCategoria() {
      return grupos
    },

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

    consumo,

    textoParaCompartir(apodo) {
      const quien = limpiarApodo(apodo === undefined ? guardado.apodo : apodo)
      const { totalPiezas, lineas } = consumo()
      if (totalPiezas === 0) {
        return quien
          ? `🍣 ${quien} todavía no tomó ninguna pieza en ${RESTAURANTE}`
          : `🍣 Todavía no tomé ninguna pieza en ${RESTAURANTE}`
      }
      const piezas = textoDePiezas(totalPiezas)
      const lleva = quien ? `${quien} lleva` : 'Llevo'
      const platosPrincipales = lineas
        .slice(0, PLATOS_PRINCIPALES)
        .map((l) => `${l.plato.nombre} ×${l.veces}`)
        .join(', ')
      return `🍣 ${lleva} ${piezas} en ${RESTAURANTE} — top: ${platosPrincipales}`
    },

    apodo() {
      return guardado.apodo
    },

    apodoPreguntado() {
      return guardado.apodoPreguntado ?? false
    },

    guardarApodo(apodo) {
      const limpio = limpiarApodo(apodo)
      cambiar((g) => {
        if (g.apodo === limpio && g.apodoPreguntado) return null
        return { ...g, apodo: limpio, apodoPreguntado: true }
      })
    },

    terminarVisita() {
      cambiar((g, ahora) => {
        const visita = g.visitaActiva
        if (!visita) return null
        return { ...g, visitaActiva: null, visitasTerminadas: [...g.visitasTerminadas, { ...visita, fin: ahora }] }
      })
    },

    seguirVisita() {
      cambiar((g, ahora) => {
        const visita = g.visitaActiva
        if (!visita) return null
        return { ...g, visitaActiva: { ...visita, ultimaActividad: ahora } }
      })
    },

    hayVisitaActiva() {
      return guardado.visitaActiva !== null
    },

    necesitaConfirmarVisita() {
      const visita = guardado.visitaActiva
      return visita !== null && reloj().getTime() - visita.ultimaActividad > INACTIVIDAD_PARA_CONFIRMAR
    },

    visitasTerminadas() {
      return guardado.visitasTerminadas
    },

    suscribir(alCambiar) {
      oyentes.add(alCambiar)
      return () => oyentes.delete(alCambiar)
    },
  }
}

/** Minúsculas y sin tildes ni diacríticos, para comparar textos al buscar. */
function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

/** La parte numérica de un número de Plato ("G150" → "150"). */
function soloDigitos(numero: NumeroDePlato): string {
  return numero.replace(/\D/g, '')
}

/** Quita los ceros a la izquierda, dejando al menos un dígito ("045" → "45", "000" → "0"). */
function sinCeros(numero: string): string {
  return numero.replace(/^0+(?=\d)/, '')
}

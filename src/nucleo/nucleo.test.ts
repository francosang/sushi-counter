import { beforeEach, describe, expect, it } from 'vitest'
import type { Plato } from '../catalogo/catalogo'
import type { Almacenamiento } from './almacenamiento'
import { crearNucleo, type Nucleo } from './nucleo'

const catalogoDePrueba: Plato[] = [
  { numero: '045', nombre: 'Nigiri de salmón', piezas: 2, categoria: 'Nigiri' },
  { numero: '158', nombre: 'Uramaki California', piezas: 8, categoria: 'Uramaki' },
  { numero: '201', nombre: 'Ebi tempura', piezas: 1, categoria: 'Temaki' },
  { numero: 'P1', nombre: 'Mochi', piezas: 1, categoria: 'Postres' },
]

let valoresGuardados: Map<string, string>
let almacenamiento: Almacenamiento
let ahora: number

const reloj = () => new Date(ahora)
const nuevoNucleo = (catalogo: readonly Plato[] = catalogoDePrueba) =>
  crearNucleo({ catalogo, almacenamiento, reloj })
const almacenamientoGuardado = () => valoresGuardados.values()
/** Las veces y el total del Consumo, sin las líneas del detalle (que tienen sus propios tests). */
const vecesYTotal = (nucleo: Nucleo) => {
  const { veces, totalPiezas } = nucleo.consumo()
  return { veces, totalPiezas }
}

beforeEach(() => {
  // Almacenamiento en memoria que deja ver lo escrito, para revisar el formato guardado.
  valoresGuardados = new Map()
  almacenamiento = {
    get: (clave) => valoresGuardados.get(clave) ?? null,
    set: (clave, valor) => void valoresGuardados.set(clave, valor),
  }
  ahora = Date.parse('2026-11-13T20:00:00Z')
})

describe('tomar', () => {
  it('tomar dos veces un Plato de 8 Piezas da un total de 16', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    nucleo.tomar('158')
    expect(nucleo.consumo().totalPiezas).toBe(16)
  })

  it('un Plato de 1 Pieza suma 1', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('201')
    expect(nucleo.consumo().totalPiezas).toBe(1)
  })

  it('el total suma las Piezas de cada Plato tomado', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.tomar('158')
    nucleo.tomar('P1')
    expect(nucleo.consumo().totalPiezas).toBe(11)
  })

  it('cuenta cuántas veces se tomó cada Plato', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.tomar('045')
    nucleo.tomar('P1')
    expect(nucleo.consumo().veces).toEqual({ '045': 2, P1: 1 })
  })

  it('distingue números con ceros a la izquierda', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('45')
    expect(nucleo.consumo().totalPiezas).toBe(0)
  })

  it('sin tomar nada el Consumo está vacío', () => {
    expect(vecesYTotal(nuevoNucleo())).toEqual({ veces: {}, totalPiezas: 0 })
  })

  it('tomar un número que no está en el Catálogo no hace nada', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('999')
    expect(vecesYTotal(nucleo)).toEqual({ veces: {}, totalPiezas: 0 })
  })
})

describe('devolver', () => {
  it('resta un Plato entero', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    nucleo.tomar('158')
    nucleo.devolver('158')
    expect(vecesYTotal(nucleo)).toEqual({ veces: { '158': 1 }, totalPiezas: 8 })
  })

  it('devolver el último Plato lo saca del Consumo', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    nucleo.devolver('158')
    expect(vecesYTotal(nucleo)).toEqual({ veces: {}, totalPiezas: 0 })
  })

  it('devolver un Plato no tomado no hace nada', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.devolver('158')
    expect(vecesYTotal(nucleo)).toEqual({ veces: { '045': 1 }, totalPiezas: 2 })
  })

  it('nunca baja de cero', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.devolver('045')
    nucleo.devolver('045')
    nucleo.tomar('045')
    expect(vecesYTotal(nucleo)).toEqual({ veces: { '045': 1 }, totalPiezas: 2 })
  })

  it('devolver sin Visita activa no hace nada', () => {
    const nucleo = nuevoNucleo()
    nucleo.devolver('045')
    expect(vecesYTotal(nucleo)).toEqual({ veces: {}, totalPiezas: 0 })
  })
})

describe('persistencia', () => {
  it('un núcleo nuevo con el mismo almacenamiento conserva el Consumo', () => {
    const primero = nuevoNucleo()
    primero.tomar('158')
    primero.tomar('045')
    primero.tomar('045')
    primero.devolver('045')

    expect(vecesYTotal(nuevoNucleo())).toEqual({ veces: { '158': 1, '045': 1 }, totalPiezas: 10 })
  })

  it('las Piezas se calculan con el Catálogo actual, no con el de cuando se tomó', () => {
    nuevoNucleo().tomar('158')
    const corregido = catalogoDePrueba.map((p) => (p.numero === '158' ? { ...p, piezas: 6 } : p))
    expect(nuevoNucleo(corregido).consumo().totalPiezas).toBe(6)
  })

  it('un Plato guardado que ya no está en el Catálogo se ignora sin errores', () => {
    const primero = nuevoNucleo()
    primero.tomar('158')
    primero.tomar('045')
    const sinElUramaki = catalogoDePrueba.filter((p) => p.numero !== '158')

    const nucleo = nuevoNucleo(sinElUramaki)
    expect(vecesYTotal(nucleo)).toEqual({ veces: { '045': 1 }, totalPiezas: 2 })
    nucleo.tomar('045')
    expect(nucleo.consumo().totalPiezas).toBe(4)
  })

  it('el formato guardado lleva número de versión', () => {
    nuevoNucleo().tomar('158')
    const guardados = [...almacenamientoGuardado()]
    expect(guardados.length).toBeGreaterThan(0)
    for (const valor of guardados) expect(JSON.parse(valor)).toMatchObject({ version: 1 })
  })

  it('lo guardado ilegible o de una versión desconocida se descarta sin errores', () => {
    const roto: Almacenamiento = { get: () => '{no es json', set: () => {} }
    const conRoto = crearNucleo({ catalogo: catalogoDePrueba, almacenamiento: roto, reloj })
    expect(conRoto.consumo().totalPiezas).toBe(0)

    const futuro: Almacenamiento = { get: () => JSON.stringify({ version: 99 }), set: () => {} }
    const conFuturo = crearNucleo({ catalogo: catalogoDePrueba, almacenamiento: futuro, reloj })
    expect(conFuturo.consumo().totalPiezas).toBe(0)
    conFuturo.tomar('201')
    expect(conFuturo.consumo().totalPiezas).toBe(1)
  })
})

describe('suscribir', () => {
  it('avisa cuando cambia el Consumo y deja de avisar al desuscribirse', () => {
    const nucleo = nuevoNucleo()
    let avisos = 0
    const dejar = nucleo.suscribir(() => avisos++)
    nucleo.tomar('158')
    nucleo.devolver('158')
    expect(avisos).toBe(2)

    dejar()
    nucleo.tomar('158')
    expect(avisos).toBe(2)
  })

  it('no avisa si no cambió nada', () => {
    const nucleo = nuevoNucleo()
    let avisos = 0
    nucleo.suscribir(() => avisos++)
    nucleo.devolver('158')
    nucleo.tomar('999')
    expect(avisos).toBe(0)
  })

  it('consumo() devuelve el mismo objeto mientras nada cambie', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    const antes = nucleo.consumo()
    expect(nucleo.consumo()).toBe(antes)
    nucleo.tomar('158')
    expect(nucleo.consumo()).not.toBe(antes)
  })
})

describe('líneas del detalle', () => {
  it('cada Plato tomado da una línea con veces y Piezas, de más a menos Piezas', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.tomar('045')
    nucleo.tomar('045')
    nucleo.tomar('158')
    nucleo.tomar('201')
    expect(nucleo.consumo().lineas).toEqual([
      { plato: catalogoDePrueba[1], veces: 1, piezas: 8 },
      { plato: catalogoDePrueba[0], veces: 3, piezas: 6 },
      { plato: catalogoDePrueba[2], veces: 1, piezas: 1 },
    ])
  })

  it('a igual Piezas, las líneas siguen el orden de la Carta, no el orden en que se tomó', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('P1')
    nucleo.tomar('201')
    nucleo.tomar('158')
    for (let i = 0; i < 4; i++) nucleo.tomar('045')
    expect(nucleo.consumo().lineas.map((l) => [l.plato.numero, l.piezas])).toEqual([
      ['045', 8],
      ['158', 8],
      ['201', 1],
      ['P1', 1],
    ])
  })

  it('sin Consumo no hay líneas', () => {
    expect(nuevoNucleo().consumo().lineas).toEqual([])
  })

  it('devolver actualiza la línea, y devolver el último la quita', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    nucleo.tomar('158')
    nucleo.tomar('045')
    nucleo.devolver('158')
    expect(nucleo.consumo().lineas).toEqual([
      { plato: catalogoDePrueba[1], veces: 1, piezas: 8 },
      { plato: catalogoDePrueba[0], veces: 1, piezas: 2 },
    ])
    nucleo.devolver('158')
    expect(nucleo.consumo().lineas).toEqual([{ plato: catalogoDePrueba[0], veces: 1, piezas: 2 }])
  })

  it('un Plato guardado que ya no está en el Catálogo no aparece en el detalle', () => {
    const primero = nuevoNucleo()
    primero.tomar('158')
    primero.tomar('045')
    const sinElUramaki = catalogoDePrueba.filter((p) => p.numero !== '158')
    expect(nuevoNucleo(sinElUramaki).consumo().lineas).toEqual([
      { plato: catalogoDePrueba[0], veces: 1, piezas: 2 },
    ])
  })
})

const HORA = 60 * 60 * 1000

describe('ciclo de la Visita', () => {
  it('después de terminarVisita() el total es 0 y el historial guardado tiene una Visita con su fecha de fin', () => {
    const inicio = ahora
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    nucleo.tomar('045')
    ahora += 2 * HORA
    nucleo.terminarVisita()

    expect(vecesYTotal(nucleo)).toEqual({ veces: {}, totalPiezas: 0 })
    expect(nuevoNucleo().visitasTerminadas()).toEqual([
      { inicio, ultimaActividad: inicio, fin: inicio + 2 * HORA, veces: { '158': 1, '045': 1 } },
    ])
  })

  it('necesitaConfirmarVisita() es verdadero a las 7 horas de la última actividad y falso a las 5', () => {
    nuevoNucleo().tomar('158')
    ahora += 5 * HORA
    expect(nuevoNucleo().necesitaConfirmarVisita()).toBe(false)
    ahora += 2 * HORA
    expect(nuevoNucleo().necesitaConfirmarVisita()).toBe(true)
  })

  it('a las 6 horas justas todavía no pregunta: tienen que ser más de 6', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    ahora += 6 * HORA
    expect(nucleo.necesitaConfirmarVisita()).toBe(false)
    ahora += 1
    expect(nucleo.necesitaConfirmarVisita()).toBe(true)
  })

  it('el primer tomar crea la Visita activa, y la Visita empieza en ese momento', () => {
    const nucleo = nuevoNucleo()
    ahora += HORA
    const primerToque = ahora
    nucleo.tomar('045')
    ahora += 7 * HORA
    expect(nucleo.necesitaConfirmarVisita()).toBe(true)

    nucleo.terminarVisita()
    expect(nucleo.visitasTerminadas()).toMatchObject([{ inicio: primerToque }])
  })

  it('después de terminar, el próximo tomar empieza una Visita nueva', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.terminarVisita()
    ahora += HORA
    nucleo.tomar('158')
    nucleo.terminarVisita()

    expect(nucleo.visitasTerminadas()).toEqual([
      { inicio: ahora - HORA, ultimaActividad: ahora - HORA, fin: ahora - HORA, veces: { '045': 1 } },
      { inicio: ahora, ultimaActividad: ahora, fin: ahora, veces: { '158': 1 } },
    ])
  })

  it('terminarVisita() sin Visita activa no guarda nada ni avisa', () => {
    const nucleo = nuevoNucleo()
    let avisos = 0
    nucleo.suscribir(() => avisos++)
    nucleo.terminarVisita()
    expect(nucleo.visitasTerminadas()).toEqual([])
    expect(avisos).toBe(0)
  })

  it('tomar registra actividad', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    ahora += 5 * HORA
    nucleo.tomar('045')
    ahora += 5 * HORA
    expect(nucleo.necesitaConfirmarVisita()).toBe(false)
  })

  it('devolver registra actividad', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('045')
    nucleo.tomar('045')
    ahora += 5 * HORA
    nucleo.devolver('045')
    ahora += 5 * HORA
    expect(nucleo.necesitaConfirmarVisita()).toBe(false)
  })

  it('seguirVisita() registra actividad y conserva el Consumo', () => {
    const nucleo = nuevoNucleo()
    nucleo.tomar('158')
    ahora += 7 * HORA
    nucleo.seguirVisita()
    expect(nuevoNucleo().necesitaConfirmarVisita()).toBe(false)
    expect(vecesYTotal(nuevoNucleo())).toEqual({ veces: { '158': 1 }, totalPiezas: 8 })
  })

  it('seguirVisita() sin Visita activa no crea ninguna', () => {
    const nucleo = nuevoNucleo()
    nucleo.seguirVisita()
    nucleo.terminarVisita()
    expect(nucleo.visitasTerminadas()).toEqual([])
  })

  it('sin Visita activa, necesitaConfirmarVisita() es falso', () => {
    const nucleo = nuevoNucleo()
    ahora += 7 * HORA
    expect(nucleo.necesitaConfirmarVisita()).toBe(false)

    nucleo.tomar('158')
    nucleo.terminarVisita()
    ahora += 7 * HORA
    expect(nucleo.necesitaConfirmarVisita()).toBe(false)
  })
})

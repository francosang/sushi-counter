import { describe, expect, it } from 'vitest'
import { agruparPorCategoria, catalogo, validarCatalogo } from './catalogo'

describe('el Catálogo publicado', () => {
  it('tiene Platos', () => {
    expect(catalogo.length).toBeGreaterThan(0)
  })

  it('es válido', () => {
    expect(validarCatalogo(catalogo)).toEqual([])
  })
})

const plato = (numero: string, nombre = 'Maguro', piezas = 1, categoria = 'Temaki') => ({
  numero,
  nombre,
  piezas,
  categoria,
})

describe('validarCatalogo', () => {
  it('acepta un Catálogo bien formado, con números tal cual los imprime la Carta', () => {
    expect(
      validarCatalogo([
        plato('045'),
        plato('202', 'Ura ghibli', 4, 'Dutou'),
        plato('G150'),
        plato('P1', 'Mochi', 1, 'Postres'),
      ]),
    ).toEqual([])
  })

  it('rechaza números de Plato repetidos', () => {
    expect(validarCatalogo([plato('201'), plato('202'), plato('201')])).toEqual([
      'Plato 201: número repetido',
    ])
  })

  it('distingue números con ceros a la izquierda de los que no los tienen', () => {
    expect(validarCatalogo([plato('045'), plato('45')])).toEqual([])
  })

  it('rechaza un número vacío', () => {
    expect(validarCatalogo([plato(''), plato(' ')])).toEqual([
      'Plato "": número vacío',
      'Plato " ": número vacío',
    ])
  })

  it('rechaza piezas que no sean un entero ≥ 1', () => {
    expect(
      validarCatalogo([
        plato('1', 'A', 0),
        plato('2', 'B', -3),
        plato('3', 'C', 1.5),
        plato('4', 'D', 8),
      ]),
    ).toEqual([
      'Plato 1: piezas debe ser un entero ≥ 1',
      'Plato 2: piezas debe ser un entero ≥ 1',
      'Plato 3: piezas debe ser un entero ≥ 1',
    ])
  })

  it('rechaza nombre o categoría vacíos', () => {
    expect(validarCatalogo([plato('1', ''), plato('2', 'Maguro', 1, '  ')])).toEqual([
      'Plato 1: nombre vacío',
      'Plato 2: categoría vacía',
    ])
  })
})

describe('agruparPorCategoria', () => {
  it('agrupa por categoría respetando el orden de la Carta', () => {
    const grupos = agruparPorCategoria([
      plato('183', 'Onigiri', 1, 'Onigiri'),
      plato('201', 'Ebi tempura', 1, 'Temaki'),
      plato('184', 'Onigiri black', 1, 'Onigiri'),
      plato('202', 'Maguro', 1, 'Temaki'),
    ])
    expect(grupos.map((g) => [g.categoria, g.platos.map((p) => p.numero)])).toEqual([
      ['Onigiri', ['183', '184']],
      ['Temaki', ['201', '202']],
    ])
  })

  it('sin Platos no hay grupos', () => {
    expect(agruparPorCategoria([])).toEqual([])
  })
})

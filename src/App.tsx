import { agruparPorCategoria, catalogo, type Plato } from './catalogo/catalogo'
import { useConsumo, useNucleo } from './nucleo/react'
import { useState } from 'react'
import { DetalleDeConsumo } from './DetalleDeConsumo'

const grupos = agruparPorCategoria(catalogo)

export function App() {
  const { veces, totalPiezas } = useConsumo()
  const [verDetalle, setVerDetalle] = useState(false)
  if (verDetalle) return <DetalleDeConsumo alVolver={() => setVerDetalle(false)} />
  return (
    <main className="app">
      <header className="cabecera">
        <div>
          <h1>Sushi Counter</h1>
          <p>Kayi Sushi Barcelona</p>
        </div>
        <button
          type="button"
          className="total abre-detalle"
          aria-live="polite"
          aria-label={`${totalPiezas} ${totalPiezas === 1 ? 'pieza' : 'piezas'}. Ver detalle`}
          onClick={() => setVerDetalle(true)}
        >
          <span className="total-numero">{totalPiezas}</span>
          <span className="total-etiqueta">{totalPiezas === 1 ? 'pieza' : 'piezas'}</span>
        </button>
      </header>
      {grupos.map(({ categoria, platos }) => (
        <section key={categoria} className="categoria">
          <h2>{categoria}</h2>
          <ul>
            {platos.map((plato) => (
              <TarjetaDePlato key={plato.numero} plato={plato} veces={veces[plato.numero] ?? 0} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}

function TarjetaDePlato({ plato, veces }: { plato: Plato; veces: number }) {
  const nucleo = useNucleo()
  const tomado = veces > 0
  return (
    <li className={tomado ? 'tarjeta tomada' : 'tarjeta'}>
      <button type="button" className="tocar" onClick={() => nucleo.tomar(plato.numero)}>
        <span className="numero">{plato.numero}</span>
        <span className="nombre">{plato.nombre}</span>
        <span className="piezas">
          {plato.piezas} {plato.piezas === 1 ? 'pieza' : 'piezas'}
        </span>
        {tomado && <span className="veces">×{veces}</span>}
      </button>
      {tomado && (
        <button
          type="button"
          className="devolver"
          aria-label={`Restar un ${plato.nombre}`}
          onClick={() => nucleo.devolver(plato.numero)}
        >
          −
        </button>
      )}
    </li>
  )
}

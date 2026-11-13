import { useMemo, useRef, useState, type Ref } from 'react'
import type { Plato } from './catalogo/catalogo'
import type { Veces } from './nucleo/nucleo'
import { useConsumo, useNucleo } from './nucleo/react'
import { RESTAURANTE } from './nucleo/textos'
import { DetalleDeConsumo } from './DetalleDeConsumo'
import { Total } from './Total'

export function App() {
  const { veces } = useConsumo()
  const [verDetalle, setVerDetalle] = useState(false)
  const [texto, setTexto] = useState('')
  const buscador = useRef<HTMLInputElement>(null)

  // Al borrar la búsqueda, el buscador queda listo para escribir otra.
  function borrarBusqueda() {
    setTexto('')
    buscador.current?.focus()
  }

  if (verDetalle) return <DetalleDeConsumo alVolver={() => setVerDetalle(false)} />
  return (
    <main className="app">
      <header className="cabecera">
        <div>
          <h1>Sushi Counter</h1>
          <p>{RESTAURANTE}</p>
        </div>
        <Total alTocar={() => setVerDetalle(true)} />
        <Buscador ref={buscador} texto={texto} alCambiar={setTexto} alBorrar={borrarBusqueda} />
      </header>
      <ListaDePlatos texto={texto} veces={veces} />
    </main>
  )
}

function Buscador({
  ref,
  texto,
  alCambiar,
  alBorrar,
}: {
  ref: Ref<HTMLInputElement>
  texto: string
  alCambiar: (texto: string) => void
  alBorrar: () => void
}) {
  return (
    <div className="buscador" role="search">
      <input
        ref={ref}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="Buscar por nombre o número"
        aria-label="Buscar platos"
        value={texto}
        onChange={(e) => alCambiar(e.target.value)}
      />
      {texto && (
        <button type="button" className="borrar" aria-label="Borrar búsqueda" onClick={alBorrar}>
          ×
        </button>
      )}
    </div>
  )
}

/** Sin búsqueda, la Carta agrupada por categoría; con búsqueda, los resultados en una lista. */
function ListaDePlatos({
  texto,
  veces,
}: {
  texto: string
  veces: Readonly<Veces>
}) {
  const nucleo = useNucleo()
  const resultados = useMemo(() => nucleo.buscar(texto), [nucleo, texto])
  const grupos = nucleo.platosPorCategoria()
  const tarjeta = (plato: Plato) => (
    <TarjetaDePlato key={plato.numero} plato={plato} veces={veces[plato.numero] ?? 0} />
  )

  if (!texto.trim()) {
    return grupos.map(({ categoria, platos }) => (
      <section key={categoria} className="categoria">
        <h2>{categoria}</h2>
        <ul>{platos.map(tarjeta)}</ul>
      </section>
    ))
  }
  if (resultados.length === 0) {
    return <p className="sin-resultados">No hay platos con «{texto.trim()}»</p>
  }
  return (
    <section className="categoria resultados">
      <ul>{resultados.map(tarjeta)}</ul>
    </section>
  )
}

function TarjetaDePlato({ plato, veces }: { plato: Plato; veces: number }) {
  const nucleo = useNucleo()
  const tomado = veces > 0
  return (
    <li className={tomado ? 'tarjeta tomada' : 'tarjeta'}>
      <button
        type="button"
        className="tocar"
        onClick={() => nucleo.tomar(plato.numero)}
      >
        <span className="numero">{plato.numero}</span>
        <span className="nombre">{plato.nombre}</span>
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

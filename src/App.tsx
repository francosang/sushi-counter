import { useMemo, useRef, useState, type Ref } from 'react'
import { agruparPorCategoria, catalogo, type Plato } from './catalogo/catalogo'
import { useConsumo, useNucleo } from './nucleo/react'

const grupos = agruparPorCategoria(catalogo)

export function App() {
  const { veces, totalPiezas } = useConsumo()
  const [texto, setTexto] = useState('')
  const buscador = useRef<HTMLInputElement>(null)

  // Después de tocar un Plato, el buscador se limpia para buscar el siguiente.
  function limpiarBusqueda() {
    if (!texto) return
    setTexto('')
    window.scrollTo({ top: 0 })
    buscador.current?.focus()
  }

  return (
    <main className="app">
      <header className="cabecera">
        <div>
          <h1>Sushi Counter</h1>
          <p>Kayi Sushi Barcelona</p>
        </div>
        <div className="total" aria-live="polite">
          <span className="total-numero">{totalPiezas}</span>
          <span className="total-etiqueta">{totalPiezas === 1 ? 'pieza' : 'piezas'}</span>
        </div>
        <Buscador ref={buscador} texto={texto} alCambiar={setTexto} />
      </header>
      <ListaDePlatos texto={texto} veces={veces} alTocar={limpiarBusqueda} />
    </main>
  )
}

function Buscador({
  ref,
  texto,
  alCambiar,
}: {
  ref: Ref<HTMLInputElement>
  texto: string
  alCambiar: (texto: string) => void
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
        <button type="button" className="borrar" aria-label="Borrar búsqueda" onClick={() => alCambiar('')}>
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
  alTocar,
}: {
  texto: string
  veces: Readonly<Record<string, number>>
  alTocar: () => void
}) {
  const nucleo = useNucleo()
  const resultados = useMemo(() => nucleo.buscar(texto), [nucleo, texto])
  const tarjeta = (plato: Plato) => (
    <TarjetaDePlato key={plato.numero} plato={plato} veces={veces[plato.numero] ?? 0} alTocar={alTocar} />
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

function TarjetaDePlato({ plato, veces, alTocar }: { plato: Plato; veces: number; alTocar: () => void }) {
  const nucleo = useNucleo()
  const tomado = veces > 0
  return (
    <li className={tomado ? 'tarjeta tomada' : 'tarjeta'}>
      <button
        type="button"
        className="tocar"
        onClick={() => {
          nucleo.tomar(plato.numero)
          alTocar()
        }}
      >
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

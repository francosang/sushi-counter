import { agruparPorCategoria, catalogo, type Plato } from './catalogo/catalogo'

const grupos = agruparPorCategoria(catalogo)

export function App() {
  return (
    <main className="app">
      <header className="cabecera">
        <h1>Sushi Counter</h1>
        <p>Kayi Sushi Barcelona</p>
      </header>
      {grupos.map(({ categoria, platos }) => (
        <section key={categoria} className="categoria">
          <h2>{categoria}</h2>
          <ul>
            {platos.map((plato) => (
              <TarjetaDePlato key={plato.numero} plato={plato} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}

function TarjetaDePlato({ plato }: { plato: Plato }) {
  return (
    <li className="tarjeta">
      <span className="numero">{plato.numero}</span>
      <span className="nombre">{plato.nombre}</span>
      <span className="piezas">
        {plato.piezas} {plato.piezas === 1 ? 'pieza' : 'piezas'}
      </span>
    </li>
  )
}

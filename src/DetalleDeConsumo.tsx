import { Compartir } from './Compartir'
import { useConsumo } from './nucleo/react'

const piezasTexto = (n: number) => `${n} ${n === 1 ? 'pieza' : 'piezas'}`

/** El detalle del Consumo de la Visita activa: el total y una línea por Plato tomado. */
export function DetalleDeConsumo({ alVolver }: { alVolver: () => void }) {
  const { totalPiezas, lineas } = useConsumo()
  return (
    <main className="app detalle">
      <header className="cabecera">
        <button type="button" className="volver" onClick={alVolver}>
          ← Volver
        </button>
        <div className="total">
          <span className="total-numero">{totalPiezas}</span>
          <span className="total-etiqueta">{totalPiezas === 1 ? 'pieza' : 'piezas'}</span>
        </div>
      </header>

      <h2>Tu Consumo</h2>
      {lineas.length === 0 ? (
        <p className="detalle-vacio">Todavía no tomaste nada. Tocá un Plato en la lista para sumarlo.</p>
      ) : (
        <ul className="lineas">
          {lineas.map(({ plato, veces, piezas }) => (
            <li key={plato.numero} className="linea">
              <span className="numero">{plato.numero}</span>
              <span className="nombre">{plato.nombre}</span>
              <span className="veces">×{veces}</span>
              <span className="piezas">{piezasTexto(piezas)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="detalle-acciones">
        <Compartir />
        {/* Ticket 05: botón "Terminar visita" (con confirmación). */}
      </div>
    </main>
  )
}

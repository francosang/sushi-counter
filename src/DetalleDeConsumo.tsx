import { useState } from 'react'
import { Compartir } from './Compartir'
import { DialogoDeConfirmacion } from './DialogoDeConfirmacion'
import { useConsumo, useHayVisitaActiva, useNucleo } from './nucleo/react'
import { Total } from './Total'

/** El detalle del Consumo de la Visita activa: el total y una línea por Plato tomado. */
export function DetalleDeConsumo({ alVolver }: { alVolver: () => void }) {
  const { lineas } = useConsumo()
  const hayVisitaActiva = useHayVisitaActiva()
  const nucleo = useNucleo()
  const [confirmarTerminar, setConfirmarTerminar] = useState(false)
  // Mientras la pantalla está abierta, las líneas no se reordenan al editar,
  // para no tocar la línea equivocada.
  const [orden] = useState(() => lineas.map((l) => l.plato.numero))
  const lineasEnOrden = [...lineas].sort((a, b) => orden.indexOf(a.plato.numero) - orden.indexOf(b.plato.numero))
  return (
    <main className="app detalle">
      <header className="cabecera">
        <button type="button" className="volver" onClick={alVolver}>
          ← Volver
        </button>
        <Total />
      </header>

      <h2>Tu Consumo</h2>
      {lineas.length === 0 ? (
        <p className="detalle-vacio">Todavía no tomaste nada. Tocá un Plato en la lista para sumarlo.</p>
      ) : (
        <ul className="lineas">
          {lineasEnOrden.map(({ plato, veces }) => (
            <li key={plato.numero} className="linea">
              <span className="numero">{plato.numero}</span>
              <span className="nombre">{plato.nombre}</span>
              <span className="editar-veces">
                <button
                  type="button"
                  className="paso"
                  aria-label={`Restar un ${plato.nombre}`}
                  onClick={() => nucleo.devolver(plato.numero)}
                >
                  −
                </button>
                <span className="veces">×{veces}</span>
                <button
                  type="button"
                  className="paso"
                  aria-label={`Sumar un ${plato.nombre}`}
                  onClick={() => nucleo.tomar(plato.numero)}
                >
                  +
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="detalle-acciones">
        <Compartir />
        {hayVisitaActiva && (
          <button type="button" className="boton terminar-visita" onClick={() => setConfirmarTerminar(true)}>
            Terminar visita
          </button>
        )}
      </div>

      {confirmarTerminar && (
        <DialogoDeConfirmacion
          titulo="¿Terminar la visita?"
          textoCancelar="Cancelar"
          textoConfirmar="Terminar"
          alCancelar={() => setConfirmarTerminar(false)}
          alConfirmar={() => {
            nucleo.terminarVisita()
            setConfirmarTerminar(false)
            alVolver()
          }}
        >
          Se guarda en tu celular y el total vuelve a cero.
        </DialogoDeConfirmacion>
      )}
    </main>
  )
}

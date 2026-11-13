import { useState } from 'react'
import { Compartir } from './Compartir'
import { DialogoDeConfirmacion } from './DialogoDeConfirmacion'
import { useConsumo, useHayVisitaActiva, useNucleo } from './nucleo/react'
import { textoDePiezas } from './nucleo/textos'
import { Total } from './Total'

/** El detalle del Consumo de la Visita activa: el total y una línea por Plato tomado. */
export function DetalleDeConsumo({ alVolver }: { alVolver: () => void }) {
  const { lineas } = useConsumo()
  const hayVisitaActiva = useHayVisitaActiva()
  const nucleo = useNucleo()
  const [confirmarTerminar, setConfirmarTerminar] = useState(false)
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
          {lineas.map(({ plato, veces, piezas }) => (
            <li key={plato.numero} className="linea">
              <span className="numero">{plato.numero}</span>
              <span className="nombre">{plato.nombre}</span>
              <span className="veces">×{veces}</span>
              <span className="piezas">{textoDePiezas(piezas)}</span>
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

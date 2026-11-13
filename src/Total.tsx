import { useConsumo } from './nucleo/react'
import { palabraPiezas, textoDePiezas } from './nucleo/textos'

/** El total de Piezas de la Visita activa. Con `alTocar`, es un botón (abre el detalle). */
export function Total({ alTocar }: { alTocar?: () => void }) {
  const { totalPiezas } = useConsumo()
  const contenido = (
    <>
      <span className="total-numero">{totalPiezas}</span>
      <span className="total-etiqueta">{palabraPiezas(totalPiezas)}</span>
    </>
  )
  if (!alTocar) return <div className="total">{contenido}</div>
  return (
    <button
      type="button"
      className="total abre-detalle"
      aria-live="polite"
      aria-label={`${textoDePiezas(totalPiezas)}. Ver detalle`}
      onClick={alTocar}
    >
      {contenido}
    </button>
  )
}

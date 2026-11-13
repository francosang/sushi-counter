import { useId, type ReactNode } from 'react'
import { useDialogoModal } from './useDialogoModal'

interface Props {
  /** La pregunta, en una línea. */
  titulo: string
  /** Texto opcional debajo del título. */
  children?: ReactNode
  textoConfirmar: string
  textoCancelar: string
  alConfirmar: () => void
  /** También se llama si se cierra con Escape o el botón "atrás". */
  alCancelar: () => void
}

/**
 * Un diálogo modal de dos opciones, sobre lo que haya en pantalla.
 * Se muestra mientras está montado: para cerrarlo, dejar de renderizarlo.
 */
export function DialogoDeConfirmacion({
  titulo,
  children,
  textoConfirmar,
  textoCancelar,
  alConfirmar,
  alCancelar,
}: Props) {
  const dialogoModal = useDialogoModal(alCancelar)
  const idTitulo = useId()

  return (
    <dialog {...dialogoModal} className="dialogo" aria-labelledby={idTitulo}>
      <h2 id={idTitulo} className="dialogo-titulo">
        {titulo}
      </h2>
      {children && <div className="dialogo-texto">{children}</div>}
      <div className="dialogo-botones">
        <button type="button" className="boton" onClick={alCancelar}>
          {textoCancelar}
        </button>
        <button type="button" className="boton boton-principal" onClick={alConfirmar}>
          {textoConfirmar}
        </button>
      </div>
    </dialog>
  )
}

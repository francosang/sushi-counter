import { useEffect, useId, useState, type FormEvent } from 'react'
import { useApodo, useNucleo } from './nucleo/react'
import { useDialogoModal } from './useDialogoModal'

const DURACION_DEL_AVISO = 2500

type Dialogo = null | 'antes-de-compartir' | 'editar'

/**
 * "Compartir" el resumen del Consumo: menú nativo de compartir si existe; si no, al portapapeles.
 * La primera vez pide el Apodo (opcional). Debajo, un enlace para cambiar el Apodo.
 */
export function Compartir() {
  const nucleo = useNucleo()
  const apodo = useApodo()
  const [dialogo, setDialogo] = useState<Dialogo>(null)
  const [aviso, setAviso] = useState<string | null>(null)

  useEffect(() => {
    if (aviso === null) return
    const id = setTimeout(() => setAviso(null), DURACION_DEL_AVISO)
    return () => clearTimeout(id)
  }, [aviso])

  async function compartir() {
    const texto = nucleo.textoParaCompartir()
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ text: texto })
        return
      } catch (error) {
        // Si la persona cerró el menú, está todo bien.
        if (error instanceof DOMException && error.name === 'AbortError') return
        // Otro error (p. ej. sin permiso): se intenta copiar.
      }
    }
    try {
      await navigator.clipboard.writeText(texto)
      setAviso('Copiado al portapapeles')
    } catch {
      setAviso('No se pudo copiar el texto')
    }
  }

  function alTocarCompartir() {
    if (nucleo.apodoPreguntado()) void compartir()
    else setDialogo('antes-de-compartir')
  }

  function alElegirApodo(nuevo: string | null) {
    const siguiente = dialogo
    nucleo.guardarApodo(nuevo)
    setDialogo(null)
    // Se comparte dentro del mismo toque, para que el navegador permita abrir el menú.
    if (siguiente === 'antes-de-compartir') void compartir()
  }

  return (
    <div className="compartir">
      <button type="button" className="boton boton-principal" onClick={alTocarCompartir}>
        Compartir
      </button>
      <p className="apodo-actual">
        {apodo ? `Apodo: ${apodo}` : 'Sin Apodo'} ·{' '}
        <button type="button" className="enlace" onClick={() => setDialogo('editar')}>
          {apodo ? 'cambiar' : 'agregar'}
        </button>
      </p>
      {aviso && (
        <p className="aviso" role="status">
          {aviso}
        </p>
      )}
      {dialogo && (
        <DialogoApodo
          inicial={apodo ?? ''}
          paraCompartir={dialogo === 'antes-de-compartir'}
          alElegir={alElegirApodo}
          alCancelar={() => setDialogo(null)}
        />
      )}
    </div>
  )
}

/** Diálogo modal para escribir el Apodo; mismo estilo que `DialogoDeConfirmacion`. */
function DialogoApodo({
  inicial,
  paraCompartir,
  alElegir,
  alCancelar,
}: {
  inicial: string
  paraCompartir: boolean
  alElegir: (apodo: string | null) => void
  /** También se llama si se cierra con Escape o el botón "atrás". */
  alCancelar: () => void
}) {
  const [texto, setTexto] = useState(inicial)
  const dialogoModal = useDialogoModal(alCancelar)
  const idTitulo = useId()

  function alEnviar(evento: FormEvent) {
    evento.preventDefault()
    alElegir(texto)
  }

  return (
    <dialog {...dialogoModal} className="dialogo" aria-labelledby={idTitulo}>
      <form onSubmit={alEnviar}>
        <h2 id={idTitulo} className="dialogo-titulo">
          Tu Apodo
        </h2>
        <p className="dialogo-texto">Opcional. Aparece en lo que compartís, para que tus amigos sepan quién es.</p>
        <input
          className="dialogo-entrada"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej.: Franco"
          aria-label="Apodo"
          maxLength={40}
          autoComplete="nickname"
          enterKeyHint="done"
          autoFocus
        />
        <div className="dialogo-botones">
          {paraCompartir ? (
            <button type="button" className="boton" onClick={() => alElegir(null)}>
              Saltear
            </button>
          ) : (
            <button type="button" className="boton" onClick={alCancelar}>
              Cancelar
            </button>
          )}
          <button type="submit" className="boton boton-principal">
            {paraCompartir ? 'Compartir' : 'Guardar'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useApodo, useNucleo } from './nucleo/react'

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
      <button type="button" className="boton-principal" onClick={alTocarCompartir}>
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

function DialogoApodo({
  inicial,
  paraCompartir,
  alElegir,
  alCancelar,
}: {
  inicial: string
  paraCompartir: boolean
  alElegir: (apodo: string | null) => void
  alCancelar: () => void
}) {
  const [texto, setTexto] = useState(inicial)
  const entrada = useRef<HTMLInputElement>(null)

  useEffect(() => {
    entrada.current?.focus()
    const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && alCancelar()
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [alCancelar])

  function alEnviar(e: FormEvent) {
    e.preventDefault()
    alElegir(texto)
  }

  return (
    <div className="dialogo-fondo" onClick={alCancelar}>
      <form
        className="dialogo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogo-apodo-titulo"
        onClick={(e) => e.stopPropagation()}
        onSubmit={alEnviar}
      >
        <h2 id="dialogo-apodo-titulo">Tu Apodo</h2>
        <p>Opcional. Aparece en lo que compartís, para que tus amigos sepan quién es.</p>
        <input
          ref={entrada}
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej.: Franco"
          maxLength={40}
          autoComplete="nickname"
          enterKeyHint="done"
        />
        <div className="dialogo-botones">
          {paraCompartir ? (
            <button type="button" onClick={() => alElegir(null)}>
              Saltear
            </button>
          ) : (
            <button type="button" onClick={alCancelar}>
              Cancelar
            </button>
          )}
          <button type="submit" className="boton-principal">
            {paraCompartir ? 'Compartir' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}

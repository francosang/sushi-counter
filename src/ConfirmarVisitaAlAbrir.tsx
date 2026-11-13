import { useEffect, useState } from 'react'
import { DialogoDeConfirmacion } from './DialogoDeConfirmacion'
import { useNucleo } from './nucleo/react'

/**
 * Al abrir la app (o al volver a ella desde otra), si pasaron más de 6 horas
 * desde la última actividad, pregunta si sigue la misma Visita.
 */
export function ConfirmarVisitaAlAbrir() {
  const nucleo = useNucleo()
  const [preguntar, setPreguntar] = useState(() => nucleo.necesitaConfirmarVisita())

  useEffect(() => {
    // Una app instalada puede quedar abierta en segundo plano por horas.
    const alVolverALaApp = () => {
      if (document.visibilityState === 'visible' && nucleo.necesitaConfirmarVisita()) setPreguntar(true)
    }
    document.addEventListener('visibilitychange', alVolverALaApp)
    return () => document.removeEventListener('visibilitychange', alVolverALaApp)
  }, [nucleo])

  if (!preguntar) return null
  return (
    <DialogoDeConfirmacion
      titulo="¿Seguís en la misma visita o empezás una nueva?"
      textoCancelar="Seguir"
      textoConfirmar="Nueva"
      alCancelar={() => {
        nucleo.seguirVisita()
        setPreguntar(false)
      }}
      alConfirmar={() => {
        nucleo.terminarVisita()
        setPreguntar(false)
      }}
    >
      Tu última actividad fue hace más de 6 horas. Si empezás una nueva, la anterior se guarda y el total vuelve a
      cero.
    </DialogoDeConfirmacion>
  )
}

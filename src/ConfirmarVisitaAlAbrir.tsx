import { useEffect, useState } from 'react'
import { DialogoDeConfirmacion } from './DialogoDeConfirmacion'
import { useNucleo } from './nucleo/react'

/** Cada cuánto se revisa, con la app abierta en primer plano. */
const REVISAR_CADA = 60 * 1000

/**
 * Al abrir la app (o al volver a ella desde otra), si pasaron más de 6 horas
 * desde la última actividad, pregunta si sigue la misma Visita.
 */
export function ConfirmarVisitaAlAbrir() {
  const nucleo = useNucleo()
  const [preguntar, setPreguntar] = useState(() => nucleo.necesitaConfirmarVisita())

  useEffect(() => {
    // Una app instalada puede quedar abierta por horas: en segundo plano (se revisa al volver)
    // o en primer plano sin tocarla (se revisa cada minuto).
    const revisar = () => {
      if (document.visibilityState === 'visible' && nucleo.necesitaConfirmarVisita()) setPreguntar(true)
    }
    document.addEventListener('visibilitychange', revisar)
    const intervalo = setInterval(revisar, REVISAR_CADA)
    return () => {
      document.removeEventListener('visibilitychange', revisar)
      clearInterval(intervalo)
    }
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

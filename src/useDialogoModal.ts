import { useEffect, useRef, type SyntheticEvent } from 'react'

/**
 * Props para un `<dialog>` modal que se muestra mientras está montado: lo abre con
 * `showModal()` al montarse, lo cierra al desmontarse, y convierte Escape o el botón
 * "atrás" en `alCancelar` (para cerrarlo, dejar de renderizarlo).
 */
export function useDialogoModal(alCancelar: () => void) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialogo = ref.current
    if (dialogo && !dialogo.open) dialogo.showModal()
    return () => dialogo?.close()
  }, [])

  return {
    ref,
    onCancel: (evento: SyntheticEvent<HTMLDialogElement>) => {
      evento.preventDefault()
      alCancelar()
    },
  }
}

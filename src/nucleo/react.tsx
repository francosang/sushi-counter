/**
 * Capa fina entre React y el núcleo: un provider que lo publica y hooks
 * que se vuelven a renderizar cuando el núcleo avisa de un cambio.
 */
import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react'
import type { Consumo, Nucleo } from './nucleo'

const ContextoDelNucleo = createContext<Nucleo | null>(null)

export function NucleoProvider({ nucleo, children }: { nucleo: Nucleo; children: ReactNode }) {
  return <ContextoDelNucleo.Provider value={nucleo}>{children}</ContextoDelNucleo.Provider>
}

/** El núcleo, para llamar sus acciones (`tomar`, `devolver`, …). */
export function useNucleo(): Nucleo {
  const nucleo = useContext(ContextoDelNucleo)
  if (!nucleo) throw new Error('useNucleo necesita un <NucleoProvider>')
  return nucleo
}

/** El Consumo de la Visita activa; re-renderiza cuando cambia. */
export function useConsumo(): Consumo {
  const nucleo = useNucleo()
  return useSyncExternalStore(nucleo.suscribir, nucleo.consumo)
}

/** Si hay una Visita activa (aunque su Consumo esté vacío); re-renderiza cuando cambia. */
export function useHayVisitaActiva(): boolean {
  const nucleo = useNucleo()
  return useSyncExternalStore(nucleo.suscribir, nucleo.hayVisitaActiva)
}

/** El Apodo guardado (o `null`); re-renderiza cuando cambia. */
export function useApodo(): string | null {
  const nucleo = useNucleo()
  return useSyncExternalStore(nucleo.suscribir, nucleo.apodo)
}

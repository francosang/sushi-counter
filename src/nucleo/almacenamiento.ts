/** Interfaz mínima de almacenamiento de strings que necesita el núcleo. */
export interface Almacenamiento {
  get(clave: string): string | null
  set(clave: string, valor: string): void
}

/** Almacenamiento que vive solo en memoria (tests, o navegador sin almacenamiento). */
export function almacenamientoEnMemoria(): Almacenamiento {
  const datos = new Map<string, string>()
  return {
    get: (clave) => datos.get(clave) ?? null,
    set: (clave, valor) => void datos.set(clave, valor),
  }
}

/**
 * El almacenamiento del navegador. Si `localStorage` no está disponible
 * (modo privado, bloqueado), cae a memoria para que la app siga funcionando.
 */
export function almacenamientoDelNavegador(): Almacenamiento {
  try {
    const storage = window.localStorage
    const prueba = '__sushi-counter-prueba__'
    storage.setItem(prueba, prueba)
    storage.removeItem(prueba)
    return {
      get: (clave) => storage.getItem(clave),
      set: (clave, valor) => {
        try {
          storage.setItem(clave, valor)
        } catch {
          // Almacenamiento lleno o bloqueado: el Consumo sigue en memoria.
        }
      },
    }
  } catch {
    return almacenamientoEnMemoria()
  }
}

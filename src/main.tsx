import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { catalogo } from './catalogo/catalogo'
import { ConfirmarVisitaAlAbrir } from './ConfirmarVisitaAlAbrir'
import { almacenamientoDelNavegador } from './nucleo/almacenamiento'
import { crearNucleo } from './nucleo/nucleo'
import { NucleoProvider } from './nucleo/react'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

const nucleo = crearNucleo({
  catalogo,
  almacenamiento: almacenamientoDelNavegador(),
  reloj: () => new Date(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NucleoProvider nucleo={nucleo}>
      <App />
      <ConfirmarVisitaAlAbrir />
    </NucleoProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { catalogo } from './catalogo/catalogo'
import { almacenamientoDelNavegador } from './nucleo/almacenamiento'
import { crearNucleo } from './nucleo/nucleo'
import { NucleoProvider } from './nucleo/react'
import './index.css'

const nucleo = crearNucleo({
  catalogo,
  almacenamiento: almacenamientoDelNavegador(),
  reloj: () => new Date(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NucleoProvider nucleo={nucleo}>
      <App />
    </NucleoProvider>
  </StrictMode>,
)

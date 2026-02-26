import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Products from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Products />
  </StrictMode>,
)

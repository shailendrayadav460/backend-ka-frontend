import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Products from './App'
import DevPortfolio from './apps'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Products />
  </StrictMode>,
)

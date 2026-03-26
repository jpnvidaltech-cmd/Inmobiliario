/**
 * @file main.jsx
 * @description Punto de entrada principal para la SPA de la inmobiliaria.
 * Renderiza la aplicación React en el elemento root de index.html e inicializa los estilos básicos.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Inicialización de la aplicación React con el componente App.
 * El uso de StrictMode ayuda a identificar problemas potenciales en el código durante el desarrollo.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

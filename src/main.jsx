import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-day-picker/dist/style.css';
import './calendar.css'
import './index.css'
import './utility.css'
import { BrowserRouter } from "react-router";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

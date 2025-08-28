import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './index.css'
import './responsive.css'
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

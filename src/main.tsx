import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { Services } from './components/Services.tsx' // This is your PH component
import { ServicesHK } from './components/ServicesHK.tsx' // This is your HK component
import { DiscoveryForm } from './components/DiscoveryForm.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* FLIPPED THE ROUTES HERE */}
        <Route path="/services" element={<ServicesHK />} /> {/* Default is now premium HKD */}
        <Route path="/services-ph" element={<Services />} /> {/* Hidden link is now local PHP */}
        <Route path="/start" element={<DiscoveryForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
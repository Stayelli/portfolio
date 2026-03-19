import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { Services } from './components/Services.tsx'
import { ServicesHK } from './components/ServicesHK.tsx' // Import the new component
import { DiscoveryForm } from './components/DiscoveryForm.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services-hk" element={<ServicesHK />} /> {/* Add hidden route */}
        <Route path="/start" element={<DiscoveryForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { Services } from './components/Services.tsx' 
import { ServicesHK } from './components/ServicesHK.tsx' 
import { DiscoveryForm } from './components/DiscoveryForm.tsx'
import { NotFound } from './components/NotFound.tsx' // 1. THIS IS REQUIRED

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<ServicesHK />} /> 
        <Route path="/services-ph" element={<Services />} /> 
        <Route path="/start" element={<DiscoveryForm />} />
        
        {/* 2. THIS IS REQUIRED */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
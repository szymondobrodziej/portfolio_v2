import React from 'react'
import ReactDOM from 'react-dom/client'
import { init } from '@emailjs/browser';
import App from './App.jsx'
import './styles/globals.css'

// Initialize EmailJS with your public key
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
console.log('Initializing EmailJS with key:', publicKey);
init(publicKey);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

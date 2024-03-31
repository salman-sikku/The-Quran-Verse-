import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SuraProvider } from './context/AddtoRecentSura.jsx';
import { AudioPlayerProvider } from './context/AudioContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AudioPlayerProvider>
    <SuraProvider>
      <App />
    </SuraProvider>
  </AudioPlayerProvider>
)

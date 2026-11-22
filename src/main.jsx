import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './context/authProvider.jsx'
import FavouriteProvider from './context/FavouriteProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <FavouriteProvider>
       <App />    
       </FavouriteProvider>  
    </AuthProvider>
    </BrowserRouter>
   
  </StrictMode>,
)

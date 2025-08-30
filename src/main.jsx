import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="861043767846-t8cmchvdu2t5mltf5r25m55j5fngp6g2.apps.googleusercontent.com">
    <App></App>
    </GoogleOAuthProvider>
  </StrictMode>,
)

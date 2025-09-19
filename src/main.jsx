import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="886086124566-c780dbmdcbjg5nq4v1ju5arpvgfldb0o.apps.googleusercontent.com">
    <App></App>
    </GoogleOAuthProvider>
  </StrictMode>,
)

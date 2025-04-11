import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from "./contexts/ToastContext";
import { LoaderProvider } from './contexts/LoaderContext';
import { AuthWrapper } from './contexts/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <LoaderProvider>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </LoaderProvider>
    </ToastProvider>
  </StrictMode>,
)

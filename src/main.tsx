import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import Roboto font weights for MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/auth.context.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
              <App />
          </AuthProvider>
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

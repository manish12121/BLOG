import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'sonner';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import ThemeProvider from './components/ThemeProvider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster />
    </Provider>
  </StrictMode>,
)

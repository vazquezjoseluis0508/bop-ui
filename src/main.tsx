import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { darkTheme } from './styling/themeConfig'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const clientId = import.meta.env.VITE_AUTH0 || ''
const domain = import.meta.env.VITE_AUTHO_DOMAIN || ''

console.log(domain, clientId)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>

          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>
)

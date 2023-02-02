import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { darkTheme, theme } from './styling/themeConfig'
import { Router } from './routers/Router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const clientId = import.meta.env.VITE_AUTH0 || ''
const domain = import.meta.env.VITE_AUTHO_DOMAIN || ''

console.log(domain, clientId)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>
);

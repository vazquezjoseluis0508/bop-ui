import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { darkTheme } from './styling/themeConfig'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom'
import App from './App'
import queryClient from './queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const clientId = import.meta.env.VITE_AUTH0 || ''
const domain = import.meta.env.VITE_AUTHO_DOMAIN || ''

console.log(domain, clientId)

ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
)

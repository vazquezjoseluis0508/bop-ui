import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App/App'
import { store } from './store'
import { Auth0Provider } from '@auth0/auth0-react'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { darkTheme, theme } from './styling/themeConfig'
import { Router } from './routers/Router'

const clientId = import.meta.env.VITE_AUTH0 || ''
const domain = import.meta.env.VITE_AUTHO_DOMAIN || ''

console.log(domain, clientId)

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
  </Auth0Provider>
  // </React.StrictMode>
);

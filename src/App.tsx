import * as React from 'react'
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes/protected-route'
import { ROUTES } from './constant/routes'
import { LoginPage } from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import PedidosPage from './pages/PedidosPage'
import { SessionProvider } from './provider/SessionProvider'

export default function App () {
  return (
    <SessionProvider>
      <Routes>
        <Route path={ROUTES.pedidos} element={
            <ProtectedRoute>
                <PedidosPage />
            </ProtectedRoute>} />
        <Route path={ROUTES.login} element={<LoginPage/>} />
        <Route index element={<LoginPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </SessionProvider>
  )
}


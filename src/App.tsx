import * as React from 'react'
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes/protected-route'
import { ROUTES } from './constant/routes'
import { LoginPage } from './pages/login'
import NotFoundPage from './pages/NotFoundPage'
import PedidosPage from './pages/PedidosPage'
import { useAuthStore } from './store/auth'

export default function App () {

  const isAuth = useAuthStore(state => state.isAuth)

  return (
      <Routes>
        <Route path={ROUTES.login} element={<LoginPage/>} />
        <Route index element={<LoginPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
        <Route path={ROUTES.pedidos} element={
            <ProtectedRoute isAllowed={isAuth}>
                <PedidosPage />
            </ProtectedRoute>} />
      </Routes>
  )
}


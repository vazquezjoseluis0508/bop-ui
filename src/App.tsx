import * as React from 'react'
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes/Protected-route'
import { ROUTES } from './constant/routes'
import { useAuth } from './hook/useAuth.hook'
import { useCheckTokenExpiration } from './hook/useTokenExpiration'
import { LoginPage } from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import PedidosPage from './pages/PedidosPage'
import { SessionProvider } from './provider/SessionProvider'

export default function App () {
  return (
    <SessionProvider>
      <Routes>
        {/* <Route element={<ProtectedRoute children={undefined} />}>
          <Route  path="/pedidos" element={ <PedidosPage />}
          // agregar mas paginas protegidas
        /> */}
        {/* </Route> */}
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

function RequireAuth () {
  const { isLoading, isAuthenticated } = useAuth()
  const { pathname } = useLocation()
  const checkTokenExpiration = useCheckTokenExpiration()

  React.useEffect(() => {
    checkTokenExpiration()
    console.log('ProtectedRoute')
  })

  if (isLoading) {
    return (
        <> Circular Progres....</>
    )
  }

  if (!isAuthenticated) {
    return <Navigate replace to={ROUTES.login} />
  }

  switch (pathname) {
    case ROUTES.pedidos:
      return <PedidosPage />
    default:
      return <Navigate replace to={ROUTES.login} />
  }
}

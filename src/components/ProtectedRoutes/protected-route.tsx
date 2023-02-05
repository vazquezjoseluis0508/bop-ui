import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constant/routes'
import { useAuth } from '../../hook/useAuth.hook'

export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  if (isLoading) {
    return (
      <> Circular Progres....</>
    )
  }

  if (!isAuthenticated) {
    return <Navigate replace to={ROUTES.login} />
  }

  if (pathname === ROUTES.home) {
    return <Navigate to={ROUTES.pedidos} replace />
  }

  return <Outlet />
}

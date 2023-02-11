import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constant/routes'
import { useAuth } from '../../hook/useAuth.hook'
import { useCheckTokenExpiration } from '../../hook/useTokenExpiration'

export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth()
  const { pathname } = useLocation()
  const checkTokenExpiration = useCheckTokenExpiration();

  useEffect(() => {
    checkTokenExpiration();
    console.log('ProtectedRoute')
  });

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

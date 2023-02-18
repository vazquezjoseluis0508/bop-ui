import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constant/routes'
import { useAuth } from '../../hook/useAuth.hook'
import { useCheckTokenExpiration } from '../../hook/useTokenExpiration'
import { Layout } from '../Layout/Layout'

export const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth()
  const checkTokenExpiration = useCheckTokenExpiration()

  useEffect(() => {
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

  return children ? <Layout>{children}</Layout> : <Outlet />
}

import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constant/routes'
import { Layout } from '../Layout/layout'

interface Props {
  isAllowed?: boolean
  children?: React.ReactNode
}

export const ProtectedRoute = ({ children, isAllowed} : Props) => {

  if (!isAllowed) return <Navigate replace to={ROUTES.login} />


  return children ? <Layout>{children}</Layout> : <Outlet />
}

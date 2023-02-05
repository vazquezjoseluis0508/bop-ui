import { useDispatch, useSelector } from 'react-redux'
import { UserAuth } from '../controller/user.controller'
import { ApplicationState, Dispatch } from '../store'
import { AuthFormLoginValue } from '../types/auth.type'

export const useUser = () => {
  const dispatch = useDispatch<Dispatch>()
  const user = useSelector((state: ApplicationState) => state.auth)

  const setUserData = (props: Partial<UserAuth>) => {
    dispatch.user.setUser(props)
  }

  const handleGetMyData = async () => {
    return dispatch.user.handleGetMyData()
  }

  const handleLogout = async () => {
    return dispatch.user.logout()
  }

  const handleLogin = async (event: AuthFormLoginValue) => {
    return dispatch.user.login(event)
  }

  return {
    user,
    setUserData,
    handleGetMyData,
    handleLogout,
    handleLogin,
  }
}

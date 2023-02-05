import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'
import { ApiResponse } from '../types/api-response'

import { AuthFormLoginValue, IAuthEntity } from '../types/auth.type'


interface UseAuthResponse {
  handleSignOut: () => Promise<void>
  handleSignIn: (event: AuthFormLoginValue) => Promise<ApiResponse<IAuthEntity>>
  isAuthenticated: boolean
  isLoading: boolean
  handleIsAuthenticated: (value: boolean) => void
}

export const useAuth = (): UseAuthResponse => {
  return useContext(SessionContext)
}
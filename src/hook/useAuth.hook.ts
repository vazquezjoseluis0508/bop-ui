import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'
import { type ApiResponse } from '../types/api-response'

import { type AuthFormLoginValue, type IAuthEntity } from '../types/auth.type'

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

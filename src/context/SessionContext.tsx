import { createContext } from 'react'
import { type ApiResponse } from '../types/api-response'

import { type AuthFormLoginValue, type IAuthEntity } from '../types/auth.type'

interface SessionContextProps {
  handleSignOut: () => Promise<void>
  handleSignIn: (
    event: AuthFormLoginValue
  ) => Promise<ApiResponse<IAuthEntity>>
  isAuthenticated: boolean
  isLoading: boolean
  handleIsAuthenticated: (value: boolean) => void
}

const defaultContext: SessionContextProps = {
  handleSignIn: async () => await Promise.resolve({}),
  handleSignOut: async () => { await Promise.resolve() },
  isAuthenticated: false,
  isLoading: true,
  handleIsAuthenticated: () => null
}

export const SessionContext = createContext<SessionContextProps>(defaultContext)

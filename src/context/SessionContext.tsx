import { createContext } from 'react'
import { ApiResponse } from '../types/api-response'

import { AuthFormLoginValue, IAuthEntity } from '../types/auth.type'

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
  handleSignIn: () => Promise.resolve({}),
  handleSignOut: () => Promise.resolve(),
  isAuthenticated: false,
  isLoading: true,
  handleIsAuthenticated: () => null,
}


export const SessionContext = createContext<SessionContextProps>(defaultContext)

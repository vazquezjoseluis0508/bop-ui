import { useQuery } from '@tanstack/react-query'
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


// async function handleSignIn2 ( data: AuthFormLoginValue) {
//   const { data } = await api.post<IAuthEntity>('/auth/login', {
//     email: data.username,
//     password: data.password,
//   })
//   return data
// }


// export const useAuth2 = (): UseAuthResponse => {
//   return useQuery(["menu"], fetchMenu);  
// }

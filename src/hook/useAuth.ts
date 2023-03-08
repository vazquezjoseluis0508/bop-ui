
import { type AuthFormLoginValue } from '../types/auth.type'
import axios from 'axios'
import { REST_API } from '../constant/constants'

export const handleSignIn = async (params: AuthFormLoginValue) => {
  try {
    const response = await axios.post(`${REST_API}/auth/signin`,
      { usuario: params.username, password: params.password }
    )
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

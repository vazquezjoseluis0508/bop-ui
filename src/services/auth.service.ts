import axios from 'axios'
import { REST_API } from '../constant/constants'
import { type IFormInput } from '../pages/Login'
import { AuthFormLoginValue, IAuthEntity } from '../types/auth.type'

const axios_api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const auth = {
  login: async (usuario: string, password: string) => await axios_api.post('/auth/login', { usuario, password }),
  register: async (usuario: string, password: string) => await axios_api.post('/auth/register', { usuario, password }),
  logout: async () => await axios_api.post('/auth/logout'),
  me: async () => await axios_api.get('/auth/me')
}

export const LoginUser = async (data: IFormInput) => {
  return await axios_api.post('/usuarios', { usr: data.username, clave: data.password })
}

export const handleSignIn = async (params: AuthFormLoginValue) => {
  // try {
    const response = await axios.post(`${REST_API}/auth/signin`,
      { usuario: params.username, password: params.password }
    )
    return response

  // } catch (error :any) {
  //   // throw new Error(error.response.data.message)
  //   // return null
  //   return error.response.data
  // }
}



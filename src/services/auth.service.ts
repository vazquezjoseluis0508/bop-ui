import axios from 'axios'
import { type IFormInput } from '../pages/Login'

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

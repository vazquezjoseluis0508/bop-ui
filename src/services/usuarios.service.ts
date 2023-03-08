
import axios from 'axios'
import { type IFormInput } from '../types/auth.type'

const axios_api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const getUsuarios = async () => {
  return await axios_api.get('/usuarios')
}

export const LoginUser = async (data: IFormInput) => {
  return await axios_api.post('/usuarios', { usr: data.username, clave: data.password })
}

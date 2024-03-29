import axios from 'axios'
import { REST_API } from '../constant/constants'
import { type IFormInput } from '../types/auth.type'

const axios_api = axios.create({
  baseURL: REST_API
})

export const LoginUser = async (data: IFormInput) => {
  return await axios_api.post('/usuarios', { usr: data.username, clave: data.password })
}

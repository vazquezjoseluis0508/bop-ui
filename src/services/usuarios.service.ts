
import axios from 'axios'
import { IFormInput } from '../pages/LoginPage/LoginPage'

const axios_api = axios.create({
    baseURL: 'http://localhost:3001'
})


// export const auth = {
//     login: (usuario: string, password: string) => axios_api.post('/auth/login', { usuario, password }),
//     register: (usuario: string, password: string) => axios_api.post('/auth/register', { usuario, password }),
//     logout: () => axios_api.post('/auth/logout'),
//     me: () => axios_api.get('/auth/me')
// }

export const getUsuarios = async () => {
    return await axios_api.get('/usuarios')
}


export const LoginUser = async (data: IFormInput) => {
   return await axios_api.post('/usuarios', { usr: data.username, clave: data.password })
}
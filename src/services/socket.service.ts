import io from 'socket.io-client'
import { URL_API } from '../constant/constants'

export const socket = io(URL_API)

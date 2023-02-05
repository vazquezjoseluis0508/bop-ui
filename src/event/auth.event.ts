import { Socket } from 'socket.io-client'
import { IAuthEntity } from '../types/auth.type'

export type AuthCode = {
  code: number
  user_email: string
  expired_at: Date
}

type IAuthChangeType = 'TOKEN_REFRESHED' | 'SESSION_EXPIRED'
type IAuthUserType = IAuthEntity

interface IOnAuthStateChange {
  event: IAuthChangeType
  session: IAuthUserType | null
}

export class AuthEvent {
  socket: Socket | undefined

  static setSocket(socket: Socket) {
    this.prototype.socket = socket
  }

  static onAuthStateChange(
    cb: (event: IAuthChangeType, session: IAuthUserType | null) => void
  ) {
    try {
      const socket = this.prototype.socket
      const userToken = localStorage.getItem('clinia.token')
      if (!socket) return

      if (userToken) {
        const userParse = JSON.parse(userToken)
        socket?.emit('ENTER_AUTH_CHANGE', { id: userParse.id })
      }
      socket?.on('AUTH_CHANGE', ({ event, session }: IOnAuthStateChange) => {
        cb(event, session)
      })
    } catch (error) {
      console.error('error')
    }
  }
}

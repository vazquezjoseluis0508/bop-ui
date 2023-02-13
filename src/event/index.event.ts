import { type IAuthEntity } from '../types/auth.type'
import { type Socket } from 'socket.io-client'

import { AuthEvent } from './auth.event'

export class InitDomainEvent {
  static socket: Socket | undefined

  static initEvents (props: Pick<IAuthEntity, 'access_token'>) {
    const socket = InitDomainEvent.socket
    if (typeof socket === 'undefined') return
    socket.emit('user-join-in-room', props)
    AuthEvent.setSocket(socket)
    // DoctorAppointmentDomainEvent.setSocket(socket)
    // DoctorNewPatientEvent.setSocket(socket)
    // DoctorConsultingEvent.setSocket(socket)
  }

  static setSocket (socket: Socket) {
    InitDomainEvent.socket = socket
  }
}

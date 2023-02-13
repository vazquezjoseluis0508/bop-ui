import { AuthRol, type IAuthEntity } from '../types/auth.type'

export type UserAuth = IAuthEntity

export class UserController {
  #user: UserAuth

  constructor (props?: UserAuth) {
    this.#user = this.#parseData(props)
  }

  getData (): UserAuth {
    return this.#user
  }

  setData (props: UserAuth) {
    this.#user = this.#parseData(props)
  }

  #parseData (props?: UserAuth): UserAuth {
    return {
      access_token: props?.access_token ?? '',
      id: props?.id ?? '',
      usr: props?.usr ?? '',
      password: props?.password ?? '',
      legajo: props?.legajo ?? '',
      nombre: props?.nombre ?? '',
      account_type: props?.account_type ?? AuthRol.UNKNOWN

    }
  }
}

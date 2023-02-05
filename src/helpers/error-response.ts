export class ErrorResponse<T = {}> {
  error: IErrorResponse<T>['error']

  constructor(props: { code: ICommonError; metadata?: T }) {
    this.error = this.#getErrorMessage(props.code, props.metadata)
  }

  #getErrorMessage(
    code: ICommonError,
    metadata?: T
  ): IErrorResponse<T>['error'] {
    return {
      code: STATUS_CODE[code],
      status: code,
      metadata,
    }
  }
}

export type IErrorResponse<T = {}> = {
  error?: {
    status: string
    code: number
    metadata?: T
  }
}

type ICommonError =
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_SUPPORTED'
  | 'INVALID_CREDENTIALS'
  | 'USER_ALREADY_EXISTS'
  | 'AUTH_INVALID_CODE'
  | 'PATIENT_ALREADY_EXISTS'
  | 'SESSION_EXPIRED'

const STATUS_CODE: Record<ICommonError, number> = {
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  METHOD_NOT_SUPPORTED: 405,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  INVALID_CREDENTIALS: 401,
  USER_ALREADY_EXISTS: 409,
  AUTH_INVALID_CODE: 401,
  PATIENT_ALREADY_EXISTS: 409,
  SESSION_EXPIRED: 440,
}

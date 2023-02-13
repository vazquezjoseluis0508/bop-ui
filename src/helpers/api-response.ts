import { type IErrorResponse } from './error-response'

export interface ApiResponse<T, E = {}> extends IErrorResponse<E> {
  data?: T
  totalPages?: number
}

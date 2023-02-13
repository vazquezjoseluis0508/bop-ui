import { type ApiResponse as ApiResponseHelper } from '../helpers/api-response'

export type ApiResponse<T, E = any> = ApiResponseHelper<T, E>

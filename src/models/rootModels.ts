import { Models } from '@rematch/core'
import { usuarios } from './usuarios'



export interface RootModel extends Models<RootModel> {
  usuarios: typeof usuarios
  
}

export const models: RootModel = {
  usuarios
}

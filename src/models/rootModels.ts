import { type Models } from '@rematch/core'
import { auth } from './auth'
import { ui } from './ui'
import { usuarios } from './usuarios'

export interface RootModel extends Models<RootModel> {
  usuarios: typeof usuarios
  auth: typeof auth
  ui: typeof ui
}

export const models: RootModel = {
  usuarios,
  auth,
  ui
}

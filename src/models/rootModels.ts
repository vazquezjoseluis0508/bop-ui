import { type Models } from '@rematch/core'
import { auth } from './auth'
import { ui } from './ui'
import { usuarios } from './usuarios'
import { menus } from './menus'

export interface RootModel extends Models<RootModel> {
  usuarios: typeof usuarios
  auth: typeof auth
  ui: typeof ui
  menus: typeof menus
}

export const models: RootModel = {
  usuarios,
  auth,
  ui, 
  menus
}

import { create } from 'zustand'
import { type IMenu } from '../hook/types'
import { persist, createJSONStorage } from 'zustand/middleware'

interface menuState {
  menus: IMenu[]
}

interface menuActions {
  removeState: () => void
  addAllMenus: (menus: IMenu[]) => void
  addMenu: (menu: IMenu) => void
  removeMenu: (id: number) => void
}

export const useMenuStore = create(
  persist<menuState & menuActions>(
    (set, get) => ({
      menus: [],
      addAllMenus: (menus: IMenu[]) => { set((state) => ({ menus })) },
      addMenu: (menu: IMenu) => { set((state) => ({ menus: [...state.menus, menu] })) },
      removeMenu: (id: number) => { set((state) => ({ menus: state.menus.filter((menu) => menu.idMenuPersonal !== id) })) },
      removeState: () => { set((state) => ({ menus: [] })) }
    }),
    {
      name: 'menu-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

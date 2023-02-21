import { createModel } from '@rematch/core'
import { get_menus } from '../services/menu.service'
import { type RootModel } from './rootModels'

type params = Record<string, any>

export interface IMenu {
    idMenuPersonal: number
    descripcion: string
    estado: number
    fecha_menu: string
    image?: string
}

interface IMenusState {
    menus: Array<IMenu>
  
}

const menusState: IMenusState = {
  menus: [
    {
        idMenuPersonal: 0,
        descripcion: '',
        estado: 0,
        fecha_menu: '',
        image: ''
    }
    ]
}

export const menus = createModel<RootModel>()({
  state: menusState,
  effects: (dispatch) => ({
    async get_menus() {
      const { set } = dispatch.menus

      try {

        const menus_response = await get_menus()
        // map the response to the state
            if (menus_response?.data){
                const data = menus_response?.data.map((menu: IMenu) => ({
                    idMenuPersonal: menu.idMenuPersonal,
                    descripcion: menu.descripcion,
                    estado: menu.estado,
                    fecha_menu: menu.fecha_menu
                }))
                set({ menus: data })
            }
        } catch (error) {
            console.log("get_menus: ", error)
        }



    }
  }),
  reducers: {
    set (state: IMenusState, params: ILookup<any>) {
      Object.keys(params).forEach((key) => (state[key] = params[key]))
      return state
    },
    reset (state: IMenusState) {
      state = menusState
      return state
    }
  }
})

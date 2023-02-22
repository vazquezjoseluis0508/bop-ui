import { createModel } from '@rematch/core'
import { getFromLocalStorage, storeInLocalStorage } from '../services/cache.service'
import { searchImages } from '../services/google.service'
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
    async get_menus(date: string, rootState: any) {
      const { set } = dispatch.menus
      console.log("get_menus: ", date)

      try {

            const menus_response = await get_menus()
        
            if (menus_response?.data){

              // filtrar por fecha
              const menus = menus_response?.data.filter((menu: IMenu) => {
                console.log("menu.fecha_menu: ", menu.fecha_menu)
                return menu.fecha_menu.substring(0,10) === date
              })

              console.log("menus: ", menus)

              const data : IMenu [] = await Promise.all(menus.map(async (menu: IMenu) => {

                  const cachedResults = getFromLocalStorage(menu.descripcion);
                  let image = ''
                  if (cachedResults) {
                      // console.log("Resultados obtenidos del caché:", cachedResults);
                      image = cachedResults
                  } else {
                      const results = await searchImages(menu.descripcion);
                      // Almacenar los resultados en el caché
                      storeInLocalStorage(menu.descripcion, results);
                      // console.log("Resultados obtenidos de la API:", results);
                      image = results
                  }
                  if (image === '') {
                    image = './img/menu22.png'
                  }
                  return {
                    idMenuPersonal: menu.idMenuPersonal,
                    descripcion: menu.descripcion,
                    estado: menu.estado,
                    fecha_menu: menu.fecha_menu,
                    image: image
                  }

                
              }))

              console.log("data: ", data)
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


import api from '../api/bop'
import { useQuery } from '@tanstack/react-query'
import { type IMenu } from './types'
import { imagenes } from '../constant/constants'

async function fetchMenu () {
  try {
    const { data } = await api.get<IMenu[]>('/menu/get-menus')

    const misMenus = await Promise.all(data.map(async (menu: IMenu) => {
      // obtener la imagen del menu desde el array de imagenes del archivo constantes.ts
      let images = imagenes.find((image) => image.plato === menu.descripcion)?.image
      let image = images ? images : ''

      // const cachedResults = getFromLocalStorage(menu.descripcion);
      // if (cachedResults) {
      //     image = cachedResults
      // } else {
      //     const results = await searchImages(menu.descripcion);
      //     storeInLocalStorage(menu.descripcion, results);
      //     image = results
      // }
      if (image === '') {
        image = './img/menu22.png'
      }
      return {
        idMenuPersonal: menu.idMenuPersonal,
        descripcion: menu.descripcion,
        estado: menu.estado,
        fecha_menu: menu.fecha_menu,
        image
      }
    }))
    return misMenus
  } catch (error) {
    console.log('fetchImageMenu: ', error)
  }
}

export function userFetchMenu () {
  return useQuery(['menu'], fetchMenu)
}

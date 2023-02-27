
import api from "../api/bop";
import { useQuery } from "@tanstack/react-query";
import { IMenu } from "./types";
import { getFromLocalStorage, storeInLocalStorage } from "../services/cache.service";
import { searchImages } from "../services/google.service";



async function fetchMenu() {
  try {
    const { data } = await api.get<IMenu[]>("/menu/get-menus");

    const misMenus = await Promise.all(data.map(async (menu: IMenu) => {
      let image = ''

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
        image: image
      }
    }))
    return misMenus;
  } catch (error) {
    console.log("fetchImageMenu: ",error);
  }
}


export function userFetchMenu() {
  return useQuery(["menu"], fetchMenu);  
}


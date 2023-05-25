
import axios from 'axios'
import { REST_API } from '../constant/constants'
import { type IMenu } from '../hook/types'


export const get_menus = async (): Promise<any> => {
  try {
    const response = await axios.get(`${REST_API}/menu/get-menus`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('bop.token')
      }
    })
    return response
  } catch (error) {
    console.log('service get_menus: ', error)
  }
}

export const setImageMenus = async (data: IMenu[]) => {

}

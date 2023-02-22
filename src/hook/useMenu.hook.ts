import { useDispatch, useSelector } from 'react-redux'
import { type ApplicationState, type Dispatch } from '../store'

export const useMenu = () => {
  const dispatch = useDispatch<Dispatch>()
  const menus = useSelector((state: ApplicationState) => state.menus)

  const handleGetMenus = async () => {
    return await dispatch.menus.get_menus()
  }


  return {
    menus,
    handleGetMenus
  }
}

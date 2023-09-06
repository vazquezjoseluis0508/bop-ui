
import { REST_API } from '../constant/constants'
import { IFormPreferenciaMenuUsuario, IPreferenciaMenuUsuario } from '../types/preferencia.type'
import { useQuery } from '@tanstack/react-query'
import api from '../api/bop'
interface IParams {
    idUsuario: string
    legajo: string
}


export const getPreferenceByUser = async (params:IParams ): Promise<IPreferenciaMenuUsuario> => {
  try {
    const response = await api.get(`${REST_API}/preferencia_menu_usuario/getByUser`, {
        params: {
            idUsuario: params.idUsuario,
            legajo: params.legajo
        }
    })
    
    if (response.data.length === 0) {
        throw new Error('No se encontraron preferencias')
    }


    return {
        idPreferencia: response.data[0].idPreferencia,
        legajo: response.data[0].legajo,
        sal: response.data[0].sal,
        idUsuario: response.data[0].idUsuario,
        fecharegistro: response.data[0].fecharegistro,
        estado: response.data[0].estado
    }
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}


export const createPreference = async (params: IFormPreferenciaMenuUsuario) => {
    try {
        const response = await api.post(`${REST_API}/preferencia_menu_usuario/create`, params)
        return response
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}   


export function userFetchPreferencia (params : IParams) {
    return useQuery({
      queryKey: ['pedidos', params],
      queryFn: async () => await getPreferenceByUser(params)
  
    })
  }
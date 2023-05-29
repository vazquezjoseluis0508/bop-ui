import api from '../api/bop'
import { useQuery } from '@tanstack/react-query'
import { type IMenuPersonal, type UserMenu } from './types'
import { type IFormPedido } from '../pages/PedidosPage'

function getSuspenderReservas (promise: Promise<UserMenu[]>) {
  let status = 'pending'
  let result: any
  const suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      result = e
    }
  )
  return {
    read () {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    }
  }
}

export async function pedidoRealizado ( { idCalendarioMenu, idPedido }) {
  try {
    const { data } = await api.put('/pedidos/pedido-realizado', {
        idCalendarioMenu: idCalendarioMenu,
        idPedido: idPedido
    })
    return data
  } catch (error: any) {
    throw new Error('Error en el servidor: ' + error.response.data)
  }
}

export async function pedidoCancelado ( { idCalendarioMenu, idPedido, motivo }) {
  try {
    const { data } = await api.put('/pedidos/pedido-cancelado', {
        idCalendarioMenu: idCalendarioMenu,
        idPedido: idPedido,
        motivo: motivo
    })
    return data
  } catch (error: any) {
    throw new Error('Error en el servidor: ' + error.response.data)
  }
}


async function fetchReservasMonitor (): Promise<UserMenu[]> {
  try {
    const { data } = await api.get('/pedidos/get-reservas')

    // map the data to the format that useSWR expects and filter estate === 2
    const menu_user: UserMenu[] = data.map((menu: IMenuPersonal) => {
      return {
        id: menu.idCalendarioMenu,
        idPedido: menu.idPedido,
        firstName: menu.persona_str.split(' ')[0],
        lastName: '',
        legajo: menu.legajo,
        pedido: menu.title,
        fecha: menu.start.substring(0, 10),
        estado: menu.estado
      }
    }).filter((menu: UserMenu) => ( 
        menu.estado === 2 && // estado 2 = reservado
        menu.fecha >= new Date().toISOString().substring(0, 10)  && // hoy
        menu.fecha <= new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().substring(0, 10) // 1 dias
      )
    )

    console.log('menu_user: ', menu_user)
    return menu_user
  } catch (error) {
    console.log('fetchReservasMonitor: ', error)
  }
  return []
}

async function fetchReservas (legajo: string): Promise<IMenuPersonal[]> {
  try {
    const { data } = await api.get('/pedidos/get-reservas', {
      params: {
        legajo
      }
    })

    return data
  } catch (error) {
    console.log('fetchPedido: ', error)
    return []
  }
}

export async function crearReserva (params: IFormPedido) {
  try {
    const { data } = await api.post<IFormPedido>('/pedidos/reservar', {
      idMenu: params.form_menu,
      turno: params.form_turno,
      usuario: params.idUsuarios,
      fecha: params.form_fecha
    })
    return data
  } catch (error) {
    console.log('createReserva: ', error)
  }
}

export async function crearPedido (params: IFormPedido) {
  try {
    console.log('params: ', params)
    const { data } = await api.post<IFormPedido>('/pedidos/crear', {
      idMenu: params.form_menu,
      turno: params.form_turno,
      usuario: params.idUsuarios,
      fecha: params.form_fecha
    })
    return data
  } catch (error) {
    console.log('createPedido: ', error)
  }
} 

export async function eliminarReserva (id: number) {
  try {
    const { data } = await api.delete('/pedidos/eliminar', {
      params: {
        idCalendarioMenu: id
      }
    })
    return data
  } catch (error: any) {
    throw new Error('Error en el servidor: ' + error.response.data)
  }
}

export async function filterReservaByDate (data: IMenuPersonal[], fecha: string) {
  try {
    const filtered = await data.filter((pedido: IMenuPersonal) => pedido.start.substring(0, 10) === fecha)
    return filtered
  } catch (error) {
    console.log('filterReservaByDate: ', error)
  }
}

export function useFetchPedidosMonitor () {
  return useQuery({
    queryKey: ['pedidos-monitor'],
    queryFn: async () => await fetchReservasMonitor(),
    suspense: true
    
  })
}

export function userFetchPedido (legajo: string) {
  return useQuery({
    queryKey: ['pedidos', legajo],
    queryFn: async () => await fetchReservas(legajo)

  })
}



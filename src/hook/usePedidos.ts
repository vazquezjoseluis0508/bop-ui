import api from '../api/bop'
import { useQuery } from '@tanstack/react-query'
import { type IMenuPersonal, type UserMenu } from './types'
import { type IFormPedido } from '../pages/PedidosPage'

function getSuspenderReservas(promise: Promise<UserMenu[]>) {
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
    read() {
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

export async function pedidoRealizado({ idCalendarioMenu, idPedido }) {
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

export async function pedidoCancelado({ idCalendarioMenu, idPedido, motivo }) {
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


async function fetchReservasMonitor(): Promise<UserMenu[]> {
  try {
    const { data } = await api.get('/pedidos/get-reservas')
    // Obtén la fecha y hora actual en la zona horaria local
    let now = new Date();

    // Ajusta 'today' para ser la fecha de ayer si es antes de las 6 AM
    let today = new Date();
    if (now.getHours() < 6) {
      today.setDate(today.getDate() - 1);
    }

    // 'Tomorrow' es siempre un día después de 'today'
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Avanza un día

    // Transformar las fechas a formato yyyy-mm-dd para la comparación
    let todayString = today.toISOString().split('T')[0];
    let tomorrowString = tomorrow.toISOString().split('T')[0];


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
    }).filter((menu: UserMenu) => {
      if (menu.estado !== 2) return false; // si el estado no es 2, excluir

      // Aquí ignoramos la parte de la hora de las fechas comparando solo las partes del año, mes y día.
      return (
        (menu.fecha >= todayString) &&
        (menu.fecha < tomorrowString)
      );
    })



    // console.log('menu_user: ', menu_user)
    return menu_user
  } catch (error) {
    console.log('fetchReservasMonitor: ', error)
  }
  return []
}

function formatDate(date: Date): string {
  let day = '' + date.getDate();
  let month = '' + (date.getMonth() + 1); // Los meses en JavaScript son base 0
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


async function fetchReservas(legajo: string): Promise<IMenuPersonal[]> {
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

export async function crearReserva(params: IFormPedido) {
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

export async function crearPedido(params: IFormPedido) {
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

export async function eliminarReserva(id: number) {
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

export async function filterReservaByDate(data: IMenuPersonal[], fecha: string) {
  try {
    const filtered = await data.filter((pedido: IMenuPersonal) => pedido.start.substring(0, 10) === fecha)
    return filtered
  } catch (error) {
    console.log('filterReservaByDate: ', error)
  }
}

export function useFetchPedidosMonitor() {
  return useQuery({
    queryKey: ['pedidos-monitor'],
    queryFn: async () => await fetchReservasMonitor(),

  })
}

export function userFetchPedido(legajo: string) {
  return useQuery({
    queryKey: ['pedidos', legajo],
    queryFn: async () => await fetchReservas(legajo)

  })
}



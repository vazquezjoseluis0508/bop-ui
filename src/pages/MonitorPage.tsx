import * as React from 'react'
import { useState } from 'react'
import { Box, Input } from '@mui/material'
import { ContainerApp } from '../components/container'
import { pedidoCancelado, pedidoRealizado, useFetchPedidosMonitor } from '../hook/usePedidos'
import { type IMenuPersonal, type UserMenu } from '../hook/types'
import { socket } from '../services/socket.service'
import { useMutation } from '@tanstack/react-query'
import UserTable from '../components/Monitor/UserTable'
import { DialogCancel } from '../components/Monitor/DialogCancel'


const MonitorPage = (): JSX.Element => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userMenuToCancel, setUserMenuToCancel] = useState<UserMenu | null>(null);
  const [filter, setFilter] = useState('')

  const { data: reservas, isLoading: lodingReservas } = useFetchPedidosMonitor()
  const [data, setData] = useState(reservas || [])

  const { mutate: mutateRealizado } = useMutation({
    mutationFn: pedidoRealizado,
    onSuccess: (data) => {
      console.log('onSuccess pedidoRealizado: ', data)
    },
    onError: (error: any) => {
      console.log('onError pedidoRealizado: ', error)
    }
  })

  const { mutate: mutateCancel } = useMutation({
    mutationFn: pedidoCancelado,
    onSuccess: (data) => {
      console.log('onSuccess pedidoCancelado: ', data)
    },
    onError: (error: any) => {
      console.log('onError pedidoCancelado: ', error)
    }
  })

  const isDateWithinRange = (dateStr: string, startDateStr: string, endDateStr: string): boolean => {
    console.log('isDateWithinRange: ', dateStr, startDateStr, endDateStr)
    return dateStr >= startDateStr && dateStr < endDateStr;
  };

  socket.on('nueva-reserva', (reserva: IMenuPersonal) => {
    const newReserva: UserMenu = {
      id: reserva.idCalendarioMenu,
      idPedido: reserva.idPedido,
      firstName: reserva.persona_str,
      lastName: '',
      legajo: reserva.legajo,
      pedido: reserva.title,
      fecha: reserva.start,
      estado: reserva.estado
    }
    // Verifica si la fecha de la nueva reserva está dentro del rango deseado (hoy o mañana).
    const todayStr = new Date().toISOString().substring(0, 10);
    const tomorrowStr = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().substring(0, 10);
    const newReservaDateStr = newReserva.fecha.substring(0, 10);

    const isNewReservaWithinRange = isDateWithinRange(newReservaDateStr, todayStr, tomorrowStr);
    console.log('isNewReservaWithinRange: ', isNewReservaWithinRange)

    if (isNewReservaWithinRange) {
      // Filtra las reservas existentes para evitar duplicados.
      const newData: any = data?.filter((item: UserMenu) => item.id !== newReserva.id);

      // Agrega la nueva reserva a la data y actualiza el estado.
      setData([...newData, newReserva]);
    }
  })

  socket.on('elimina-reserva', (reserva: IMenuPersonal) => {
    const newData = data?.filter((item: UserMenu) => item.id !== reserva.idCalendarioMenu)
    setData(newData)
  })

  socket.on('pedido-realizado', (param: any) => {
    const newData = data?.filter((item: UserMenu) => item.id !== param.calendario_menu.idCalendarioMenu)
    setData(newData)
  })

  socket.on('pedido-cancelado', (param: any) => {
    const newData = data?.filter((item: UserMenu) => item.id !== param.calendario_menu.idCalendarioMenu)
    setData(newData)
  })

  const filteredUsers = data?.filter(user =>
    user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
    user.legajo.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const realizarPedido = (userMenu: UserMenu) => {
    console.log('realizarPedido: ', userMenu)
    mutateRealizado({ idCalendarioMenu: userMenu.id, idPedido: userMenu.idPedido })
  }

  const handleCancelClick = (userMenu: UserMenu) => {
    setUserMenuToCancel(userMenu);
    setOpenConfirmDialog(true);
  };

  const cancelPedido = (cancelReason: string) => {
    if (!userMenuToCancel) return;

    // Aquí va la lógica de cancelación del pedido.
    mutateCancel({
      idCalendarioMenu: userMenuToCancel.id,
      idPedido: userMenuToCancel.idPedido,
      motivo: cancelReason, // Asegúrate de cambiar esto a la clave correcta para tu API
    });

    // Cerrar el diálogo de confirmación.
    setOpenConfirmDialog(false);
  };

  React.useEffect (() => {
    if (reservas) setData(reservas)
  }, [reservas])



  if (lodingReservas) return <div>Loading Reservas...</div>


  return (
    <>
      <ContainerApp>
        <Box border={0} borderColor='primary.main' borderRadius={2} sx={{ width: '100%' }}>
          <Input type="text" placeholder="Buscar por nombre o legajo" onChange={handleFilterChange} />

          <UserTable
            users={filteredUsers}
            realizarPedido={realizarPedido}
            handleCancelClick={handleCancelClick}
          />
        </Box>
      </ContainerApp>
      <DialogCancel
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        cancelPedido={cancelPedido}
      />
    </>
  );
}

export default MonitorPage

import * as React from 'react'
import { useState } from 'react'
import { Avatar, Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material'
import { ContainerApp } from '../components/container'
import randomColor from 'randomcolor'
import { useFetchPedidosMonitor } from '../hook/usePedidos'
import { type IMenuPersonal, type UserMenu } from '../hook/types'
import { socket } from '../services/socket.service'

const MonitorPage = (): JSX.Element => {
  const { data: reservas } = useFetchPedidosMonitor()

  const [data, setData] = useState<UserMenu[]>([])

  socket.on('nueva-reserva', (reserva: IMenuPersonal) => {
    const newReserva: UserMenu = {
      id: reserva.idCalendarioMenu,
      firstName: reserva.persona_str,
      lastName: '',
      legajo: reserva.legajo,
      pedido: reserva.title,
      fecha: reserva.start.substring(0, 10),
      estado: reserva.estado
    }
    const newData = data.filter((item: UserMenu) => item.id !== newReserva.id)
    setData([...newData, newReserva])
  })

  socket.on('elimina-reserva', (reserva: IMenuPersonal) => {
    const newData = data.filter((item: UserMenu) => item.id !== reserva.idCalendarioMenu)
    setData(newData)
  })

  const [filter, setFilter] = useState('')

  const filteredUsers = data.filter(user =>
    user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
    user.legajo.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  return (
    <>
    <ContainerApp>

      <Box border={0} borderColor='primary.main' borderRadius={2} sx={{ width: '100%' }}>
        <Input type="text" placeholder="Buscar por nombre o legajo" onChange={handleFilterChange} />

                <TableContainer>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Nombre y Legajo</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Pedido</TableCell>
                        <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                            <Avatar sx={{
                              backgroundColor: randomColor({ luminosity: 'dark' }),
                              color: '#FFF'
                            }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
                            </TableCell>
                            <TableCell>
                            {user.firstName} {user.lastName} ({user.legajo})
                            </TableCell>
                            <TableCell>
                            {user.fecha}
                            </TableCell>
                            <TableCell>
                            {user.pedido}
                            </TableCell>
                            <TableCell>

                            <Button
                              sx={{ marginRight: 1 }}
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                                Realizar Pedido
                            </Button>
                            <Button
                              sx={{ marginLeft: 1 }}
                              variant="contained"
                              size="small"
                              color="secondary"
                            >
                                Cancelar
                            </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
        </Box>
        </ContainerApp>
    </>
  )
}

export default MonitorPage

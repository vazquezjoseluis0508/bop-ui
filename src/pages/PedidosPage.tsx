
import { Grid, Typography } from '@material-ui/core'
import { Box, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { ActionButton } from '../components/ActionButton'
import Calendar from '../components/Calendar'
import { ContainerApp } from '../components/Container'
import { MenuDelDia } from '../components/MenuDelDia'
import HorizontalLinearStepper from '../components/Stepper/Stepper2'
import { Turno } from '../components/Turno'
import { convertDate } from '../helpers/data-time'
import { IMenu } from '../hook/types'
import { userFetchMenu } from '../hook/useMenu'
import { userFetchPedido } from '../hook/usePedidos'
import { useMenuStore } from '../store/menus'


const PedidosPage = () => {

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(convertDate(new Date()))
  
  const { data: menus, isLoading: lodingMenus } = userFetchMenu()
  const { data:reservas, isLoading: lodingReservas } = userFetchPedido()
  const addMenus = useMenuStore( state => state.addAllMenus)
  if (lodingMenus ) return <div>Loading...</div>

  if (menus)  addMenus(menus)
  if (reservas) console.log(reservas)

  

  const handleDateChange = (date) => {
    setFechaSeleccionada(convertDate(date));
  };


  return (
    <>
    <ContainerApp>
      
      <Box border={0} borderColor='primary.main' borderRadius={2}  sx={{ width: '100%'}}>
      <HorizontalLinearStepper />
       <Grid container >
            <Grid item xs={4} sm={12} md={4} >
                <Calendar onDateChange={handleDateChange} dateSelected={fechaSeleccionada} />
                <Turno />
            </Grid>
            <Grid item xs={8} sm={12} md={8} >
              <Box  m={1} paddingLeft={2}>
                <MenuDelDia date={fechaSeleccionada} />
                <Divider  sx={{ marginTop: 5}}/>
                <Box mt={5} pr={5}>
                  <ActionButton />
                </Box>
              </Box>
            </Grid>
       </Grid>
       <Box 
        sx= {{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            backgroundColor: 'transparent',
            width: '100%',
            padding: 2,
        }}
        >
       </Box>
       </Box>
    </ContainerApp>
    </>
  )
}

export default PedidosPage

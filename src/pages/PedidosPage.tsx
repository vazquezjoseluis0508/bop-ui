
import { Grid, Typography } from '@material-ui/core'
import { Box, Divider } from '@mui/material'
import { ActionButton } from '../components/ActionButton'
import { Calendar } from '../components/Calendar'
import Calendar3 from '../components/Calendar3'
import { ContainerApp } from '../components/container'
import { MenuDelDia } from '../components/MenuDelDia'
import HorizontalLinearStepper from '../components/Stepper/Stepper2'
import { Turno } from '../components/Turno'

const PedidosPage = () => {


  return (
    <>
    <ContainerApp>
      
      <Box border={0} borderColor='primary.main' borderRadius={2}  sx={{ width: '100%'}}>
      <HorizontalLinearStepper />
       <Grid container >
            <Grid item xs={4} sm={12} md={4} >
                <Calendar3 />
                <Turno />
            </Grid>
            <Grid item xs={8} sm={12} md={8} >
              <Box  m={1} paddingLeft={2}>
                <MenuDelDia />
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

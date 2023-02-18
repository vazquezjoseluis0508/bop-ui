
import { Grid } from '@material-ui/core'
import { Box } from '@mui/material'
import { Calendar } from '../components/Calendar'
import Calendar3 from '../components/Calendar3'
import { ContainerApp } from '../components/container'
import { MenuDelDia } from '../components/MenuDelDia'
import { Turno } from '../components/Turno'

// "Nuestro Menú"
// "Explora nuestros platos"
// "Delicias culinarias"
// "El sabor de la buena comida"
// "Comida fresca y deliciosa"
// "Sabores auténticos"
// "Platos exquisitos para ti"
// "Nuestras especialidades"
// "Variedad de sabores"
// "¡Buen provecho!"

const PedidosPage = () => {
  return (
    <>
    <ContainerApp>
      <Box border={1} borderRadius={2} borderColor='grey' sx={{ width: '100%'}}>
       <Grid container >
            <Grid item xs={4} sm={12} md={4} >
                <Calendar3 />
            </Grid>
            <Grid item xs={8} sm={12} md={8} >
              <Box  m={1} paddingLeft={2}>
                <Turno />
                <MenuDelDia />
              </Box>
            </Grid>
       </Grid>
       </Box>
    </ContainerApp>
    </>
  )
}

export default PedidosPage


import { Grid } from '@material-ui/core'
import { Box } from '@mui/material'
import { Calendar } from '../components/Calendar'
import Calendar3 from '../components/Calendar3'
import { ContainerApp } from '../components/Container'
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
       <Grid container>
            <Grid item xs={6} sm={12} md={6}>
                <Calendar3 />
            </Grid>
            <Grid item xs={6} sm={12} md={6}>
              <Turno />

              <Box sx={{ width: '100%' }} m={1}>
                <MenuDelDia />
              </Box>
            </Grid>

       </Grid>
       

    </ContainerApp>
    </>
  )
}

export default PedidosPage

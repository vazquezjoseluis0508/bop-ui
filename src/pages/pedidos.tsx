import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { Copyright } from '../components/Copyright'
import { StepperComponent } from '../components/StepperComponent'
import { VerticalTabs } from '../components/TabPanel'

const PedidosPage = () => {
  return (
    <Container >
      <VerticalTabs />
      {/* <Grid container spacing={2}>
        {menuDelDia.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box border={1} borderRadius={2} p={1}>{item.name}</Box>
        </Grid>
        ))}
      </Grid>  */}
      <Box color='primary.contrastText' bgcolor='primary' m={5} p={5} border={1}>
        <StepperComponent />
      </Box>

      
      <Copyright sx={{ pt: 4 }} />
    </Container>
  )
}

export default PedidosPage
import { Box, Container, Grid, Paper, styled, Typography } from "@mui/material";
import { Copyright } from "../Copyright";
import { StepperComponent } from "../StepperComponent";
import { VerticalTabs } from "../TabPanel/TabPanel";

export const Body = () => {

  const menuDelDia = [
    { id: 1, name: "Milanesa con Pure."},
    { id: 2, name: "Ensalada Vegana."},
    { id: 3, name: "Carre de cerdo con papas al horno."},
    { id: 4, name: "Milanesas a Caballo con ensalada Cesar."},
    
  ]
  
  return (
    <Container >
      <VerticalTabs />
      {/* <Grid container spacing={2}>
        {menuDelDia.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box border={1} borderRadius={2} p={1}>{item.name}</Box>
        </Grid>
        ))}
      </Grid> */}
      {/* <Box color='primary.contrastText' bgcolor='primary' m={5} p={5} border={1}>
        <StepperComponent />
      </Box> */}

      
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

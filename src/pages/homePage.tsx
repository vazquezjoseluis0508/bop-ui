// HomePage.tsx
import React from 'react';
import { Button, Box, Card, CardContent, CardActions, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonitorIcon from '@mui/icons-material/DesktopWindows';

const HomePage = () => {
  const navigate = useNavigate();

  const goToPage = (page: string) => {
    navigate(page);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" minHeight="40vh">
      <Card sx={{ minWidth: 275, m: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Página de Pedidos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestiona todos tus pedidos aquí.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => goToPage('/pedidosPage')} startIcon={<ShoppingCartIcon />}>
            Ir a la página de Pedidos
          </Button>
        </CardActions>
      </Card>

      {/* <Card sx={{ minWidth: 275, m: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Página de Monitor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitoriza todas las actividades aquí.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={() => goToPage('/monitorPage')} startIcon={<MonitorIcon />}>
            Ir a la página de Monitor
          </Button>
        </CardActions>
      </Card> */}
    </Box>
  );
}

export default HomePage;

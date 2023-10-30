import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuthStore } from '../store/auth';
import { ROUTES } from '../constant/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/menus';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const removeMenuState = useMenuStore((state) => state.removeState);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleSignOut = () => {
    removeMenuState();
    logout();
    navigate(ROUTES.login);
  };

  const profile = useAuthStore((state) => state.profile);

  const isCurrentRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <List sx={{  margin: 0, padding: 0 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <img src="./img/logo.jpeg" alt="logo" width="100" height="50" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Gastronomía - Reservas" secondary="Intranet" />
            <Button
              color={isCurrentRoute(ROUTES.pedidos) ? 'secondary' : 'primary'}
              variant="outlined"
              onClick={() => handleNavigation(ROUTES.pedidos)}
              sx={{ height: '100%', marginLeft: '30px', borderRadius: '0px' }}
              startIcon={<ShoppingCartIcon />}
            >
              Pedidos
            </Button>
            <Button
              color={isCurrentRoute(ROUTES.history) ? 'secondary' : 'primary'}
              variant="outlined"
              onClick={() => handleNavigation(ROUTES.history)}
              sx={{ height: '100%', borderRadius: '0px', marginLeft: '0px' }}
              startIcon={<HistoryIcon />}
            >
              Historial
            </Button>
          </ListItem>
        </List>
        <Box ml={'auto'} minWidth={450}>
          <Grid container>
            <Grid item xs={6} md={6} textAlign="center">
              <Typography
                variant="body2"
                component="div"
                sx={{ float: 'right', paddingTop: '5px' }}
              >
                {profile?.nombre} - Legajo: {profile?.legajo}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleSignOut}
                startIcon={<ExitToAppIcon />}
                sx={{ float: 'right' }}
              >
                Salir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

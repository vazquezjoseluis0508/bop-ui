// crear un header con material UI
import { AppBar, Avatar, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Toolbar, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuthStore } from '../store/auth';
import { ROUTES } from '../constant/routes';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/menus';

export const Header = () => {

  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)
  const removeMenuState = useMenuStore(state => state.removeState)
  const handleSignOut = () => {
    removeMenuState()
    logout()
    navigate(ROUTES.login)

  }

  const profile = useAuthStore(state => state.profile)

  return (

        <AppBar position="static" >
          <Toolbar>
            <List sx={{ maxWidth: 360, margin: 0 , padding:0}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img src="./img/logo.jpeg" alt="logo" width="100" height="50" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Gastronomia- Reservas" secondary="Intranet" />
            </ListItem>
            </List>
            <Box ml={'auto'} minWidth={450}>
              <Grid container>
                <Grid item xs={6} md={6} textAlign='center'>
                  <Typography variant="body2" component="div" sx={{float: 'right', paddingTop: '5px'}} >
                    {profile?.nombre} - Legajo: {profile?.legajo}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button 
                    color="secondary" 
                    variant='outlined' 
                    onClick={handleSignOut}
                    startIcon={ <ExitToAppIcon />}
                    sx={{float: 'right'}}
                    >
                      Salir
                  </Button>
                </Grid>
              </Grid>
              
            </Box>
            
          </Toolbar>
        </AppBar>
  )
}

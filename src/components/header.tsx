// crear un header con material UI
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
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

  return (

        <AppBar position="static" >
          <Toolbar>
            <Button 
              color="secondary" 
              variant='outlined' 
              onClick={handleSignOut}
              startIcon={ <ExitToAppIcon />}
              sx={{ ml: 'auto' }}
              >
                Salir
            </Button>
          </Toolbar>
        </AppBar>
  )
}

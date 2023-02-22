// crear un header con material UI
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../hook/useAuth.hook';

export const Header = () => {
  const { handleSignOut } = useAuth()
  

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

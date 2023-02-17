// crear un header con material UI
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const Header = () => {
  const handleLogOut = () => {
    // Handle log out logic here
  }

  return (

        <AppBar position="static" >
          <Toolbar>
            <Button 
              color="inherit" 
              variant='outlined' 
              onClick={handleLogOut} 
              startIcon={ <ExitToAppIcon />}
              sx={{ ml: 'auto' }}
              >
                Salir
            </Button>
          </Toolbar>
        </AppBar>
  )
}

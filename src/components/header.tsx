// crear un header con material UI
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  const handleLogOut = () => {
    // Handle log out logic here
  }

  return (

        <AppBar position="static">
        <Toolbar>
        <Button color="inherit" onClick={handleLogOut}>
            Log Out
        </Button>
        </Toolbar>
        </AppBar>
  )
}

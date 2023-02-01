import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export const LoginInput = () => {

  
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    </ThemeProvider>
    <Box
      sx={{
        width: 480,
        height: 375,
        ml: 64 ,
        my: 17,
        pt: 5,
        backgroundColor: '#424242'
      }}>
      
    <Box sx={{pl:17.5}} >INTRANET GASTRONOMIA</Box>
    <br/><br/>
    <Box sx={{pl:11.2}}>
    <InputLabel htmlFor="input-with-icon-adornment" sx={{color:'white'}}>
          Usuario
        </InputLabel>
        <Input
          id="input-with-icon-adornment" sx={{color:'white', width:300 }}
          startAdornment={
            <InputAdornment position="start"  >
              <AccountCircle sx={{color:'orange'}}/>
            </InputAdornment>
      }
    />
    </Box>
    <br/><br/>
    <Box sx={{pl:11.2}}>
    <InputLabel htmlFor="input-with-icon-adornment" sx={{color:'white'}}>
        Passworld
        </InputLabel>
        <Input
          id="input-with-icon-adornment" sx={{color:'white', width:300 }}
          startAdornment={
            <InputAdornment position="start">
              <LockRoundedIcon sx={{color:'orange'}}/>
            </InputAdornment>
      }
    />
    </Box>
      <br/><br/>
      <Box sx={{pl:23}}>
      <Button variant="contained" color="success">
      Ingresar
      </Button>
      </Box>
    </Box>
    </>
  )
}

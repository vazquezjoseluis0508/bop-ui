import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { Avatar, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('usuario'),
      password: data.get('password')
    })
  }

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#424242'
            }}
            padding={2}
            borderRadius={2}

            >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src='./img/logo.jpeg' />
          <Typography component="h1" variant="h5">
            Gastronomia
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: 'orange' }}/>
                  </InputAdornment>
                )
              }}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{ color: 'orange' }}/>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'secondary', backgroundColor: 'orange' }}
            >
              Ingresar
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

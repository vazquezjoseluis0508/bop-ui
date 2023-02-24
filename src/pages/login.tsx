
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { Container, TextField, Typography } from '@mui/material'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth.hook'
import { AlertError } from '../components/AlertError/AlertError'
import { ROUTES } from '../constant/routes'
import { useAuthStore } from '../store/auth'
import { handleSignIn } from '../services/auth.service'
import { SnackbarApp } from '../components/Snackbar'

export interface IFormInput {
  username: string
  password: string
}

export const LoginPage = () => {

  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  // const { handleSignIn, isAuthenticated } = useAuth()

  const schema = yup.object().shape({
    username: yup.string().required('usuario es requerido.'),
    password: yup.string().required('password es requerido.')
  })

  const { control, handleSubmit, formState: { errors, isSubmitting }, register } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: IFormInput) => {
    // const response = await handleSignIn(data)

    try {
          const response = await handleSignIn(data)
        
          setToken(response.data.access_token || '')
          setProfile( { 
              idUsuarios : response.data.idUsuarios,
              nombre : response.data.nombre,
              legajo : response.data.legajo,
              usr: response.data.usr,
              permiso_id : response.data.permiso_id
          } || {})

          navigate(ROUTES.pedidos, { replace: true })

      } catch (error: any) {
        setErrorMessage(error.response.data.message)
        setOpen(true)
          // return <SnackbarApp message={response.response.data.message || ''} type='error' open={true} /> 
      }
  }




  return (
    <>
      <Container component="main" maxWidth="xs">

      <CssBaseline />
          <SnackbarApp message="Usuario o password invallido" open={open} type='error'/>

          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#424242'
            }}
            padding={3}
            borderRadius={2}

            >

          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src='./img/logo.jpeg'  /> */}
          <Typography component="h1" variant="h5">
            Gastronomia
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} >

            <TextField
              margin="normal"
              error={!(errors.username == null)}
              helperText={errors.username?.message}
              {...register('username')}
              fullWidth
              id="usuario"
              label="Usuario"
              name="username"
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
              label="Password"
              type="password"
              margin="normal"
              fullWidth
              {...register('password')}
              name="password"
              id="password"
              error={!(errors.password == null)}
              helperText={errors.password?.message}
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

          </form>
        </Box>
      </Container>
    </>
  )
}

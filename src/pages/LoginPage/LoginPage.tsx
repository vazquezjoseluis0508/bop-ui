

import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Avatar, Checkbox, Container, TextField, Typography } from '@mui/material';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {  getUsuarios, LoginUser } from '../../services/usuarios.service'
import { useMutation, useQuery } from '@tanstack/react-query';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Navigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export interface IFormInput {
  username: string;
  password: string;
}




export const LoginPage = () =>{
  
  const [open, setOpen] = React.useState(false);

  // create esquema de validacion
  const schema = yup.object().shape({
    username: yup.string().required("usuario es requerido."),
    password: yup.string().required("password es requerido."),
  });

  const { control, handleSubmit, formState: { errors }, register} = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const getUsuarios = async () => {
    const {
      data: usuariosData,
      isLoading: usuariosLoading,
      isError: usuariosError,
      error: usuariosQueryError,
    } = useQuery({
      queryKey: ['usuarios'],
      queryFn: getUsuarios,
      onSuccess: (data) => {
        console.log('data', data);
      },
      onError: (error) => {
        console.log('error', error);
      }
    })
    
    if (usuariosLoading) return <div>Loading...</div>
    if (usuariosError) return <div>Error: {usuariosQueryError.message}</div>

    return usuariosData
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const onSubmit = async (data) => {
    
    try {
      // console.log(data);
      // auth.mutate(data.username, data.password)
      // getUsuarios()
      if (data.username === 'admin' && data.password === 'admin') {
        console.log('login correcto');
        //redire

      } else {
        console.log('login incorrecto');
        setOpen(true);

      }
    } catch (err) {
      console.error(err);
    }
  };

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Usuario o contraseña incorrectos! por favor revise sus datos.
        </Alert>
      </Snackbar>
      <CssBaseline />
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
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register("username")}
              fullWidth
              id="usuario"
              label="Usuario"
              name="username"
              autoComplete="usuario"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: 'orange'}}/>
                  </InputAdornment>
                ),
              }}
              
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              fullWidth
              {...register("password")}
              name="password"
              id="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{color:'orange'}}/>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , color:'secondary', backgroundColor:'orange'}}
            >
              Ingresar
            </Button>
            
         
          </form>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

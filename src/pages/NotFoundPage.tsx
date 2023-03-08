import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)' // 64px es la altura de la barra de navegación
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}))

function NotFoundPage () {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="h3" align="center" className={classes.title}>
        ¡Ups! No hemos encontrado la página que estás buscando.
      </Typography>
      <Typography variant="body1" align="center">
        Lo sentimos, pero la página que intentas acceder no está disponible. Por favor, verifica que la URL esté escrita correctamente o intenta volver a la página de inicio.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Volver a la página de inicio
      </Button>

    </Container>
  )
}

export default NotFoundPage

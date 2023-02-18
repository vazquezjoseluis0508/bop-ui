import { createTheme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }

  }
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { // Aquí puedes agregar el color de fondo que desees para tu layout.  Por ejemplo, un color gris oscuro.
      default: '#282c34' // Esta es la paleta de colores por defecto para un tema oscuro.  Puedes cambiarla si lo deseas.
    },
    primary: {
      light: '#ffd149',
      main: '#ffa000',
      dark: '#340900',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fdd835',
      light: '#ffff6b',
      dark: '#c6a700',
      contrastText: '#fff'
    }
    
  }

})

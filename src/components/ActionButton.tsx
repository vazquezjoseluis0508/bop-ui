import { Box, Button, ButtonBase } from '@mui/material'
import React from 'react'

export const ActionButton = () => {

  const [disabledGuardar, setDisabledGuardar] = React.useState(false)
  const [disabledELiminar, setDisabledELiminar] = React.useState(true)

  return (
    <Box m={2}
     sx= {{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        backgroundColor: 'transparent',
        width: '100%',

     }}>
      <Box m={1} >
        <Button
            variant="contained"
            color="error"
            size="large"
            disabled={disabledELiminar}
          >
          Eliminar
        </Button>
        </Box>
        <Box m={1} >
        <Button  
            variant="contained" 
            color="primary"
            size="large"
            disabled={disabledGuardar}
            
        >
            Guardar
        </Button>
        </Box>
    </Box>
  )
}

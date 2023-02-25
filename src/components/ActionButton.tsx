import { Box, Button,  } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';


type actionButtonProps = {
  onDelete: ( id_reserva: number ) => void
  isDisabled: boolean
  reserva: number
}

export const ActionButton = ( { onDelete, isDisabled, reserva }: actionButtonProps) => {


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
            disabled={reserva > 0 ? false : true}
            onClick={ () => onDelete(reserva) }
            
          >
          Eliminar
        </Button>
        </Box>
        <Box m={1} >
        <Button  
            variant="contained" 
            color="primary"
            size="large"
            disabled={isDisabled}
            type="submit"
        >
            { isDisabled ? <CircularProgress size={24}/> : 'Guardar' }
        </Button>
        </Box>
    </Box>
  )
}

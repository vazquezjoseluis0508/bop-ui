import { Box, Button,  } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { IMenuPersonal } from '../hook/types';


type actionButtonProps = {
  isDisabled: boolean
}

export const ActionButton = ( {  isDisabled }: actionButtonProps) => {


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

import { Box, Button, ButtonBase } from '@mui/material'
import React from 'react'

export const ActionButton = () => {
  return (
    <Box m={2}
     sx= {{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        backgroundColor: 'transparent',
        width: '100%',

     }}>
        <Button  
            variant="contained" 
            color="primary"
            size="large"
            
        >
            Guardar
        </Button>
    </Box>
  )
}

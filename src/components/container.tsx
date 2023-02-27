
import { Box, Container } from '@mui/material'
import React from 'react'

export const ContainerApp = ({ children }) => {
  return (
    <Container maxWidth={false}>
      <Box 
        padding={2} 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: '100vh',
          width: '95%',
        }}
        margin={2}>
          
        {children}
      </Box>
    </Container>
  )
}

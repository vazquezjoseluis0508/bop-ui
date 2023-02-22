
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'


export const Turno = () => {
    const [value, setValue] = React.useState('female')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
      }

    const turnos = [
        {
            id: 1,
            turno: 'Turno 11:00'
        },
        {
            id: 2,
            turno: 'Turno 14:00'
        },
        {
            id: 3,
            turno: 'Turno 20:00'
        },
      ]
    
  return (
    
    <Box  m={2}  alignContent="center" alignItems="center">
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            
            // row
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: 'transparent',
              }}

          >
            {turnos.map((turno) => (
              
                <Box 
                  key={turno.id}
                  borderRadius={2} 
                  padding={0.5} 
                  margin={1}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        backgroundColor: 'transparent',
                        width: '100%',
                        }}
                  >
                    <FormControlLabel 
                        value={turno.id} 
                        control={<Radio />} 
                        label={turno.turno} 
                        sx={{
                            borderRadius: 10,
                            border: 1,
                            borderColor:'primary.main',
                            paddingLeft: 2,
                            width: '100%',
                        }}
                        />
                  
                </Box>
              )
            )}

          </RadioGroup>

      </Box>
  )
}

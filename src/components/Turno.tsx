
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
            
            row
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: 'transparent',
              }}

          >
            {turnos.map((turno) => (
              
                <Box 
                  border={1} 
                  borderRadius={2} 
                  // borderColor='darkred'   
                  padding={0.5} 
                  margin={1}
                  sx={{
                    borderRadius: 10,
                    // boxShadow: '1px 0.5px 0.5px 0.5px darkRed',
                    // bgcolor: 'background.paper',
                    paddingLeft: 2,

                }}>
                    <FormControlLabel value={turno.id} control={<Radio />} label={turno.turno} />
                  
                </Box>
              )
            )}

          </RadioGroup>

      </Box>
  )
}

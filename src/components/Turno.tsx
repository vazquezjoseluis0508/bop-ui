
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'


export const Turno = () => {
    const [value, setValue] = React.useState('female')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
      }
    
  return (
    
    <Box sx={{ mb: 2 }} m={2}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            row

          >
            <FormControlLabel value="Turno 11:00" control={<Radio />} label="Turno 11:00" />
            <FormControlLabel value="Turno 14:00" control={<Radio />} label="Turno 14:00" />
            <FormControlLabel value="Turno 20:00" control={<Radio />} label="Turno 20:00" />
          </RadioGroup>

      </Box>
  )
}

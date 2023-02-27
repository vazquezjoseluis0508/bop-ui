
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

type TurnoProps = {
  register: any;
  name: string;
  fechaSeleccionada: string;
  errors: string;
  selectedTurno: string;
}

export const Turno = ({ register, name, fechaSeleccionada, errors = '', selectedTurno }: TurnoProps) => {
    const [value, setValue] = React.useState<string>(selectedTurno);
   
    const turnos = [
        {
            id: 1,
            turno: '11:00'
        },
        {
            id: 2,
            turno: '14:00'
        },
        {
            id: 3,
            turno: '20:00'
        },
      ]

      const handleChange = (event) => {
        setValue(event.target.value);
    }


      useEffect(() => {
        if (fechaSeleccionada) {
          setValue(selectedTurno);
        }
      }, [fechaSeleccionada, selectedTurno]);

  return (

    <Box  m={2}  alignContent="center" alignItems="center">
          {
            errors !== '' &&
              <Typography color="error" variant="body2" component="p" align="center" >
                {errors}
              </Typography>
            }

          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            // row
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: 'transparent',
                width: '340px'
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
                        value={turno.turno} 
                        control={<Radio  
                            {...register(name)} 
                            checked={value === turno.turno}
                            onChange={handleChange}

                            />} 
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

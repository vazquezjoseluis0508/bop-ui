
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { FieldErrors } from 'react-hook-form';
import { IFormPedido } from '../pages/PedidosPage';

type TurnoProps = {
  register: any;
  name: string;
  fechaSeleccionada: string;
  errors: string;
}

export const Turno = ({ register, name, fechaSeleccionada, errors = '' }: TurnoProps) => {
    const [value, setValue] = React.useState<string>('');
   
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
    
      useEffect(() => {
        if (fechaSeleccionada) {
          setValue('');
        }
      }, [fechaSeleccionada]);

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
            value={value}
            onChange={(event) => setValue(event.target.value)}
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
                        value={turno.turno} 
                        control={<Radio  
                            {...register(name)} 
                            value={turno.turno}
                            
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

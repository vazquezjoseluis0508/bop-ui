import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { DeleteForever } from '@mui/icons-material';
import { Box, IconButton } from '@material-ui/core';
import { Button, Chip, Typography } from '@mui/material';

type MisReservasProps = {
  description: string;
  date: string;
  estado: number;
  onDelete: (id: number) => void;
  id: number;
  isRestricted: boolean
};

export default function MiReserva({ description, date, estado, onDelete, id, isRestricted }: MisReservasProps) {

  const canDelete = estado === 2;
  /// convertir string de fecha 2023-05-10T00:00:00.000Z a 10 May, 2023
  
  const dateToFormat = new Date(date);
  dateToFormat.setDate(dateToFormat.getDate() + 1);
  const formattedDate = dateToFormat.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',

  });

  //Normalizar el texto de la descripción
  const descriptionToFormat = description.toLowerCase();
  const formattedDescription = descriptionToFormat.charAt(0).toUpperCase() + descriptionToFormat.slice(1);


  const chipComponent = (estado) => {
    switch (estado) {
      case 3:
        return (
          <Chip
            label="Retirado"
            color="success"
            size="small"
            variant='outlined'
            sx={{ marginLeft: 1 }}
          />
        );
        break;
      case 4:
        return (
          <Chip
            label="Cancelado"
            color="error"
            size="small"
            variant='outlined'
            sx={{ marginLeft: 1 }}
          />
        );
        break;
    }
  }





  return (
    <>
      <Box textAlign={'center'}
        sx={{
          width: '100%',
          maxWidth: 350,
        }}
      >
        <Typography
          variant='overline'
          position={'initial'}
          sx={
            {
              margin: '10px 0 10px 0',
              textAlign: 'center'
            }}
        >Mi reserva
        </Typography>
        <Divider />
        <List>


          <ListItem>
            <ListItemText primary={formattedDescription} secondary={formattedDate} />
            {
              isRestricted || !canDelete ? (chipComponent(estado)) : (
                <>

                  <Button
                    variant='text'
                    size='small'
                    onClick={() => onDelete(id)}
                    sx={
                      {
                        bgcolor: 'transparent',
                        borderRadius: "100%",
                        border: 0,
                        padding: 1,
                        minWidth: 0,
                        marginLeft: 1,
                        color: 'primary.dark'


                      }
                    }
                  > <DeleteForever /></Button>
                </>

              )
            }

          </ListItem>


        </List>
      </Box>
    </>
  );
}


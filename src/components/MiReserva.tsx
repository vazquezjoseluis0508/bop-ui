import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { DeleteForever } from '@mui/icons-material';
import { Box, IconButton } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import { padding, width } from '@mui/system';

type MisReservasProps = {
  description: string;
  date: string;
  onDelete: (id: number) => void;
  id: number;
  isRestricted: boolean
};

export default function MiReserva({ description, date, onDelete, id, isRestricted }: MisReservasProps) {
  
  /// convertir string de fecha 2021-10-10 a 10 Oct, 2021
  const dateToFormat = new Date(date);
  const formattedDate = dateToFormat.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',

  });

  //Normalizar el texto de la descripción
  const descriptionToFormat = description.toLowerCase();
  const formattedDescription = descriptionToFormat.charAt(0).toUpperCase() + descriptionToFormat.slice(1);




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
          isRestricted ? ( <></> ) : (
            <Button
             variant='text'
             size='small'
             onClick={() => onDelete(id)}
             sx={
              { 
              bgcolor: 'transparent',
              borderRadius: "100%",
              border: 0,
              padding:1,
              minWidth:0,
              marginLeft:1,
              color: 'primary.dark'


            }
             }
            > <DeleteForever /></Button>

            // <ListItemAvatar color='error'>
            //   {/* <Box border={0.2} marginLeft={2}  borderRadius={50} borderColor={'red'}> */}
            //   <IconButton color='secondary' 
            //     onClick={() => onDelete(id)}
            //     >
            //     <DeleteForever />
            //   </IconButton>
            //   {/* </Box> */}
            // </ListItemAvatar>
          )
        }
       
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
      
      
    </List>
    </Box>
    </>
  );
}
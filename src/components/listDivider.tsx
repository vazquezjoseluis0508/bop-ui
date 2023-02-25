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
import { IconButton } from '@material-ui/core';
import { Typography } from '@mui/material';

export default function InsetDividers() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        // bgcolor: 'background.paper',
        border: '1px solid #d3d4d5',
        borderRadius: '5px',
      }}
    >

      <ListItem>
        <ListItemText primary="HAMBURGUESA CON CHEDDAR CON PAPAS FRITAS" secondary="25 Feb, 2023" />
        <ListItemAvatar color='error'>
          <IconButton color='secondary'>
            <DeleteForever />
          </IconButton>
        </ListItemAvatar>
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
      
      
    </List>
  );
}
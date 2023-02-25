import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Box } from "@material-ui/core";
import { Button, IconButton } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';

function Alert(props) {
  return <MuiAlert elevation={50} variant="filled" {...props}  icon={
    <AttachFileIcon style={{ color: 'darkOrange' }} />
  }/>;
}

function EliminaReserva() {
 

  return (
    <Snackbar 
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={true}
      
      >     
      <Alert 
        action={null}
        icon = {null}
         
        severity="success"
        style={{ 
          'backgroundColor': 'black',
          'color': 'white',
          'maxWidth': '70%',
          'boxShadow': '0 7px 5px 2px black',
          'borderRadius': '10px',
          'border': '1px solid darkOrange',
        }}
        variant='outlined' >
        Esta etiqueta está flotando en la pantalla
        <Box m={2}>
          <IconButton>

          </IconButton>
          <Button variant="contained"size="small">Eliminar</Button>
        </Box>
        
      </Alert>
    </Snackbar>
  );
}

export default EliminaReserva;

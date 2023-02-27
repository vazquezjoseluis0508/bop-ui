import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


type SnackbarProps = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
    open: boolean;
    variant?: 'filled' | 'outlined' | 'standard';
}

export const SnackbarApp = ({ type, message, open, variant = 'filled'} : SnackbarProps) => {
    const [openSnackbar, setOpenSnackbar] = React.useState(open);


    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );


  return (
    <>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Alert 
            severity={type} 
            sx={{ width: '100%' }}
            variant={variant}
        >
            {message} 
            {action}
        </Alert>
        </Snackbar>

    </>
  )
}

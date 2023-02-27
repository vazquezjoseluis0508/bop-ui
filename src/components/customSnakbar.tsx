import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.dark,
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
  },
}));

export const CustomSnackbar = ({ message, type, duration }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, duration);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
            <IconButton
                color='inherit'
                size='small'
                onClick={() => handleClose}
                aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
      }
      className={classes[type]}
    />
  );
}

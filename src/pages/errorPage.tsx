import React from 'react';
import { Box, Typography } from '@material-ui/core';

const ErrorPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h5">
        Ha ocurrido un error. Por favor, intente de nuevo más tarde.
      </Typography>
    </Box>
  );
};

export default ErrorPage;

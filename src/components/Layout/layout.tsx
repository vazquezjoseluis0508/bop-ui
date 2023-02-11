import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { Footer } from './footer';

const Layout = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Mi aplicación</Typography>
      </Toolbar>
    </AppBar>
    <Container>
      {children}
    </Container>
    <Footer />
  </>
);

export default Layout;

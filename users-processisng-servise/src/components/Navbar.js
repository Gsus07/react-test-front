// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/">
          Home
        </Typography>
        <Button color="inherit" component={Link} to="/order-form">
          Order Form
        </Button>
        <Button color="inherit" component={Link} to="/orders">
          Order
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

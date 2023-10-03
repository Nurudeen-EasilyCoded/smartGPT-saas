'use client';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from '@mui/material';
import { UserButton } from '@clerk/nextjs';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { logoStyles } from '@/constants/styles';

const drawerWidth = 250;
const Navbar = ({ handleDrawerToggle }: any) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <PsychologyIcon
            sx={{
              color: '#40FF00',
              fontSize: '35px',
              display: { xs: 'none', md: 'flex' },
            }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/dashboard'
            style={logoStyles}
            display={{ xs: 'none', md: 'flex' }}
          >
            smartGPT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{color:'#FAFAFA'}} />
            </IconButton>
          </Box>
          <PsychologyIcon
            sx={{
              color: '#40FF00',
              fontSize: '35px',
              display: { xs: 'flex', md: 'none' },
            }}
          />
          <Typography
            variant='h5'
            component='a'
            href='/dashboard'
            flexGrow={1}
            mr={2}
            style={logoStyles}
            display={{ xs: 'flex', md: 'none' }}
          >
            smartGPT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Account settings'>
              <IconButton>
                <UserButton afterSignOutUrl='/' />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

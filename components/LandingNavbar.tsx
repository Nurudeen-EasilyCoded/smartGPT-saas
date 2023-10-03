'use client';
import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { logoStyles } from '@/constants/styles';
import { useAuth } from '@clerk/nextjs';

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <AppBar position='fixed' sx={{ backgroundColor: 'transparent' }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <PsychologyIcon
              sx={{
                color: '#fafafa',
                fontSize: '35px',
                display: 'flex',
              }}
            />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href={isSignedIn ? '/dashboard' : '/sign-up'}
              style={logoStyles}
              display='flex'
            >
              smartGPT
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant='outlined'
                href={isSignedIn ? '/dashboard' : '/sign-up'}
                sx={{ color: '#fafafa' }}
              >
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default LandingNavbar;

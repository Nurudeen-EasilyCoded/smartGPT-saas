'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Typewriter from 'typewriter-effect';
import { useAuth } from '@clerk/nextjs';

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography
          variant='h3'
          sx={{ color: '#fafafa', fontWeight: 'bold', mb: 4 }}
        >
          All in one AI Tool for
        </Typography>
        <Typography
          variant='h4'
          sx={{ color: '#fafafa', fontWeight: 'bold', mb: 4 }}
        >
          <Typewriter
            options={{
              strings: [
                'Chatbot.',
                'Code Generation.',
                'Photo Generation.',
                'Music Generation.',
                'Video Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </Typography>
        <Typography
          variant='caption'
          sx={{ color: '#fafafa', letterSpacing: 1, mb: 4 }}
        >
          Generate contents 10x faster
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Button
            variant='contained'
            sx={{ color: '#fafafa' }}
            href={isSignedIn ? '/dashboard' : '/sign-up'}
          >
            Start generating for free
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LandingHero;

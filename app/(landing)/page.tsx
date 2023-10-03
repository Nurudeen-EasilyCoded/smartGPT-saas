import React from 'react';
import { Box } from '@mui/material';
import LandingNavbar from '@/components/LandingNavbar';
import LandingHero from '@/components/LandingHero';

const LandingPage = () => {
  return (
    <Box>
      <LandingNavbar />
      <LandingHero />
    </Box>
  );
};

export default LandingPage;

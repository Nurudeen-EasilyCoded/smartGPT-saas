import React from 'react';
import { Box, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Loader = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 5 }}>
      <div className='lds-ripple'>
        <div>
          <PsychologyIcon sx={{ color: '#fafafa'}} />
        </div>
        <div></div>
      </div>
      <Typography sx={{ fontSize: '13px', color: '#fafafa'}}>Smart is thinking...</Typography>
    </Box>
  );
};

export default Loader;

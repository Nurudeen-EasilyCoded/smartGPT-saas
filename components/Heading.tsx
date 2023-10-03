import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface HeadingProps {
  title: string;
  description: string;
  icon?: any;
  iconColor?: string;
  bgColor?: string;
}
const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <Box sx={{ width: '350px', mx: 'auto', textAlign: 'center' }}>
      <Box sx={{}}>
        <IconButton size='small'>
          <Icon sx={{ mr: 2, color: iconColor, fontSize: '32px', backgroundColor: '#f2f2f2' }} />
          <Typography variant='h4' color='#FAFAFA'>
            {title}
          </Typography>
        </IconButton>
      </Box>
      <Typography
        variant='body1'
        color='#FAFAFA'
        sx={{ fontSize: '12px', letterSpacing: 1 }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default Heading;

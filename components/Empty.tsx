import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Image alt='empty' src='/empty.png' height={200} width={300} />
      <p style={{ color: '#fafafa'}}>{label}</p>
    </Box>
  );
};

export default Empty;

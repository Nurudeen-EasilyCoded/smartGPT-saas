' use client';
import React, { useState, useEffect } from 'react';
import { MAX_FREE_COUNTS } from '@/constants/freeLimitCount';
import {
  Button,
  LinearProgress,
  linearProgressClasses,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { useProModal } from '@/hooks/use-pro-modal';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

interface FreeCounter {
  apiLimitCount: number;
  isPro: boolean;
}
const FreeCount = ({ apiLimitCount = 0, isPro = false }: FreeCounter) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <Paper sx={{ m: 2, mt: '-150px', p: 1, textAlign: 'center' }}>
      <Typography sx={{}}>
        {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
      </Typography>
      <BorderLinearProgress
        variant='determinate'
        value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
      />
      <Button
        variant='contained'
        size='small'
        sx={{ mt: 1 }}
        onClick={proModal.onOpen}
      >
        Upgrade
      </Button>
    </Paper>
  );
};

export default FreeCount;

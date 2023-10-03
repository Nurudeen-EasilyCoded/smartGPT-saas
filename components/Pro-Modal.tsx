'use client';

import * as React from 'react';
import axios from 'axios';
import { Icons, routeLinks } from '@/app/(dashboard)/(routes)/dashboard/page';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Button,
  Box,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-toastify';

const ProModal = () => {
  const [loading, setLoading] = React.useState(false);
  const proModal = useProModal();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Somethign went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={proModal.isOpen}
      onClose={proModal.onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Upgrade to smartGPT
        <Chip label='Pro' color='success' size='small' />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Box sx={{ mx: 'auto', }}>
            <Stack spacing={1}>
              {routeLinks.map(({ label, icon, color }, index) => {
                const Icon = Icons[icon];
                return (
                  <Card key={index} sx={{ width: '100%', minWidth: 250 }}>
                    <Box sx={{ display: 'flex', p: 1, width: '100%'}}>
                      <IconButton size='small' sx={{ mr: 2 }}>
                        <Icon fontSize='inherit' sx={{ color: { color } }} />
                      </IconButton>
                      <Typography color='primary' sx={{ flexGrow: 1 }}>
                        {label}
                      </Typography>
                      <VerifiedIcon />
                    </Box>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant='contained'
          onClick={onSubscribe}
          disabled={loading}
          color='success'
          autoFocus
        >
          Upgrade
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProModal;

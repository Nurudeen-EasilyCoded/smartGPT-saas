'use client';
import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

interface UpgradeBTNProps {
  isPro: boolean;
}
const UpgradeButton = ({ isPro = false }: UpgradeBTNProps) => {
  const [loading, setLoading] = React.useState(false);

  const upGrade = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Soemthing went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant='contained' disabled={loading} onClick={upGrade}>
      {isPro ? 'Manage Subscription' : 'Subscribe'}
    </Button>
  );
};

export default UpgradeButton;

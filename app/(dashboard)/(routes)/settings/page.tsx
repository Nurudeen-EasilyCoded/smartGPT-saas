import Heading from '@/components/Heading';
import { Box, Typography } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import React from 'react';
import { checkSubscription } from '@/lib/subscription';
import UpgradeButton from '@/components/UpgradeButton';

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Heading
          title='Settings'
          description='Manage your account settings'
          icon={SettingsOutlinedIcon}
          iconColor='#0489B1'
          bgColor=''
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h6' color='#fafafa' sx={{ my: 2}}>
          {isPro? 'You are currently on a pro plan.' : 'You are currently on a free plan'}
        </Typography>
        <UpgradeButton isPro={isPro} />
      </Box>
    </>
  );
};

export default SettingsPage;
